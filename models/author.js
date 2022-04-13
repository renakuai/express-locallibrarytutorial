const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    maxLength: 100
  },
  family_name: {
    type: String,
    required: true,
    maxLength: 100
  },
  date_of_birth: {
    type: Date
  },
  date_of_death: {
    type: Date
  }
});

// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
AuthorSchema.virtual('name').get(function () {
  let fullname = '';
  if (this.first_name && this.family_name) {
    fullname = this.family_name + ',' + this.first_name;
  }
  if (!this.first_name || !this.family_name) {
    fullname = '';
  }
  return fullname;
})

//virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function () {
  let lifetime_string = '';
  if (this.date_of_birth) {
    lifetime_string = this.date_of_birth.getYear().toString();
  }
  lifetime_string += ' - ';
  if (this.date_of_death) {
    lifetime_string += this.date_of_death.getYear()
  }
  return lifetime_string;
})

//virtual for author's url
AuthorSchema.virtual('url').get(function () {
  return '/catalog/author/' + this.id;
})

//export model
module.exports = mongoose.model('Author', AuthorSchema);