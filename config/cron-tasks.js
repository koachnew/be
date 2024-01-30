module.exports = {
  sendRejectEmail: {
    task: async ({ strapi }) => {
      const currentDate = new Date();

      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

      // This is for testing purpose. Please replace fiveMinutesAgo to twoWeeksAgo on the query after the testing
 
      // const fiveMinutesAgo = new Date(currentDate.getTime() - 5 * 60 * 1000);

      const rejectionMails = await strapi.entityService.findMany(
        "api::mail.mail",
        {
          filters: {
            $and: [
              {
                emailType: { $eq: "job_rejection" },
                createdAt: { $lte: twoWeeksAgo.toISOString() },
              },
            ],
          },
          populate: {
            appliedjob: {
              populate: {
                job: {
                  title: true,
                },
              },
              status: true,
            },
          },
        }
      );

      if (rejectionMails) {
        try {
          for (mail of rejectionMails) {
            // Sen
            if (mail?.appliedjob?.status === "REJECTED") {
              console.log(mail);
              const res = await strapi
                .plugin("email")
                .service("email")
                .send({
                  to: mail.to,
                  from: "Koach Job <koachproject@gmail.com>",
                  subject: `${mail?.appliedjob?.job?.title} Job Application`,
                  text: mail?.body,
                });
              if (res.accepted) {
                await strapi.entityService.delete("api::mail.mail", mail.id);
              }
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    // options: { rule: "0 0 * * 0" }, //This is run once every week
    options: { rule: "* * * * *" },
  },
};
