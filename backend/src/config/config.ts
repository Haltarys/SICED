const PORT = 3000;
const DB_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;
const DB_ADMIN_USER = process.env.DB_ADMIN_USER;
const DB_ADMIN_PASSWORD = process.env.DB_ADMIN_PASSWORD;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export {
  PORT,
  DB_URL,
  DB_NAME,
  DB_ADMIN_USER,
  DB_ADMIN_PASSWORD,
  JWT_SECRET_KEY,
};
