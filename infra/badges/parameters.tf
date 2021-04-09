resource "aws_ssm_parameter" "event_bus" {
  name        = "${local.parameter_prefix}/event_bus"
  type        = "SecureString"
  value       = local.event_bus
}

resource "aws_ssm_parameter" "bucket_name" {
  name        = "${local.parameter_prefix}/bucket"
  type        = "SecureString"
  value       = local.bucket
}
