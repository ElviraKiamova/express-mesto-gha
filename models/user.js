/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    max_length: 30,
    default: 'Эльвира',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    max_length: 30,
    default: 'ммм',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://adonius.club/uploads/posts/2022-06/1654146798_19-adonius-club-p-milenkie-kotiki-krasivo-foto-21.jpg',
  },
});

module.exports = mongoose.model('user', userSchema);
