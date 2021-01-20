const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const IdeaSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required.']
  },
  topics: {
    type: [String],
    required: [true, 'Topics are required.']
  },
  content: {
    type: String,
    required: [true, 'Content is required.']
  },
  creator: {
    type: String,
    required: [true, 'Creator(format: nickname@id) is required.']
  },
  acceptors: {
    type: [String],
    required: [true, 'Acceptors(format: [nickname@id]) are required.']
  },
  review_acceptors: {
    type: [String],
    required: [true, 'Review acceptors are required.']
  },
  review_rejectors: {
    type: [String],
    required: [true, 'Review rejectors are required.']
  },
  num_reviewers: {
    type: Number,
    required: [true, 'Number of reviewers is required.']
  },
  reviewed: {
    type: Boolean,
    required: [true, 'Reviewed is required.']
  },
  published: {
    type: Boolean,
    required: [true, 'Published is required.']
  },
  expire_time: {
    type: String,
    required: [true, 'Expire time is required.']
  },
  reference: {
    type: [String],
    required: [true, 'References are required.']
  },
  reference_picture: {
    type: String,
    required: [true, 'Reference picture is required.']
  },
  score: {
    type: Number,
    required: [true, 'Score is required.']
  }
})

// Creating a table within database with the defined schema
const Idea = mongoose.model('idea', IdeaSchema)

// Exporting table for querying and mutating
module.exports = Idea
