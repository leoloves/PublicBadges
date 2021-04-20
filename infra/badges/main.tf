resource "aws_cloudwatch_event_bus" "badges_event_bus" {
  name = local.event_bus
  tags = {
    Environment = var.environment_name
  }
}

data "aws_iam_policy_document" "badges_event_bus_write_access" {
  statement {
    actions = [
      "events:PutEvents"
    ]

    resources = [
      aws_cloudwatch_event_bus.badges_event_bus.arn
    ]
  }
}

resource "aws_iam_policy" "badges_event_bus_write_access" {
  name = "${local.event_bus}-write-access-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.badges_event_bus_write_access.json
}

data "aws_iam_policy_document" "lambda_role_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "badges_role" {
  name                = local.role
  assume_role_policy = data.aws_iam_policy_document.lambda_role_assume_role_policy.json
  managed_policy_arns = var.policies
}
