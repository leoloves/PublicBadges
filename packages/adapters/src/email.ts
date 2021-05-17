import AWS from "aws-sdk";
import {Email} from "@public-badges/types";
const ses = new AWS.SES();

const email: Email = {
  create: ({recipients, sender, body, subject}) => {
    return {
      Destination: {
        ToAddresses: [...recipients],
      },
      Message: {
        Body: {
          Text: {Data: body},
        },

        Subject: {
          Data: subject,
        },
      },
      Source: sender,
    };
  },
  send: async ({recipients, sender, body, subject}) => {
    const mail: any = email.create({recipients, sender, body, subject});
    await ses.sendEmail(mail).promise();
  },
};

export default email;
