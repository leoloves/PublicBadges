terraform {
<<<<<<< HEAD
  required_providers {
    random = {
      source  = "hashicorp/random"
      version = "3.0.0"
    }

=======
  backend "remote" {
    organization = "public-spaces"
    workspaces {
      name = "infra"
    }
  }

  required_providers {
>>>>>>> master
    aws = {
      source  = "hashicorp/aws"
      version = ">= 2.0.0"
    }
  }

  required_version = "~> 0.14"
<<<<<<< HEAD

  backend "remote" {
    organization = "public-spaces"
    workspaces {
      name = "infra"
    }
  }
}

provider "aws" {
  region  = "us-east-1"
}

resource "aws_s3_bucket" "example" {
  acl    = "private"
=======
}

provider "aws" {
  region = "us-east-1"
>>>>>>> master
}
