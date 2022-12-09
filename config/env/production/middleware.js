module.exports = {
  settings: {
    logger: {
      level: "error",
    },
    public: {
      path: "/data/public",
    },
    cors: {
      origin: ["*"], //allow all origins
      headers: ["*"], //allow all headers
    },
  },
};
