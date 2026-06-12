# MCP Portfolio — Serverless DevOps Portfolio

**Status:** Deployed ✅ | **Cost:** RM0/month | **Region:** ap-southeast-1

Production serverless portfolio website built with React + AWS. 49 resources deployed via OpenTofu.

## Architecture

```
CloudFront CDN + SSL
├── S3 Bucket (React static site)
└── API Gateway (REST API)
    ├── Lambda (Contact form handler)
    │   └── DynamoDB (NoSQL database)
    ├── Lambda (Weekly backup)
    └── S3 (Backup storage)

Monitoring: 6 CloudWatch Alarms → SNS → Email
```

## Tech Stack

| Category | Tool |
|----------|------|
| Infrastructure | OpenTofu (Terraform) |
| Cloud | AWS (S3, CloudFront, Lambda, DynamoDB, API Gateway, CloudWatch, SNS) |
| Frontend | React 18 + Vite |
| Backend | Node.js 20 (AWS Lambda) |
| Database | DynamoDB (NoSQL) |
| CDN | CloudFront + OAC |
| Monitoring | CloudWatch (6 alarms) + SNS email alerts |
| Security | Checkov (IaC) + Trivy (config) + AES256 encryption |

## Quick Deploy

```bash
./deploy.sh
```

## Manual Setup

1. Configure AWS credentials: `aws configure`
2. Edit `terraform.tfvars` (copy from `terraform.tfvars.example`)
3. Build Lambda: `cd portfolio/backend && npm install && zip -r ../../infrastructure/api_lambda_payload.zip .`
4. Deploy: `cd infrastructure && tofu init && tofu apply`
5. Build frontend: `cd portfolio/frontend && npm install && npm run build`
6. Upload: `aws s3 sync dist/ s3://mcp-portfolio-frontend --delete`

## File Structure

```
├── infrastructure/          # OpenTofu IaC (10 .tf files)
│   ├── provider.tf
│   ├── variables.tf
│   ├── s3.tf
│   ├── cloudfront.tf
│   ├── dynamodb.tf
│   ├── iam.tf
│   ├── lambda.tf
│   ├── apigateway.tf
│   ├── monitoring.tf
│   └── outputs.tf
├── portfolio/
│   ├── frontend/            # React + Vite
│   │   ├── src/
│   │   │   ├── components/  # Reusable UI components
│   │   │   ├── pages/       # Home, Projects, Contact
│   │   │   ├── data/        # Project data (config-driven)
│   │   │   ├── hooks/       # Custom React hooks
│   │   │   └── styles/      # CSS (vanilla, 940+ lines)
│   │   └── public/          # Static assets + deployment stats
│   └── backend/             # Lambda source (Node.js)
├── deploy.sh                # 1-command deploy
├── gen-stats.sh             # Generate deployment stats
├── DEPLOY.md                # Deployment guide
└── requirements.txt         # Client requirements
```

## Features

- [x] Serverless architecture (zero EC2, RM0/month)
- [x] Contact form → Lambda → DynamoDB → SNS email
- [x] Config-driven project portfolio (add project = 1 object)
- [x] 3-button project cards: Repo, Changelog, Architecture
- [x] Real deployment stats from Terraform state
- [x] 6 CloudWatch alarms + SNS email alerts
- [x] Weekly DynamoDB backup to S3
- [x] AES256 encryption at rest (all S3 buckets)
- [x] CloudFront OAC (Origin Access Control)
- [x] CORS-enabled API Gateway
- [x] Mobile responsive
- [x] Dark mode + neon accent design

## Live URL

https://d141pc5b2k1ejd.cloudfront.net

## Author

**Hayqal** — Cloud & DevOps Architect | AWS/GCP | Agentic OS | Automation

- GitHub: [@Hayqal-Hakimi](https://github.com/Hayqal-Hakimi)
- LinkedIn: [hayqal-cloud-engineer](https://linkedin.com/in/hayqal-cloud-engineer-326b7740a)
- Email: hayqalhakimimain@gmail.com
