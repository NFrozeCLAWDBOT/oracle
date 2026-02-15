variable "aws_region" {
  description = "AWS region for resources"
  type        = string
  default     = "eu-west-2"
}

variable "bucket_name" {
  description = "S3 bucket name for static website hosting"
  type        = string
  default     = "oracle.nfroze.co.uk"
}
