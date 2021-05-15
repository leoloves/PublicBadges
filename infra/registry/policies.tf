resource "aws_iam_policy" "registry_bucket_read_access" {
  name = "${local.bucket}-read-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.registry_bucket_read_access.json
}

resource "aws_iam_policy" "registry_bucket_write_access" {
  name = "${local.bucket}-write-access-policy-${var.environment_name}"
  path   = "/"
  policy = data.aws_iam_policy_document.registry_bucket_write_access.json
}

resource "aws_iam_policy" "registry_lookup_table_access" {
  name = "${local.lookup_table}-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.registry_lookup_table_access.json
}

resource "aws_iam_policy" "email_send_policy" {
  name = "${local.name}-email-send-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.email_send_policy.json
}
