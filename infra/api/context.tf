variable "environment_name" {
  type = string
}

variable "policies" {
  type = list
}

variable "project_prefix" {
  type = string
}
locals {
  name = "api"
  environment_suffix = title(var.environment_name)
  role = "${var.project_prefix}-${local.name}-role-${var.environment_name}"
}


resource "aws_ssm_parameter" "role" {
  name        = "/${var.environment_name}/${local.name}/role"
  type        = "SecureString"
  value       = aws_iam_role.api_role.arn
}
