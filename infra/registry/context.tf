variable "environment_name" {
  type = string
}

variable "project_prefix" {
  type = string
}

locals {
  name = "registry"
  environment_suffix = title(var.environment_name)
  bucket = "${var.project_prefix}-${local.name}-bucket-${var.environment_name}"
  event_bus = "${var.project_prefix}-${local.name}-event-bus-${var.environment_name}"
  lookup_table = "${var.project_prefix}-${local.name}-lookup-table-${var.environment_name}"
  organization_status_index ="${var.project_prefix}-organization-status-index-${var.environment_name}"
  parameter_prefix="/${var.project_prefix}/${var.environment_name}/${local.name}"
}

resource "aws_ssm_parameter" "registry_event_bus" {
  name        = "${local.parameter_prefix}/event_bus"
  type        = "SecureString"
  value       = local.event_bus
}

resource "aws_ssm_parameter" "registry_lookup_table_name" {
  name        = "${local.parameter_prefix}/lookup_table"
  type        = "SecureString"
  value       = local.lookup_table
}

resource "aws_ssm_parameter" "registry_bucket_name" {
  name        = "${local.parameter_prefix}/bucket"
  type        = "SecureString"
  value       = local.bucket
}

resource "aws_ssm_parameter" "organization_status_index_name" {
  name        = "${local.parameter_prefix}/indices/organization_status"
  type        = "SecureString"
  value       = local.organization_status_index
}

output "read_registry_bucket_policy" {
  value = aws_iam_policy.registry_bucket_read_access.arn
}

output "write_registry_event_bus_policy" {
  value = aws_iam_policy.registry_event_bus_write_access.arn
}

output "read_registry_lookup_table_policy" {
  value = aws_iam_policy.registry_lookup_table_read_access.arn
}
