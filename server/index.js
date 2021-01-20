require('dotenv-defaults').config()

import { GraphQLServer, PubSub } from 'graphql-yoga'
import Query from './resolvers/Query'
import Mutation from './resolvers/Mutation'
import Subscription from './resolvers/Subscription'

const mongoose = require('mongoose')

const User = require('./models/user')
const Idea = require('./models/idea')
const Topic = require('./models/topic')
const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './server/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    Subscription
  },
  context: {
    User,
    Idea,
    Topic,
    pubsub
  }
})

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const db = mongoose.connection

db.on('error', (error) => {
  console.error(error)
})

db.once('open', () => {
  console.log('MongoDB connected!')

  server.start({ port: process.env.PORT | 4000 }, () => {
    console.log(`The server is up on port ${process.env.PORT | 4000}!`)
  })
})

