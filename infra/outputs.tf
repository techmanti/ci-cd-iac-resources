output "cloudfront_website_domain" {
  value       = aws_cloudfront_distribution.website_distribution.domain_name
  description = "Website domain used to create route53 alias records, pointing to cloudfront"
}
