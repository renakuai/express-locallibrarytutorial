const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 100,
    minLength: 3,
  }
})

GenreSchema.virtual('url').get(function () {
  return '/catalog/genre' + this._id;
})

module.exports = mongoose.model('Genre', GenreSchema);