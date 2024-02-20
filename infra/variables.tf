variable "domain_name" {
  type        = string
  description = "static website domain name"
}

variable "record_name" {
  type        = string
  description = "www"
}

variable "alternative_name" {
  type = string
}

variable "EMAIL" {
  type = string
  sensitive = true
}

variable "PASSWORD" {
  type = string
  sensitive = true
}
