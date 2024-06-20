import NodeMailJet from "node-mailjet"; // Importing NodeMailJet library

// Connecting to MailJet API using provided API keys
const mailJet = NodeMailJet.apiConnect(
  process.env.MAILJET_APIKEY,
  process.env.MAILJET_SECRETKEY
);

class Mail {
  // Asynchronous method to send a forgot password email
  async sendforgotemail(email, name, token) {
    try {
      // Creating a request to send an email using MailJet API
      const request = await mailJet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "di.meira@hotmail.com", // Sender's email address
              Name: "Diego Meira", // Sender's name
            },
            To: [
              {
                Email: email, // Recipient's email address (provided as a parameter)
                Name: name, // Recipient's name (provided as a parameter)
              },
            ],
            TemplateID: 6065590, // MailJet template ID for the email
            TemplateLanguage: true, // Enable template language for dynamic content
            Subject: "PasswordChange", // Subject of the email
            Variables: {
              name: name, // Variables to be replaced in the template
              token: token, // Another variable for template replacement
            },
          },
        ],
      });

      return request; // Return the result of sending the email
    } catch (error) {
      return { error }; // Return an object with the error if sending email fails
    }
  }
}

export default new Mail(); // Export an instance of the Mail class
