output "aws_cloudfront_distribution_domain_name" {
  value = aws_cloudfront_distribution.website_distribution.domain_name
}

output "aws_cloudfront_distribution_hosted_id" {
  value = aws_cloudfront_distribution.website_distribution.hosted_zone_id
}