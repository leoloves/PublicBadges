variable "TFC_WORKSPACE_NAME" {
  type    = string
  default = ""
}

locals {
  environment_name = var.TFC_WORKSPACE_NAME != "" ? trimprefix(var.TFC_WORKSPACE_NAME, "public-badges-") : terraform.workspace
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


module "public-spaces-registry" {
  source           = "./infra/registry"
  environment_name = local.environment_name
  project_prefix   = "PublicBadges"
}

