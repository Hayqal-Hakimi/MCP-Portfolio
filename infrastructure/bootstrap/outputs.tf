# ============================================
# Outputs — nilai yang perlu disimpan
# ============================================

output "state_bucket" {
  value       = aws_s3_bucket.tfstate.id
  description = "S3 bucket untuk Terraform remote state"
}

output "dynamodb_lock_table" {
  value       = aws_dynamodb_table.tfstate_lock.name
  description = "DynamoDB table untuk state locking"
}

output "github_actions_role_arn" {
  value       = aws_iam_role.github_actions.arn
  description = "IAM Role ARN untuk GitHub Actions OIDC — simpan di GitHub Secrets"
}

output "oidc_provider_arn" {
  value       = aws_iam_openid_connect_provider.github.arn
  description = "OIDC Provider ARN — untuk reference"
}
