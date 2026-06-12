# Role for API Lambda
resource "aws_iam_role" "api_lambda_role" {
  name = "${var.project_name}-api-lambda-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "api_lambda_basic" {
  role       = aws_iam_role.api_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_policy" "api_lambda_dynamodb" {
  name        = "${var.project_name}-api-lambda-dynamodb-policy"
  description = "Allow API Lambda to read/write DynamoDB and publish SNS"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Resource = aws_dynamodb_table.main.arn
      },
      {
        Effect   = "Allow"
        Action   = "sns:Publish"
        Resource = aws_sns_topic.alerts.arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "api_lambda_dynamodb_attach" {
  role       = aws_iam_role.api_lambda_role.name
  policy_arn = aws_iam_policy.api_lambda_dynamodb.arn
}

# Role for Backup Lambda
resource "aws_iam_role" "backup_lambda_role" {
  name = "${var.project_name}-backup-lambda-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "lambda.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "backup_lambda_basic" {
  role       = aws_iam_role.backup_lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_policy" "backup_lambda_policy" {
  name        = "${var.project_name}-backup-lambda-policy"
  description = "Allow backup Lambda to scan DynamoDB and write to S3"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:Scan",
          "dynamodb:DescribeTable"
        ]
        Resource = aws_dynamodb_table.main.arn
      },
      {
        Effect = "Allow"
        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:ListBucket"
        ]
        Resource = [
          aws_s3_bucket.backups.arn,
          "${aws_s3_bucket.backups.arn}/*"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "backup_lambda_attach" {
  role       = aws_iam_role.backup_lambda_role.name
  policy_arn = aws_iam_policy.backup_lambda_policy.arn
}