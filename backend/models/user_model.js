const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre(
  'save',
  async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
  }
);

UserSchema.methods.isValidPassword = async function (password) {
  // this function will be used to compare the password entered by the user to the hashed password stored in the database
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
}
const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;
