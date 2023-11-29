output "domain_name" {
  value = var.domain_name
}

output "certificate_arn" {
  value = aws_acm_certificate.acm_certificate.arn
}

output "route53_zone_id" {
  value = data.aws_route53_zone.route53_zone.zone_id
}