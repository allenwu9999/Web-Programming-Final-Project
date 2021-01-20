const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM

// subschema: InfoSchema
const InfoSchema = new Schema({
  realname: {
    type: String,
    required: [true, 'Real name is required.']
  },
  nickname: {
    type: String,
    required: [true, 'Nickname is required.']
  },
  password_hashed: {
    type: String,
    required: [true, 'Password(hashed) is required.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.']
  },
  avatar_content: {
    type: String,
    required: [true, 'Avatar content is required.']
  },
  avatar_color: {
  	type: String,
  	required: [true, 'Avatar color is required.']
  },
  region: {
    type: String,
    required: [true, 'Region is required.']
  },
  expertise: {
    type: [String],
    required: [true, 'Expertise is required.']
  }
}, { _id: true })

const UserSchema = new Schema({
	account_type: {
		type: Number,
		required: [true, 'Account type is required.']
	},
	info: {
		type: InfoSchema,
		required: [true, 'Info schema is required.'],
		default: {}
	},
	login_state: {
		type: Boolean,
		required: [true, 'Login state is required.']
	},
	ideas: {
		type: [String],
		required: [true, 'Ideas(ID) are required.']
	},
	interested_topics: {
		type: [String],
		required: [true, 'Interested topics are required.']
	},
	ongoing_projects: {
		type: [String],
		required: [true, 'Ongoing projects(Ideas ID) are required.']
	},
	ideas_to_be_reviewed: {
		type: [String],
		required: [true, 'Ideas to be reviewed(Ideas ID) are required.']
	},
	ideas_agreed: {
		type: [String],
		required: [true, 'Ideas agreed(Ideas ID) are required.']
	},
	ideas_rejected: {
		type: [String],
		required: [true, 'Ideas rejected(Ideas ID) are required']
	},
  device_keys: {
    type: [String],
    required: [true, 'Device Keys are required.']
  }
}, { _id: true })

// Creating a table within database with the defined schema
const User = mongoose.model('user', UserSchema)

// Exporting table for querying and mutating
module.exports = User
