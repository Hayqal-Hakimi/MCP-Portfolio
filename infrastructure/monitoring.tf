# ────────────────────────────────────
# Monitoring — SNS + CloudWatch Alarms
# ────────────────────────────────────

# SNS Topic for alerts
resource "aws_sns_topic" "alerts" {
  name = "${var.project_name}-alerts"
  tags = {
    Name = "${var.project_name}-sns-alerts"
  }
}

resource "aws_sns_topic_subscription" "email" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = var.email_alert
}

# ── Lambda Alarms ──

# Lambda API errors
resource "aws_cloudwatch_metric_alarm" "lambda_api_errors" {
  alarm_name          = "${var.project_name}-lambda-api-errors"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "Errors"
  namespace           = "AWS/Lambda"
  period              = 300
  statistic           = "Sum"
  threshold           = 5
  alarm_description   = "API Lambda errors > 5 dalam 5 minit"
  alarm_actions       = [aws_sns_topic.alerts.arn]

  dimensions = {
    FunctionName = aws_lambda_function.api.function_name
  }
}

# Lambda throttles
resource "aws_cloudwatch_metric_alarm" "lambda_api_throttles" {
  alarm_name          = "${var.project_name}-lambda-api-throttles"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "Throttles"
  namespace           = "AWS/Lambda"
  period              = 300
  statistic           = "Sum"
  threshold           = 0
  alarm_description   = "API Lambda throttled — concurrent limit reached"
  alarm_actions       = [aws_sns_topic.alerts.arn]

  dimensions = {
    FunctionName = aws_lambda_function.api.function_name
  }
}

# Lambda duration p50
resource "aws_cloudwatch_metric_alarm" "lambda_api_duration" {
  alarm_name          = "${var.project_name}-lambda-api-duration"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "Duration"
  namespace           = "AWS/Lambda"
  period              = 300
  extended_statistic  = "p50"
  threshold           = 24000 # 80% dari 30s timeout
  alarm_description   = "API Lambda p50 > 24s — function lambat"
  alarm_actions       = [aws_sns_topic.alerts.arn]

  dimensions = {
    FunctionName = aws_lambda_function.api.function_name
  }
}

# ── API Gateway Alarms ──

# API Gateway 5xx errors
resource "aws_cloudwatch_metric_alarm" "apigw_5xx" {
  alarm_name          = "${var.project_name}-apigw-5xx"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "5XXError"
  namespace           = "AWS/ApiGateway"
  period              = 300
  statistic           = "Sum"
  threshold           = 5
  alarm_description   = "API Gateway 5xx > 5 dalam 5 minit"
  alarm_actions       = [aws_sns_topic.alerts.arn]

  dimensions = {
    ApiName = aws_api_gateway_rest_api.api.name
    Stage   = aws_api_gateway_stage.prod.stage_name
  }
}

# ── DynamoDB Alarms ──

# DynamoDB throttle
resource "aws_cloudwatch_metric_alarm" "dynamodb_throttle" {
  alarm_name          = "${var.project_name}-dynamodb-throttle"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "WriteThrottleEvents"
  namespace           = "AWS/DynamoDB"
  period              = 300
  statistic           = "Sum"
  threshold           = 0
  alarm_description   = "DynamoDB write throttled — periksa capacity"
  alarm_actions       = [aws_sns_topic.alerts.arn]

  dimensions = {
    TableName = aws_dynamodb_table.main.name
  }
}

# ── Cost Alarm ──

resource "aws_cloudwatch_metric_alarm" "cost_anomaly" {
  alarm_name          = "${var.project_name}-cost-anomaly"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "EstimatedCharges"
  namespace           = "AWS/Billing"
  period              = 86400 # sehari
  statistic           = "Maximum"
  threshold           = 1     # USD $1/hari
  alarm_description   = "AWS cost > $1 sehari — check free tier!"
  alarm_actions       = [aws_sns_topic.alerts.arn]
}
