resource "aws_dynamodb_table" "lookup_table" {
  name           = local.lookup_table
  hash_key       = "identityKey"
  range_key      = "identityType"
  read_capacity  = 1
  write_capacity = 1

  attribute {
    name = "organizationId"
    type = "S"
  }

  attribute {
    name = "identityKey"
    type = "S"
  }

  attribute {
    name = "identityType"
    type = "S"
  }

  attribute {
    name = "approvalStatus"
    type = "S"
  }

  global_secondary_index {
    name               = local.organization_status_index
    hash_key           = "approvalStatus"
    range_key          = "organizationId"
    write_capacity     = 1
    read_capacity      = 1
    projection_type    = "KEYS_ONLY"
    non_key_attributes = []
  }

  tags = {
    Environment = var.environment_name
  }
}

resource "aws_s3_bucket" "registry_bucket" {
  bucket = local.bucket
  acl    = "private"

  versioning {
    enabled = true
  }
  tags = {
    Environment = var.environment_name
  }
}

resource "aws_cloudwatch_event_bus" "registry_event_bus" {
  name = local.event_bus
  tags = {
    Environment = var.environment_name
  }
}
