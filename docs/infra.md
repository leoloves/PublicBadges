# Infra

These are the terraform templates to set up the required common resources on
AWS.

The resources are split up around two concerns that should not be mixed:

- Maintaining the registry of PublicSpaces partners

- Issuance of the PublicBadges artifacts

Instruction on how to use Terraform can be found on the project's
[website](https://www.terraform.io/).

## TODO

- [x] Create Terraform Account
- [x] Connect Terraform to Github
- [x] Write Terraform Templates
- [x] Write Github Action Workflow
- [x] Write Documentation
