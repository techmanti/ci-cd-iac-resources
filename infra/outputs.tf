output "cloudfront_website_domain" {
  value       = module.cloudfront.aws_cloudfront_distribution_domain_name
  description = "Website domain used to create route53 alias records, pointing to cloudfront"
}
