# Certificate must be in this region to work with CloudFront
provider "aws" {
  alias   = "us_east_1"
  region  = "us-east-1"
#  profile = var.aws_profile
}
