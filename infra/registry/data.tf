data "aws_iam_policy_document" "registry_lookup_table_access" {
  statement {
    actions = [
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:GetItem",
      "dynamodb:PutItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem"
    ]

    resources = [
     aws_dynamodb_table.lookup_table.arn,
    ]
  }
}

data "aws_iam_policy_document" "registry_bucket_read_access" {
  statement {
    actions = [
      "s3:ListBucket",
      "s3:GetObject",
    ]

    resources = [
      aws_s3_bucket.registry_bucket.arn,
      "${aws_s3_bucket.registry_bucket.arn}/*"
    ]
  }
}

data "aws_iam_policy_document" "registry_bucket_write_access" {
  statement {
    actions = [
      "s3:PutObject",
      "s3:PutObjectAcl"
    ]

    resources = [
      aws_s3_bucket.registry_bucket.arn,
      "${aws_s3_bucket.registry_bucket.arn}/*"
    ]
  }
}

data "aws_iam_policy_document" "email_send_policy" {
  statement {
    actions = [
      "ses:SendEmail",
      "ses:SendTemplatedEmail",
      "ses:SendRawEmail"
    ]
    resources = ["*"]
  }
}

