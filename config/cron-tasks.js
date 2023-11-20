module.exports = {
  sendRejectEmail: {
    task: async ({ strapi }) => {
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

      // This is for testing purpose. Please replace fiveMinutesAgo to twoWeeksAgo on the query after the testing

      const fiveMinutesAgo = twoWeeksAgo.getDate() - 5 * 60 * 100;
      console.log("This is 10min");

      const rejectionMails = await strapi.entityService.findMany(
        "api::mail.mail",
        {
          filters: {
            $and: [
              {
                emailType: { $eq: "job_rejection" },
                createdAt: { $gte: fiveMinutesAgo },
              },
            ],
          },
        }
      );

      if (rejectionMails) {
        try {
          for (mail of rejectionMails) {
            console.log(mail);
            const res = await strapi.plugin("email").service("email").send({
              to: mail.to,
              from: "Koach Job <koachproject@gmail.com>",
              subject: "Job Application",
              text: mail?.body,
            });

            if (res.accepted) {
              await strapi.entityService.delete("api::mail.mail", mail.id);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    // options: { rule: "0 0 * * 0" }, //This is run once every week
    options: { rule: "*/5 * * * *" }, //This is run once every 5minute
  },
};
