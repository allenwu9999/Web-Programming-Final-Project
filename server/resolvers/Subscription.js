const gql = require('graphql-subscriptions')
const { withFilter } = gql

const Subscription = {
  add_acceptor: {
    subscribe: withFilter(
      (parent, args, { pubsub }, info) => (pubsub.asyncIterator('add_acceptor')),
      (payload, variable) => (
        variable.creator_id &&
        (payload.add_acceptor.creator_id === variable.creator_id)
      )
    )
  },
  remove_acceptor: {
    subscribe: withFilter(
      (parent, args, { pubsub }, info) => (pubsub.asyncIterator('remove_acceptor')),
      (payload, variable) => (
        variable.creator_id &&
        (payload.remove_acceptor.creator_id === variable.creator_id)
      )
    )
  },
  review: {
    subscribe: withFilter(
      (parent, args, { pubsub }, info) => (pubsub.asyncIterator('review')),
      (payload, variable) => (
        variable.creator_id &&
        (payload.review.creator_id === variable.creator_id)
      )
    )
  }
}

export { Subscription as default }
