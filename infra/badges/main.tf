resource "aws_s3_bucket" "bucket" {
  bucket = local.bucket
  acl    = "private"

  versioning {
    enabled = true
  }
  tags = {
    Environment = var.environment_name
  }
}

resource "aws_cloudwatch_event_bus" "event_bus" {
  name = local.event_bus
  tags = {
    Environment = var.environment_name
  }
}
