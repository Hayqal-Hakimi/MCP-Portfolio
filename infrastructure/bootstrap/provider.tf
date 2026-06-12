# ============================================
# BOOTSTRAP — S3 Backend + DynamoDB Lock + OIDC
# ============================================
# Deploy SEKALI je. Lepas ni tak sentuh lagi.
# Folder ni create resources yang diperlukan
# oleh GitHub Actions CI/CD — state bucket,
# lock table, dan IAM OIDC role.
# ============================================

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-1"
}
