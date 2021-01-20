const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const TopicSchema = new Schema({
  topic_name: {
    type: String,
    required: [true, 'Topic name is required.']
  },
  category: {
    type: String,
    required: [true, 'Category is required.']
  },
  score: {
    type: Number,
    required: [true, 'Score is required.']
  },
  reviewers: {
    type: [String],
    required: [true, 'Reviewers is required.']
  }
})

// Creating a table within database with the defined schema
const Topic = mongoose.model('topic', TopicSchema)

// Exporting table for querying and mutating
module.exports = Topic
