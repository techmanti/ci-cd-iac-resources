terraform {
  backend "s3" {
    bucket = "tfstate-techman"
    key    = "terraform.tfstate"
    region = "us-east-1"
    # Replace this with your DynamoDB table name!
    dynamodb_table = "terraform-up-and-running-locks"
    encrypt        = true
  }
}