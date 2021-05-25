import AWS from "aws-sdk";
import { Email } from "@public-badges/types";
const ses = new AWS.SES();

const email: Email = {
  create: ({ recipients, sender, body, subject }) => {
    return {
      Destination: {
        ToAddresses: [...recipients],
      },
      Source: sender,
      Message: {
        Body: {
          Text: { Data: body },
        },

        Subject: {
          Data: subject,
        },
      }
    };
  },
  createFromTemplate: ({ recipients, sender, templateName, templateData }) => {
    return {
      Destination: {
        ToAddresses: [...recipients],
      },
      Source: sender,
      Template: templateName,
      TemplateData: JSON.stringify(templateData)
    };
  },
  sendTemplate: async ({
    recipients, sender, templateName, templateData
  }) => {
    const mail: any = email.createFromTemplate({ recipients, sender, templateData, templateName });
    await ses.sendTemplatedEmail(mail).promise();
  },
  send: async ({ recipients, sender, body, subject }) => {
    const mail: any = email.create({ recipients, sender, body, subject });
    await ses.sendEmail(mail).promise();
  },
};

export default email;
