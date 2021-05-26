resource "aws_ses_template" "badge_application_status_changed" {
  name    = "${var.project_prefix}-${local.name}-badge-application-status-changed-template"
  subject = "Your ${badgeName} Application was updated to ${status}"
  html    = file("${path.root}/emailTemplates/compiled/badge_application_status_changed.html")
  text    = file("${path.root}/emailTemplates/compiled/badge_application_status_changed.md")
}
