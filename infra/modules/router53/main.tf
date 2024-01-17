
data "aws_route53_zone" "hosted_zone" {
  name = var.domain_name
}

resource "aws_route53_record" "web" {
  zone_id = data.aws_route53_zone.hosted_zone.zone_id
  name    = var.record_name
  type    = "A"

  alias {
    name                   = var.aws_cloudfront_distribution_domain_name
    zone_id                = var.aws_cloudfront_distribution_hosted_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "web_record" {
  zone_id = data.aws_route53_zone.hosted_zone.zone_id
  name    = ""
  type    = "A"

  alias {
    name                   = var.aws_cloudfront_distribution_domain_name
    zone_id                = var.aws_cloudfront_distribution_hosted_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "web_br" {
  zone_id = data.aws_route53_zone.hosted_zone.zone_id
  name    = "br.techman.sh"
  type    = "A"

  alias {
    name                   = var.aws_cloudfront_distribution_domain_name
    zone_id                = var.aws_cloudfront_distribution_hosted_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "web_en" {
  zone_id = data.aws_route53_zone.hosted_zone.zone_id
  name    = "en.techman.sh"
  type    = "A"

  alias {
    name                   = var.aws_cloudfront_distribution_domain_name
    zone_id                = var.aws_cloudfront_distribution_hosted_id
    evaluate_target_health = true
  }
}


resource "aws_route53_record" "email_record" {
  zone_id = var.route53_zone_id
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
  zone_id = var.route53_zone_id
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
    "s2.domainkey.u19485007.wl008.sendgrid.net",
  ]
}
