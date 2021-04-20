variable "environment_name" {
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
  event_bus = "${var.project_prefix}-${local.name}-event-bus-${var.environment_name}"
  role = "${var.project_prefix}-${local.name}-role-${var.environment_name}"
  parameter_prefix="/${var.project_prefix}/${var.environment_name}/${local.name}"
}

output "write_badges_event_bus_policy" {
  value = aws_iam_policy.badges_event_bus_write_access.arn
}
