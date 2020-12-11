const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const UserSchema = new Schema({
	realname: {
		type: String,
		required: [true, 'Real name is required.']
	},
	nickname: {
		type: String,
		required: [true, 'Nickname is required.']
	},
	id: {
		type: String,
		required: [true, 'ID field is required.']
	},
	email: {
		type: String,
		required: [true, 'Email field is required.']
	}
	password_hashed: {
		type: String,
		required: [true, 'Password(hashed) is required.']
	},
	account_type: {
		type: Boolean,
		required: [true, 'Account type is required.']
	}
})

// Creating a table within database with the defined schema
const User = mongoose.model('user', UserSchema)

// Exporting table for querying and mutating
module.exports = User
