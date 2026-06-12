variable "project_name" {
  description = "Nama projek (lowercase, no spaces)"
  type        = string
  default     = "mcp-portfolio"
}

variable "client_name" {
  description = "Nama klien"
  type        = string
  default     = "MCP Solutions"
}

variable "environment" {
  description = "Environment deployment"
  type        = string
  default     = "production"
}

variable "aws_region" {
  description = "AWS Region utama"
  type        = string
  default     = "ap-southeast-1"
}

variable "email_alert" {
  description = "Email untuk alert monitoring"
  type        = string
  default     = "hayqal.dev@gmail.com"
}

variable "frontend_bucket_name" {
  description = "Nama bucket S3 untuk frontend"
  type        = string
  default     = "mcp-portfolio-frontend"
}

variable "backup_bucket_name" {
  description = "Nama bucket S3 untuk backup DynamoDB"
  type        = string
  default     = "mcp-portfolio-dynamodb-backups"
}

variable "dynamodb_table_name" {
  description = "Nama table DynamoDB"
  type        = string
  default     = "mcp-portfolio-data"
}