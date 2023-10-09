export default ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', 'db.huiwei.tech'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'jcsj'),
      user: env('DATABASE_USERNAME', 'jcsj'),
      password: env('DATABASE_PASSWORD', 'eGXa26yJBpcNRfba'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
