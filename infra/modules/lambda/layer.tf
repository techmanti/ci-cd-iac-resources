resource "null_resource" "install_layer_deps" {
  triggers = {
    layer_build = filemd5("${local.layers_path}/got/nodejs/package.json")
  }
    provisioner "local-exec" {
    working_dir = "${local.layers_path}/got/nodejs"
    command = "npm install --production"
}
}

data "archive_file" "email_layer" {
  output_path = "files/email-layer.zip"
  type        = "zip"
  source_dir  = "${local.layers_path}/got"

  depends_on = [null_resource.install_layer_deps]
}

resource "aws_lambda_layer_version" "email" {
  layer_name          = "email-layer"
  description         = "email: ^11.8.2"
  filename            = data.archive_file.email_layer.output_path
  source_code_hash    = data.archive_file.email_layer.output_base64sha256
  compatible_runtimes = ["nodejs14.x"]
}