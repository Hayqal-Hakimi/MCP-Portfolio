# ============================================
# DynamoDB — State Lock Table
# ============================================
# Cegah 2 orang/CI apply serentak.
# OpenTofu auto-guna table ni kalau
# backend s3 guna dynamodb_table.

resource "aws_dynamodb_table" "tfstate_lock" {
  name         = "hayqal-tfstate-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name    = "tfstate-lock"
    Purpose = "Terraform state locking"
  }
}
