module.exports = {
  settings: {
    cors: {
      enabled: true,
      origin: ['*']
    },
    logger: {
      level: "error",
    },
    public: {
      path: "/data/public",
    }
  },
};
