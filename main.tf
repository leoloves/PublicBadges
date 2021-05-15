variable "TFC_WORKSPACE_NAME" {
  type    = string
  default = ""
}
variable "APPROVER_EMAIL" {
  type = string
}


variable "BADGES_SECRET_KEY" {
  type = string
}

locals {
  lambda_basic_execution_role = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  environment_name            = var.TFC_WORKSPACE_NAME != "" ? trimprefix(var.TFC_WORKSPACE_NAME, "public-badges-") : terraform.workspace
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
  region = "eu-west-1"
}

module "public-spaces-shared" {
  source           = "./infra/shared"
  environment_name = local.environment_name
  project_prefix   = "public-badges"
}

module "public-spaces-api" {
  source           = "./infra/api"
  environment_name = local.environment_name
  project_prefix   = "public-badges"
  policies = [
    module.public-spaces-registry.read_registry_bucket_policy,
    module.public-spaces-registry.read_registry_lookup_table_policy,
    module.public-spaces-shared.write_event_bus_policy,
    local.lambda_basic_execution_role
  ]
}


module "public-spaces-registry" {
  source           = "./infra/registry"
  environment_name = local.environment_name
  project_prefix   = "public-badges"
  approver_email   = var.APPROVER_EMAIL
  policies = [
    module.public-spaces-registry.read_registry_bucket_policy,
    module.public-spaces-registry.write_registry_bucket_policy,
    module.public-spaces-registry.read_registry_lookup_table_policy,
    module.public-spaces-registry.registry_email_send_policy,
    module.public-spaces-shared.write_event_bus_policy,
    local.lambda_basic_execution_role
  ]
}

module "public-spaces-badges" {
  source           = "./infra/badges"
  environment_name = local.environment_name
  secret_key       = var.BADGES_SECRET_KEY
  project_prefix   = "public-badges"
  policies = [
    module.public-spaces-registry.read_registry_bucket_policy,
    module.public-spaces-registry.write_registry_bucket_policy,
    module.public-spaces-shared.write_event_bus_policy,
    local.lambda_basic_execution_role
  ]
}
