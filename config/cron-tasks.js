module.exports = {
  sendRejectEmail: {
    task: async ({ strapi }) => {
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

      const rejectionMails = await strapi.entityService.findMany(
        "api::mail.mail",
        {
          filters: {
            $and: [
              {
                emailType: { $eq: "jobRejection" },
                createdAt: { $gte: twoWeeksAgo },
              },
            ],
          },
        }
      );
      for (mail of rejectionMails) {
        await strapi
          .plugin("email")
          .service("email")
          .send({
            to: mail.email,
            from: "Koach assist",
            subject: "Job Application",
            text: `Thank you for your application. At this time, your application was not chosen
                    for further review, however, we will keep your resume on filefor any future job
                    openings that may occur`,
          });
      }
    },
    options: { rule: "0 0 * * 0" }, //This is run once every week
  },
};
