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

