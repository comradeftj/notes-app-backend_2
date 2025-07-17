/* eslint-disable no-underscore-dangle */
const redis = require('redis');

class CacheService {
  constructor() {
    this._client = redis.createClient({
      socket: {
        host: process.env.REDIS_SERVER,
      },
    });

    // note: an error may happen when creating clients, caused by the server not being available
    //       at the established host, or for other reasons, which makes this error handling
    //       necessary
    this._client.on('error', (error) => {
      console.error(error);
    });
    this._client.connect();
  }

  async set(key, value, expirationInSecond) {
    await this._client.set(key, value, {
      EX: expirationInSecond,
    });
  }

  async get(key) {
    const result = await this._client.get(key);
    if (result === null) throw new Error('Cache not found');

    return result;
  }

  delete(key) {
    return this._client.del(key);
  }
}

module.exports = CacheService;
