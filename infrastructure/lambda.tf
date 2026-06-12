# API Lambda (backend) — contact form handler
resource "aws_lambda_function" "api" {
  filename      = "api_lambda_payload.zip"
  function_name = "${var.project_name}-api"
  role          = aws_iam_role.api_lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  memory_size   = 128
  timeout       = 30

  environment {
    variables = {
      TABLE_NAME    = aws_dynamodb_table.main.name
      SNS_TOPIC_ARN = aws_sns_topic.alerts.arn
      ENV           = var.environment
    }
  }

  tags = {
    Name = "${var.project_name}-api-lambda"
  }
}

# Backup Lambda (scheduler)
resource "aws_lambda_function" "backup" {
  filename      = "backup_lambda_payload.zip" # Placeholder
  function_name = "${var.project_name}-dynamodb-backup"
  role          = aws_iam_role.backup_lambda_role.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  memory_size   = 128
  timeout       = 300 # 5 minit

  environment {
    variables = {
      TABLE_NAME    = aws_dynamodb_table.main.name
      BACKUP_BUCKET = aws_s3_bucket.backups.id
    }
  }

  tags = {
    Name = "${var.project_name}-backup-lambda"
  }
}

# EventBridge rule untuk trigger backup setiap minggu (cron: Sunday 00:00)
resource "aws_cloudwatch_event_rule" "backup_schedule" {
  name                = "${var.project_name}-backup-weekly"
  description         = "Triggeer backup DynamoDB ke S3 setiap minggu"
  schedule_expression = "cron(0 0 ? * 1 *)" # Sunday 00:00 UTC
  tags = {
    Name = "${var.project_name}-backup-schedule"
  }
}

resource "aws_cloudwatch_event_target" "backup_target" {
  rule      = aws_cloudwatch_event_rule.backup_schedule.name
  target_id = "${var.project_name}-backup-target"
  arn       = aws_lambda_function.backup.arn
}

resource "aws_lambda_permission" "allow_eventbridge_backup" {
  statement_id  = "AllowExecutionFromEventBridge"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.backup.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.backup_schedule.arn
}