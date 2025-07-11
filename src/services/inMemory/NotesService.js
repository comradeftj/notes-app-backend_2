/* eslint-disable no-underscore-dangle */
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/invariantError');
const NotFoundError = require('../../exceptions/notFoundError');

class NotesService {
  constructor() {
    this._notes = [];
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNote = {
      title, tags, body, id, createdAt, updatedAt,
    };

    this._notes.push(newNote);
    const isSuccess = this._notes.filter((note) => note.id === id).length > 0;
    if (!isSuccess) {
      throw new InvariantError('Catatan gagal ditambahkan');
    }
    return id;
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.filter((item) => item.id === id)[0];
    if (!note) {
      throw new NotFoundError('Catatan tidak ditemukan');
    }
    return note;
  }

  editNoteById(id, { title, body, tags }) {
    const idx = this._notes.findIndex((note) => note.id === id);
    if (idx === -1) {
      throw new NotFoundError('Gagal memperbarui catatan. Id tidak ditemukan');
    }
    const updatedAt = new Date().toISOString();
    this._notes[idx] = {
      ...this._notes[idx],
      title,
      tags,
      body,
      updatedAt,
    };
  }

  deleteNoteById(id) {
    const idx = this._notes.findIndex((note) => note.id === id);
    if (idx === -1) {
      throw new NotFoundError('Catatan gagal dihapus. Id tidak ditemukan');
    }
    this._notes.splice(idx, 1);
  }
}

module.exports = NotesService;
