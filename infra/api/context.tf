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
  parameter_prefix="/${var.project_prefix}/${var.environment_name}/${local.name}"
}


resource "aws_ssm_parameter" "role" {
  name        = "/${local.parameter_prefix}/role"
  type        = "SecureString"
  value       = aws_iam_role.api_role.arn
}
