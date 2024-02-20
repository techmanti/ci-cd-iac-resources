terraform {
  backend "s3" {
    bucket         = "tfstate-techman"
    key            = "terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-up-and-running-locks"
    encrypt        = true
  }
}

module "acm" {
  source           = "./modules/acm"
  domain_name      = var.domain_name
  alternative_name = var.alternative_name
}

module "route53" {
  source                                  = "./modules/router53"
  domain_name                             = var.domain_name
  alternative_name                        = var.alternative_name
  record_name                             = var.record_name
  aws_cloudfront_distribution_domain_name = module.cloudfront.aws_cloudfront_distribution_domain_name
  aws_cloudfront_distribution_hosted_id   = module.cloudfront.aws_cloudfront_distribution_hosted_id
  route53_zone_id                         = module.acm.route53_zone_id
}

module "cloudfront" {
  source           = "./modules/cloudfront"
  domain_name      = var.domain_name
  alternative_name = var.alternative_name
  record_name      = var.record_name
  certificate_arn  = module.acm.certificate_arn
}

module "lambda" {
  source   = "./modules/lambda"
  EMAIL    = var.EMAIL
  PASSWORD = var.PASSWORD
  }