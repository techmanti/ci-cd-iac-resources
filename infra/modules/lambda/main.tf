data "archive_file" "email_api_artefact" {
  output_path = "files/email-api-artefact.zip"
  type        = "zip"
  source_file = "${path.module}/lambdas/email-api/index.js"
}

resource "aws_lambda_function" "email_api" {
  function_name = "email_api"
  handler       = "index.handler"
  role          = aws_iam_role.email_api_lambda.arn
  runtime       = "nodejs14.x"

  filename         = data.archive_file.email_api_artefact.output_path
  source_code_hash = data.archive_file.email_api_artefact.output_base64sha256
  environment {
    variables = {
      EMAIL    = var.EMAIL
      PASSWORD = var.PASSWORD
    }
  }
  timeout     = 5
  memory_size = 128

  layers = [aws_lambda_layer_version.email.arn]

  tags = local.common_tags
}


resource "aws_lambda_function_url" "email_api_url_live" {
  function_name      = aws_lambda_function.email_api.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["*"]
    allow_headers     = ["*"]
    expose_headers    = ["*"]
    max_age           = 86400
  }
}

resource "aws_lambda_permission" "invoke_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.email_api.arn
  principal     = "*"
}

#IAM POLICY
data "aws_iam_policy_document" "lambda_assume_role" {

  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "email_api_lambda" {
  name               = "email-api-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json

  tags = local.common_tags
}

data "aws_iam_policy_document" "create_logs_cloudwatch" {
  statement {
    sid       = "AllowCreatingLogGroups"
    effect    = "Allow"
    resources = ["arn:aws:logs:*:*:*"]
    actions   = ["logs:CreateLogGroup"]
  }

  statement {
    sid       = "AllowWritingLogs"
    effect    = "Allow"
    resources = ["arn:aws:logs:*:*:log-group:/aws/lambda/*:*"]

    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
  }
}

resource "aws_iam_policy" "create_logs_cloudwatch" {
  name   = "create-cw-logs-policy"
  policy = data.aws_iam_policy_document.create_logs_cloudwatch.json

}

resource "aws_iam_role_policy_attachment" "email_api_cloudwatch" {
  policy_arn = aws_iam_policy.create_logs_cloudwatch.arn
  role       = aws_iam_role.email_api_lambda.name

}