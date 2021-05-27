resource "aws_ssm_parameter" "badges_role" {
  name        = "${local.parameter_prefix}/role"
  type        = "SecureString"
  value       = aws_iam_role.badges_role.arn
}

resource "aws_ssm_parameter" "badges_secret_key" {
  name        = "${local.parameter_prefix}/secret_key"
  type        = "SecureString"
  value       = var.secret_key
}

resource "aws_ssm_parameter" "badge_application_status_changed_template" {
  name        = "${local.parameter_prefix}/templates/badge_application_status_changed"
  type        = "SecureString"
  value       = aws_ses_template.badge_application_status_changed.name
}
