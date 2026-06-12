# ============================================
# S3 Bucket — Remote State Storage
# ============================================
# Simpan terraform state untuk SEMUA project
# akan datang. Satu bucket, multiple project
# guna key prefix berbeza.

resource "aws_s3_bucket" "tfstate" {
  bucket = "hayqal-tfstate-ap-southeast-1"
}

# Block all public access — state file ada secrets
resource "aws_s3_bucket_public_access_block" "tfstate" {
  bucket                  = aws_s3_bucket.tfstate.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Versioning — rollback kalau state corrupt
resource "aws_s3_bucket_versioning" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Encryption at rest
resource "aws_s3_bucket_server_side_encryption_configuration" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
