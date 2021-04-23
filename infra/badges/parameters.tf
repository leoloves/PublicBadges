resource "aws_ssm_parameter" "badges_role" {
  name        = "${local.parameter_prefix}/role"
  type        = "SecureString"
  value       = aws_iam_role.badges_role.arn
}
