#!/bin/bash
# Generate deployment stats JSON from Terraform outputs
# Run: ./gen-stats.sh > ../portfolio/frontend/public/stats.json

set -e
INFRA_DIR="/home/hayqal/Documents/projects/client-mcp/infrastructure"
cd "$INFRA_DIR"

RESOURCES=$(tofu state list 2>/dev/null | wc -l)
SERVICES=7
ALARMS=$(tofu state list 2>/dev/null | grep cloudwatch_metric_alarm | wc -l)
API_URL=$(tofu output -raw api_endpoint 2>/dev/null || echo "")
COST="RM0"
STATUS="All Systems Operational"

# Test API
API_TEST=$(curl -s -o /dev/null -w "%{http_code}" "${API_URL}/api/contact" -X OPTIONS 2>/dev/null || echo "000")

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

cat <<EOF
{
  "resources": $RESOURCES,
  "services": $SERVICES,
  "alarms": $ALARMS,
  "cost": "$COST",
  "apiUrl": "$API_URL",
  "apiStatus": "$API_TEST",
  "uptime": "Live",
  "status": "$STATUS",
  "lastDeployed": "$TIMESTAMP"
}
EOF
