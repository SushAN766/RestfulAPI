const TOKEN = process.env.TOKEN;
const TOKEN_EXPIRY = parseInt(process.env.TOKEN_EXPIRY);
let tokenStore = {
  [TOKEN]: Date.now() + TOKEN_EXPIRY * 1000
};

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');

  if (!tokenStore[token] || Date.now() > tokenStore[token]) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  next();
};
