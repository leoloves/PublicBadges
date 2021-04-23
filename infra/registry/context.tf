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
  name = "registry"
  environment_suffix = title(var.environment_name)
  role = "${var.project_prefix}-${local.name}-role-${var.environment_name}"
  bucket = "${var.project_prefix}-${local.name}-bucket-${var.environment_name}"
  lookup_table = "${var.project_prefix}-${local.name}-lookup-table-${var.environment_name}"
  organization_status_index ="${var.project_prefix}-organization-status-index-${var.environment_name}"
  parameter_prefix="/${var.project_prefix}/${var.environment_name}/${local.name}"
}

output "read_registry_bucket_policy" {
  value = aws_iam_policy.registry_bucket_read_access.arn
}

output "write_registry_bucket_policy" {
  value = aws_iam_policy.registry_bucket_write_access.arn
}

output "read_registry_lookup_table_policy" {
  value = aws_iam_policy.registry_lookup_table_access.arn
}
