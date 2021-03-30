terraform {
  backend "remote" {
    # The name of your Terraform Cloud organization.
    organization = "public-spaces"

    # The name of the Terraform Cloud workspace to store Terraform state files in.
    workspaces {
      name = "infra"
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
  region  = "us-east-1"
}

resource "aws_s3_bucket" "example" {
  acl    = "private"
}
