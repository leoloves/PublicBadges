variable "environment_name" {
  type = string
}

variable "project_prefix" {
  type = string
}

locals {
  environment_suffix = title(var.environment_name)
  bucket = "${var.project_prefix}-registry-bucket-${var.environment_name}"
  event_bus = "${var.project_prefix}-registry-event-bus-${var.environment_name}"
  lookup_table = "${var.project_prefix}-registry-lookup-table-${var.environment_name}"
  organization_status_index ="${var.project_prefix}-organization-status-index-${var.environment_name}"
}
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

resource "aws_ssm_parameter" "registry_event_bus" {
  name        = "/${var.environment_name}/registry/event_bus"
  type        = "SecureString"
  value       = local.event_bus
}

resource "aws_ssm_parameter" "registry_lookup_table_name" {
  name        = "/${var.environment_name}/registry/lookup_table"
  type        = "SecureString"
  value       = local.lookup_table
}

resource "aws_ssm_parameter" "registry_bucket_name" {
  name        = "/${var.environment_name}/registry/bucket"
  type        = "SecureString"
  value       = local.bucket
}

resource "aws_ssm_parameter" "organization_status_index_name" {
  name        = "/${var.environment_name}/registry/indices/organization_status"
  type        = "SecureString"
  value       = local.organization_status_index
}
