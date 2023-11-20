module.exports = {
  async afterCreate(event) {
    const {
      result: { to, subject, body, emailType },
    } = event;
    try {
      // only send the email if the email is not a job_rejection mail
      if (emailType !== "job_rejection") {
        await strapi.plugins["email"].services.email.send({
          to: to,
          from: "Koach <koachassits1@gmail.com>",
          subject: subject,
          html: body,
        });
      }
    } catch (e) {
      console.log("EMAIL SENDING ERROR: ", e);
    }
  },
};
