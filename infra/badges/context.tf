variable "environment_name" {
  type = string
}

variable "secret_key" {
  type = string
}

variable "project_prefix" {
  type = string
}

variable "policies" {
  type = list
}

locals {
  name = "badges"
  role = "${var.project_prefix}-${local.name}-role-${var.environment_name}"
  parameter_prefix="/${var.project_prefix}/${var.environment_name}/${local.name}"
}
