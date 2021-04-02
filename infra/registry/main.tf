variable "environment_name" {
  type = string
}

locals {
  environment_suffix = title(var.environment_name)
}
resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "RegistryTable${local.environment_suffix}"
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
    name               = "OrganizationStatus${local.environment_suffix}"
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

