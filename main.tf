locals {
 workspace = trimprefix(terraform.workspace, "public-badges-") 
}

terraform {
  backend "remote" {
    organization = "public-spaces"
    workspaces {
      prefix = "public-badges-"
    }
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 2.0.0"
    }
  }

  required_version = "~> 0.14"
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_dynamodb_table" "basic-dynamodb-table" {
  name           = "RegistryTable${title(local.workspace)}"
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
    name               = "OrganizationStatus${title(local.workspace)}"
    hash_key           = "approvalStatus"
    range_key          = "organizationId"
    write_capacity     = 1
    read_capacity      = 1
    projection_type    = "KEYS_ONLY"
    non_key_attributes = []
  }

  tags = {
    Environment = local.workspace
  }
}

