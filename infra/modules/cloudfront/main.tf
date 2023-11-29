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
    acm_certificate_arn = var.certificate_arn
    ssl_support_method  = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}