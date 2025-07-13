const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/invariantError');

const TokenManager = {
  generateAccessToken(payload) {
    // Parameter payload merupakan objek yang disimpan ke dalam salah satu artifacts JWT.
    // Biasanya objek payload berisi properti yang mengindikasikan identitas pengguna,
    // contohnya user id.
    return Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY);
    // The generate function takes 2 arguments, the payload & secret key. Secret key
    // refers to a key which will be used by the encrypting algorithm to create a JWT token
  },
  generateRefreshToken(payload) {
    return Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY);
  },
  verifyRefreshToken(refreshToken) {
    // This function will verify the refreshToken's signature, so the rogram knows
    // the user's valid
    try {
      const artifacts = Jwt.token.decode(refreshToken);
      // decodes the refreshToken first, since it's JWT

      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
};

module.exports = TokenManager;
