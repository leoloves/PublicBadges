resource "aws_ssm_parameter" "event_bus" {
  name        = "${local.parameter_prefix}/event_bus"
  type        = "SecureString"
  value       = local.event_bus
}

resource "aws_ssm_parameter" "badges_role" {
  name        = "${local.parameter_prefix}/role"
  type        = "SecureString"
  value       = aws_iam_role.badges_role.arn
}
