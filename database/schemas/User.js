const Schema = require('mongoose').Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    birthday: Date
});

module.exports = UserSchema;