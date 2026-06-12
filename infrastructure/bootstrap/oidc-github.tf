# ============================================
# OIDC — GitHub Actions → AWS Authentication
# ============================================
# GitHub Actions dapat temporary credentials
# tanpa permanent access key. Setup sekali,
# guna untuk semua project.

# ── OIDC Provider ──
# Trust GitHub sebagai identity provider
resource "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list  = ["sts.amazonaws.com"]
  thumbprint_list = ["6938fd4d98bab03faadb97b34396831e3780aea1"]
}

# ── IAM Role untuk GitHub Actions ──
# Role ni yang GitHub Actions akan assume
data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "github_trust" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRoleWithWebIdentity"]
    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github.arn]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
    # Restrict ke repo + branch spesifik
    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values   = ["repo:Hayqal-Hakimi/MCP-Portfolio:*"]
    }
  }
}

resource "aws_iam_role" "github_actions" {
  name               = "github-actions-mcp-portfolio"
  assume_role_policy = data.aws_iam_policy_document.github_trust.json
  description        = "Role untuk GitHub Actions deploy MCP Portfolio"

  tags = {
    Purpose = "CI/CD GitHub Actions"
  }
}

# ── IAM Policy — Apa GitHub Actions Boleh Buat ──
data "aws_iam_policy_document" "github_actions_permissions" {
  # Terraform/OpenTofu state access
  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:DeleteObject",
      "s3:ListBucket",
    ]
    resources = [
      aws_s3_bucket.tfstate.arn,
      "${aws_s3_bucket.tfstate.arn}/*",
    ]
  }

  # DynamoDB lock
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:DeleteItem",
    ]
    resources = [aws_dynamodb_table.tfstate_lock.arn]
  }

  # S3 frontend upload + backup
  statement {
    effect = "Allow"
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:DeleteObject",
      "s3:ListBucket",
      "s3:PutObjectAcl",
    ]
    resources = [
      "arn:aws:s3:::mcp-portfolio-frontend",
      "arn:aws:s3:::mcp-portfolio-frontend/*",
      "arn:aws:s3:::mcp-portfolio-dynamodb-backups",
      "arn:aws:s3:::mcp-portfolio-dynamodb-backups/*",
    ]
  }

  # CloudFront — invalidate cache
  statement {
    effect = "Allow"
    actions = [
      "cloudfront:CreateInvalidation",
      "cloudfront:GetDistribution",
      "cloudfront:ListDistributions",
    ]
    resources = ["*"]
  }

  # Lambda — update function code
  statement {
    effect = "Allow"
    actions = [
      "lambda:UpdateFunctionCode",
      "lambda:GetFunction",
      "lambda:InvokeFunction",
    ]
    resources = ["arn:aws:lambda:ap-southeast-1:${data.aws_caller_identity.current.account_id}:function:mcp-portfolio-contact"]
  }

  # API Gateway — test
  statement {
    effect = "Allow"
    actions = [
      "apigateway:GET",
      "apigateway:TEST",
    ]
    resources = ["*"]
  }

  # DynamoDB — test scan
  statement {
    effect = "Allow"
    actions = [
      "dynamodb:Scan",
      "dynamodb:DescribeTable",
    ]
    resources = ["arn:aws:dynamodb:ap-southeast-1:${data.aws_caller_identity.current.account_id}:table/mcp-portfolio-data"]
  }

  # CloudWatch — read logs (debug)
  statement {
    effect = "Allow"
    actions = [
      "logs:DescribeLogGroups",
      "logs:GetLogEvents",
    ]
    resources = ["*"]
  }

  # SNS — publish (test notification)
  statement {
    effect = "Allow"
    actions = ["sns:Publish"]
    resources = ["arn:aws:sns:ap-southeast-1:${data.aws_caller_identity.current.account_id}:mcp-portfolio-alerts"]
  }
}

resource "aws_iam_role_policy" "github_actions" {
  name   = "github-actions-deploy"
  role   = aws_iam_role.github_actions.id
  policy = data.aws_iam_policy_document.github_actions_permissions.json
}
