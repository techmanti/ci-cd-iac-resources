variable "domain_name" {
  type        = string
  description = "static website domain name"
}

/*variable "aws_profile" {
  type        = string
  description = "current aws profile for inner module providers"
}*/

variable "record_name" {
  type        = string
  description = "www"
}

variable "alternative_name" {
  type = string
}