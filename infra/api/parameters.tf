resource "aws_ssm_parameter" "api_role" {
  name        = "${local.parameter_prefix}/role"
  type        = "SecureString"
  value       = aws_iam_role.api_role.arn
}
