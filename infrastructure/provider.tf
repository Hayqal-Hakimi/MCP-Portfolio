terraform {
  backend "s3" {
    bucket         = "hayqal-tfstate-ap-southeast-1"
    key            = "mcp-portfolio/terraform.tfstate"
    region         = "ap-southeast-1"
    dynamodb_table = "hayqal-tfstate-lock"
    encrypt        = true
  }

  required_version = ">= 1.6.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Project     = var.project_name
      Environment = var.environment
      ManagedBy   = "AgentQ"
    }
  }
}