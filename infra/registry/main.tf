variable "environment_name" {
  type = string
}

variable "project_prefix" {
  type = string
}

locals {
  environment_suffix = title(var.environment_name)
  bucket = "${var.project_prefix}Registry${local.environment_suffix}"
  lookup_table = "RegistryLookUp${local.environment_suffix}"
  organization_status_index = "OrganizationStatus${local.environment_suffix}"
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

resource "aws_ssm_parameter" "registry_name" {
  name        = "/${var.environment_name}/registry/lookup_table"
  type        = "SecureString"
  value       = local.lookup_table
}

resource "aws_ssm_parameter" "organization_status_index_name" {
  name        = "/${var.environment_name}/registry/indices/organizationStatus"
  type        = "SecureString"
  value       = local.organization_status_index
}
