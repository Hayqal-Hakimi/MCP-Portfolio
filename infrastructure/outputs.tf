output "cloudfront_url" {
  description = "CloudFront distribution URL"
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}

output "api_endpoint" {
  description = "API Gateway invoke URL (prod stage)"
  value       = aws_api_gateway_stage.prod.invoke_url
}

output "api_contacts_endpoint" {
  description = "API contacts endpoint"
  value       = "${aws_api_gateway_stage.prod.invoke_url}/api/contact"
}

output "dynamodb_table" {
  description = "DynamoDB table name"
  value       = aws_dynamodb_table.main.name
}

output "frontend_bucket" {
  description = "S3 bucket name untuk frontend"
  value       = aws_s3_bucket.frontend.id
}

output "backup_bucket" {
  description = "S3 bucket for DynamoDB backups"
  value       = aws_s3_bucket.backups.id
}

output "alert_email" {
  description = "Alert email for monitoring"
  value       = var.email_alert
}

output "sns_topic_arn" {
  description = "SNS topic ARN for alerts"
  value       = aws_sns_topic.alerts.arn
}
