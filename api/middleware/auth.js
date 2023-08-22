require('dotenv/config');
const { verify, decode } = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (! token) {
    res.status(401).send('Missing access token');
  }

  const [, accessToken] = token.split(' ');

  try {
    await verify(accessToken, process.env.JWT_SECRET_KEY);

    const { id, email } = await decode(accessToken);

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    res.status(401).send('User unauthenticated');
  }
}