import AWS from "aws-sdk";
const ses = new AWS.SES();

const email = {
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
    const mail = email.create({recipients, sender, body, subject});
    await ses.sendEmail(mail).promise();
  },
};

export default email;
