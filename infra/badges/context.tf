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
}

resource "aws_ssm_parameter" "event_bus" {
  name        = "/${var.environment_name}/${local.name}/event_bus"
  type        = "SecureString"
  value       = local.event_bus
}

resource "aws_ssm_parameter" "bucket_name" {
  name        = "/${var.environment_name}/${local.name}/bucket"
  type        = "SecureString"
  value       = local.bucket
}
