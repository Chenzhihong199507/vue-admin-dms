export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0c5c1cf6ee3857ae396efc32d9b22641'),
  },
});
