# MCP Portfolio — Deployment Guide

## Prerequisites

- [x] AWS Free Tier account (Region: ap-southeast-1)
- [x] AWS credentials configured (`aws configure`)
- [x] OpenTofu installed (~/.local/bin/tofu)
- [x] Node.js 20+ installed

## Architecture

```
CloudFront (CDN + SSL)
    │
    ├── S3 Bucket (React static)
    │
    └── API Gateway (REST API)
          │
          ├── Lambda (API) → DynamoDB (Contact form)
          └── Lambda (Backup) → S3 Backup Bucket
          
CloudWatch Alarms (6) → SNS → Email
```

## Quick Deploy (1 command)

```bash
cd /home/hayqal/Documents/projects/client-mcp
./deploy.sh
```

## Manual Deploy

### 1. Infrastructure

```bash
cd infrastructure/

# Initialize
tofu init

# Preview changes
tofu plan -var-file=terraform.tfvars

# Deploy
tofu apply -var-file=terraform.tfvars
```

### 2. Get API Gateway URL

```bash
tofu output api_endpoint
# Output: https://xxxxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/prod
```

### 3. Build Frontend

```bash
cd ../portfolio/frontend/

# Set API URL
echo "VITE_API_URL=https://xxxxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/prod" > .env.production

# Build
npm install
npm run build
```

### 4. Upload to S3

```bash
aws s3 sync dist/ s3://mcp-portfolio-frontend --delete
```

### 5. Invalidate CloudFront

```bash
aws cloudfront create-invalidation \
  --distribution-id <YOUR_DISTRIBUTION_ID> \
  --paths "/*"
```

### 6. Verify SNS Email

Check `hayqal.dev@gmail.com` → Click "Confirm subscription"

## Testing

### Test Contact Form API

```bash
curl -X POST https://xxxxxxxxxx.execute-api.ap-southeast-1.amazonaws.com/prod/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "topic": "consulting",
    "message": "Testing the contact form"
  }'

# Expected: {"success":true}
```

### Verify DynamoDB

```bash
aws dynamodb scan --table-name mcp-portfolio-data --limit 5
```

### Check Alarms

```bash
aws cloudwatch describe-alarms --alarm-name-prefix "mcp-portfolio"
```

## File Structure

```
client-mcp/
├── infrastructure/
│   ├── provider.tf          # AWS ap-southeast-1
│   ├── variables.tf         # Variable definitions
│   ├── terraform.tfvars     # Values for this client
│   ├── s3.tf                # 2 buckets + encryption
│   ├── cloudfront.tf        # CDN + OAC
│   ├── dynamodb.tf          # Contact form table
│   ├── iam.tf               # Lambda roles/policies
│   ├── lambda.tf            # 2 functions + EventBridge
│   ├── apigateway.tf        # REST API + CORS
│   ├── monitoring.tf        # SNS + 6 alarms
│   ├── outputs.tf           # Output URLs
│   ├── api_lambda_payload.zip      # Contact form handler
│   └── backup_lambda_payload.zip   # Backup handler
│
├── portfolio/
│   ├── frontend/            # React + Vite app
│   │   ├── src/             # Source code
│   │   └── dist/            # Production build
│   └── backend/             # Lambda source (reference)
│
├── deploy.sh                # 1-command deploy
├── DEPLOY.md                # This guide
└── requirements.txt         # Client requirements
```

## Monthly Cost

| Service | Cost |
|---------|------|
| S3 (2 buckets) | RM0 |
| CloudFront | RM0 |
| Lambda (2 functions) | RM0 |
| DynamoDB | RM0 |
| API Gateway | RM0 |
| CloudWatch | RM0 |
| SNS (email) | RM0 |
| **TOTAL** | **RM0/month** |

All within AWS Free Tier limits.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `tofu init` fails | Delete `.terraform/` and `terraform.lock.hcl`, run again |
| Lambda timeout | Increase `timeout` in `lambda.tf` |
| SNS email not received | Check spam folder, verify `email_alert` in tfvars |
| CloudFront 403 | Wait 5-10 min for distribution to deploy |
| CORS error | Check API Gateway CORS config and Lambda headers |
