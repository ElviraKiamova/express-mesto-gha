const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Эльвира',
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'ммм',
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://adonius.club/uploads/posts/2022-06/1654146798_19-adonius-club-p-milenkie-kotiki-krasivo-foto-21.jpg',
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
