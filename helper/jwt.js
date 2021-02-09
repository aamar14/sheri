const expressJwt = require("express-jwt");
function authJwt() {
  const secret = process.env.secret;
  return expressJwt({
    secret,
    isRevoked: isRevoked,
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },
      "/api/v1/users/login",
      "/api/v1/users/register",
    ],
  });
}
function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  } else {
    done();
  }
}
module.exports = authJwt;
