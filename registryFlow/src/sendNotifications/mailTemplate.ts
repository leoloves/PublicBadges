const createMail = ({recipients, sender, body, subject}) => {
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
};

export default createMail;
