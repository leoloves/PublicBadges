resource "aws_ses_template" "organization_approval_requested_template" {
  name    = "${var.project_prefix}-${local.name}-organization_approval-requested-template"
  subject = "{{displayName}} was accepted to the PublicSpaces Registry"
  html    = file("${path.root}/emailTemplates/compiled/organization_approval_requested.html")
  text    = file("${path.root}/emailTemplates/compiled/organization_approval_requested.md")
}

resource "aws_ses_template" "pending_organization_registration_template" {
  name    = "${var.project_prefix}-${local.name}-pending-organization-template"
  subject = "{{displayName}} was accepted to the PublicSpaces Registry"
  html    = file("${path.root}/emailTemplates/compiled/pending_organization_registration.html")
  text    = file("${path.root}/emailTemplates/compiled/pending_organization_registration.md")
}

resource "aws_ses_template" "approved_organization_registration_template" {
  name    = "${var.project_prefix}-${local.name}-approved-organization-template"
  subject = "{{displayName}} was accepted to the PublicSpaces Registry"
  html    = file("${path.root}/emailTemplates/compiled/approved_organization_registration.html")
  text    = file("${path.root}/emailTemplates/compiled/approved_organization_registration.md")
}
