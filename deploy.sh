#!/bin/bash
# ============================================
# MCP Portfolio — 1-Command Deploy
# ============================================
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

PROJECT_DIR="/home/hayqal/Documents/projects/client-mcp"
INFRA_DIR="$PROJECT_DIR/infrastructure"
FRONTEND_DIR="$PROJECT_DIR/portfolio/frontend"

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}  MCP Portfolio — Full Deploy${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

# ── Step 1: Deploy Infrastructure ──
echo -e "${GREEN}[1/5] Deploying Infrastructure...${NC}"
cd "$INFRA_DIR"
tofu init -reconfigure
tofu apply -auto-approve -var-file=terraform.tfvars

# ── Step 2: Get API Gateway URL ──
echo -e "${GREEN}[2/5] Getting API Gateway URL...${NC}"
API_URL=$(tofu output -raw api_endpoint 2>/dev/null || echo "")
if [ -z "$API_URL" ]; then
    echo -e "${RED}ERROR: Cannot get API Gateway URL. Check Terraform outputs.${NC}"
    exit 1
fi
echo "  API URL: $API_URL"

# ── Step 3.5: Generate Stats ──
echo -e "${GREEN}[3.5/6] Generating deployment stats...${NC}"
cd "$PROJECT_DIR"
./gen-stats.sh > "$FRONTEND_DIR/public/stats.json"
echo "  Stats:  $(head -1 "$FRONTEND_DIR/public/stats.json")"

# ── Step 4: Build Frontend ──
echo -e "${GREEN}[4/6] Building React frontend...${NC}"
cd "$FRONTEND_DIR"
echo "VITE_API_URL=$API_URL" > .env.production
npm install --silent
npm run build

# ── Step 5: Upload to S3 ──
echo -e "${GREEN}[5/6] Uploading to S3...${NC}"
BUCKET=$(cd "$INFRA_DIR" && tofu output -raw frontend_bucket 2>/dev/null || tofu output -raw s3_bucket 2>/dev/null || echo "")
S3_BUCKET="${BUCKET:-mcp-portfolio-frontend}"
aws s3 sync dist/ "s3://$S3_BUCKET" --delete --cache-control "max-age=3600"
echo "  Uploaded to: s3://$S3_BUCKET"

# ── Step 6: Invalidate CloudFront ──
echo -e "${GREEN}[6/6] Invalidating CloudFront cache...${NC}"
DIST_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Origins.Items[0].DomainName=='${S3_BUCKET}.s3.ap-southeast-1.amazonaws.com'].Id" --output text 2>/dev/null | head -1)
if [ -n "$DIST_ID" ]; then
    aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*" > /dev/null
    echo "  Invalidation created: $DIST_ID"
else
    echo "  ⚠️  CloudFront distribution not found — skipping invalidation"
fi

# ── Done ──
echo ""
echo -e "${CYAN}========================================${NC}"
echo -e "${GREEN}  Deploy Complete!${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""
echo "  Frontend: $(cd "$INFRA_DIR" && tofu output -raw cloudfront_url 2>/dev/null || echo 'Check CloudFront console')"
echo "  API:      $API_URL/api/contact"
echo "  Test:     curl -X POST $API_URL/api/contact -H 'Content-Type: application/json' -d '{\"name\":\"Test\",\"email\":\"test@test.com\",\"topic\":\"other\",\"message\":\"Hello\"}'"
echo ""
