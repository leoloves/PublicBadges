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

resource "aws_ssm_parameter" "registry_role" {
  name        = "${local.parameter_prefix}/role"
  type        = "SecureString"
  value       = aws_iam_role.registry_role.arn
}

resource "aws_ssm_parameter" "registry_approver_email" {
  name        = "${local.parameter_prefix}/approver_email"
  type        = "SecureString"
  value       = var.approver_email
}

resource "aws_ssm_parameter" "approval_requested_template" {
  name        = "${local.parameter_prefix}/templates/approval_requested"
  type        = "SecureString"
  value       = aws_ses_template.approval_requested_template.name
}
