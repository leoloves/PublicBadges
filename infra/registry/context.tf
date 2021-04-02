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
}

resource "aws_ssm_parameter" "registry_event_bus" {
  name        = "/${var.environment_name}/${local.name}/event_bus"
  type        = "SecureString"
  value       = local.event_bus
}

resource "aws_ssm_parameter" "registry_lookup_table_name" {
  name        = "/${var.environment_name}/${local.name}/lookup_table"
  type        = "SecureString"
  value       = local.lookup_table
}

resource "aws_ssm_parameter" "registry_bucket_name" {
  name        = "/${var.environment_name}/${local.name}/bucket"
  type        = "SecureString"
  value       = local.bucket
}

resource "aws_ssm_parameter" "organization_status_index_name" {
  name        = "/${var.environment_name}/${local.name}/indices/organization_status"
  type        = "SecureString"
  value       = local.organization_status_index
}
