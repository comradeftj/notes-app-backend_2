/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/invariantError');
const NotFoundError = require('../../exceptions/notFoundError');
const AuthenticationError = require('../../exceptions/authenticationError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async verifyUserCredential(userName, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE "userName" = $1',
      values: [userName],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }
    const { id, password: hashedPassword } = result.rows[0];
    // disini, hashedPassword bertugas menyimpan nilai password dari result

    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }
    return id;
  }

  async verifyNewUsername(userName) {
    const query = {
      text: 'SELECT * FROM users WHERE "userName" = $1',
      values: [userName],
    };
    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError('Gagal menambahkan user. Username sudah digunakan.');
    }
  }

  async addUser({ userName, password, fullName }) {
    await this.verifyNewUsername(userName);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, userName, hashedPassword, fullName],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('User gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getUserById(userId) {
    const query = {
      text: 'SELECT id, "userName", "fullName" FROM users WHERE id = $1',
      values: [userId],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User tidak ditemukan');
    }
    return result.rows[0];
  }

  async getUsersByUsername(username) {
    const query = {
      text: 'SELECT id, "userName", "fullName" FROM users WHERE "userName" LIKE $1',
      values: [`%${username}%`],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = UsersService;
