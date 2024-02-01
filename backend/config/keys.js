module.exports = {
  secretOrKey: process.env.SECRET_OR_KEY,
  mongoURI: process.env.MONGO_URI,
  user: process.env.EMAIL_USERNAME,
  pass: process.env.EMAIL_PASSWORD,

  isProduction: process.env.NODE_ENV === "production",
};
