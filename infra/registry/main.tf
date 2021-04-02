variable "environment_name" {
  type = string
}

locals {
  environment_suffix = title(var.environment_name)
  name = "RegistryTable${local.environment_suffix}"
  organization_status_index_name = "OrganizationStatus${local.environment_suffix}"
}
resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = local.name
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
    name               = local.organization_status_index_name
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

resource "aws_ssm_parameter" "registry_name" {
  name        = "/${var.environment_name}/registry/name"
  type        = "SecureString"
  value       = local.name
}

resource "aws_ssm_parameter" "organization_status_index_name" {
  name        = "/${var.environment_name}/registry/indices/organizationStatus"
  type        = "SecureString"
  value       = local.organization_status_index_name
}
