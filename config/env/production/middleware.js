module.exports = {
    settings: {
      logger: {
        level: "error",
      },
      public: {
        path: "/data/public",
      },
      settings: {
        cors: {
          origin: ['*'], //allow all origins
          headers: ['*'], //allow all headers
        },
      },
    },
  };