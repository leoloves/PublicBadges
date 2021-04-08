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

resource "aws_iam_policy" "registry_event_bus_write_access" {
  name = "${local.event_bus}-write-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.registry_event_bus_write_access.json
}

resource "aws_iam_policy" "registry_lookup_table_read_access" {
  name = "${local.lookup_table}-read-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.registry_lookup_table_read_access.json
}

resource "aws_iam_policy" "registry_lookup_table_write_access" {
  name = "${local.lookup_table}-read-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.registry_lookup_table_write_access.json
}
