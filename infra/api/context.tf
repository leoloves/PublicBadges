variable "environment_name" {
  type = string
}

variable "read_registry_policy" {
  type = string
}

variable "project_prefix" {
  type = string
}
locals {
  name = "registry"
  environment_suffix = title(var.environment_name)
  role = "${var.project_prefix}-${local.name}-role-${var.environment_name}"
}

