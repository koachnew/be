module.exports = ({ env }) => ({
    email: {
      config: {
        provider: 'sendgrid',
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          defaultFrom: 'koachassits1@gmail.com',
          defaultReplyTo: 'koachassits1@gmail.com',
        },
      },
    },
    'import-export-entries': {
      enabled: true,
    },
  });
  