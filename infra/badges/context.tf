variable "environment_name" {
  type = string
}

variable "project_prefix" {
  type = string
}

locals {
  name = "badges"
  bucket = "${var.project_prefix}-${local.name}-bucket-${var.environment_name}"
  event_bus = "${var.project_prefix}-${local.name}-event-bus-${var.environment_name}"
  parameter_prefix="/${var.project_prefix}/${var.environment_name}/${local.name}"
}

resource "aws_ssm_parameter" "event_bus" {
  name        = "/${var.environment_name}/${local.name}/event_bus"
  type        = "SecureString"
  value       = local.event_bus
}

resource "aws_ssm_parameter" "bucket_name" {
  name        = "/${local.parameter_prefix}/bucket"
  type        = "SecureString"
  value       = local.bucket
}
