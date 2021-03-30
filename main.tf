terraform {
  backend "remote" {
    organization = "public-spaces"
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
  region = "us-east-1"
}
