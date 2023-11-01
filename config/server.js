const cronTasks = require("./cron-tasks");
module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  proxy: true,
  url: env("RENDER_EXTERNAL_URL"),
  cron: {
    enabled: true,
    tasks: cronTasks,
  },
});
