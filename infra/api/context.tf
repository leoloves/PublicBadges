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
  name = "registry"
  environment_suffix = title(var.environment_name)
  role = "${var.project_prefix}-${local.name}-role-${var.environment_name}"
}

