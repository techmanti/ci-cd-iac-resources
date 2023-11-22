terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  required_version = ">= 1.0.0"
}

resource "aws_s3_bucket" "static_website" {
  bucket = var.domain_name
}

resource "aws_s3_bucket_ownership_controls" "enableACLs" {
  bucket = aws_s3_bucket.static_website.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "disable_block_for_public_access" {
  bucket = aws_s3_bucket.static_website.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false

  depends_on = [
    aws_s3_bucket_ownership_controls.enableACLs
  ]
}

resource "aws_s3_bucket_acl" "website_public_read_acl" {
  bucket = aws_s3_bucket.static_website.id
  acl    = "public-read"

  depends_on = [
    aws_s3_bucket_public_access_block.disable_block_for_public_access
  ]
}

resource "aws_s3_bucket_policy" "static_website_policy" {
  bucket = aws_s3_bucket.static_website.id
  depends_on = [
    aws_s3_bucket_public_access_block.disable_block_for_public_access
  ]

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": [
        "arn:aws:s3:::${aws_s3_bucket.static_website.bucket}/*"
      ]
    }
  ]
}
POLICY
}

resource "aws_s3_bucket_website_configuration" "static_website_config" {
  bucket = aws_s3_bucket.static_website.id

  index_document {
    suffix = local.index_document
  }

  error_document {
    key = "error.html"
  }
}

resource "aws_cloudfront_distribution" "website_distribution" {
  aliases             = [var.domain_name]
  enabled             = true
  default_root_object = local.index_document

  origin { # Web
    domain_name = aws_s3_bucket.static_website.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.static_website.id
  }

  # Web / FronEnd static website / S3 Bucket
  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    target_origin_id       = aws_s3_bucket.static_website.id
    min_ttl                = 0
    default_ttl            = 0
    max_ttl                = 0 # Disable cache
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    forwarded_values {
      query_string = true
      headers      = ["Origin", "Authorization", "Access-Control-Request-Method", "Access-Control-Request-Headers"]

      cookies {
        forward = "none"
      }
    }
  }

  custom_error_response {
    error_caching_min_ttl = 0
    error_code            = 404
    response_code         = 200
    response_page_path    = "/${local.index_document}"
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.acm_certificate.arn
    ssl_support_method  = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}

data "aws_route53_zone" "hosted_zone" {
  name = var.domain_name
}

resource "aws_route53_record" "web" {
  zone_id = data.aws_route53_zone.hosted_zone.zone_id
  name    = var.record_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.website_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "web_record" {
  zone_id = data.aws_route53_zone.hosted_zone.zone_id
  name    = ""
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.website_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.website_distribution.hosted_zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "email_record" {
  zone_id = data.aws_route53_zone.route53_zone.zone_id
  name = ""
  type = "TXT"

  ttl = 300

  records = [
    "zoho-verification=zb49839117.zmverify.zoho.com",
    "v=spf1 include:zoho.com ~all"  
  ]
}

resource "aws_route53_record" "mx_records" {
  zone_id = data.aws_route53_zone.hosted_zone.zone_id
  name    = ""
  type    = "MX"
  ttl     = 300

  records = [
    "10 mx.zoho.com",
    "20 mx2.zoho.com",
    "30 mx3.zoho.com",
  ]
}

resource "aws_route53_record" "email_record_dkim" {
  zone_id = data.aws_route53_zone.route53_zone.zone_id
  name = "zmail._domainkey"
  type = "TXT"

  ttl = 300

  records = [
    "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDY8gxRXF9vc4l6Uu+uU8yD+b+x93EkQT3X/Ib892sxPFoIWZ4S5WrHRnkUt6GjjscPgw1f3Pe6HeSzcgSKdDARttnmr1binqEIPxoHcc/vndgwy4rcmxXLq0oZy4YNytMjGboLKByzAmIH/EEuPOxM/g10k9V4mEbCjOZqOH1nuwIDAQAB"
    
  ]
}

resource "aws_route53_record" "cname_alliv" {
  zone_id = data.aws_route53_zone.hosted_zone.zone_id
  name    = "em6396.techman.sh"
  type    = "CNAME"
  ttl     = 300

  records = [
    "u19485007.wl008.sendgrid.net",
  ]
}

resource "aws_route53_record" "cname_alliv1" {
  zone_id = data.aws_route53_zone.hosted_zone.zone_id
  name    = "s1._domainkey.techman.sh"
  type    = "CNAME"
  ttl     = 300

  records = [
    "s1.domainkey.u19485007.wl008.sendgrid.net",
  ]
}

resource "aws_route53_record" "cname_alliv2" {
  zone_id = data.aws_route53_zone.hosted_zone.zone_id
  name    = "s2._domainkey.techman.sh"
  type    = "CNAME"
  ttl     = 300

  records = [
    "s2 .domainkey.u19485007.wl008.sendgrid.net",
  ]
}
