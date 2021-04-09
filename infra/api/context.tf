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
