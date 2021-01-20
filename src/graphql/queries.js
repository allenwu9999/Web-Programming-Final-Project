import { gql } from 'apollo-boost'

export const POP_TOPICS_QUERY = gql`
  query{
    get_popular_topics{
      group
      items
    }
  }
`

export const TOPICS_QUERY = gql`
  query{
    get_topics{
      name
      subtopics
    }
  }
`

export const SEARCH_IDEAS_QUERY = gql`
  query get_ideas_by_title(
    $str: String!
  ){
    get_ideas_by_title(str: $str){
      title
      topics
      content
      creator
      acceptors
      review_acceptors
      review_rejectors
      expire_time
      reference
      reference_picture
      score
    }
  }
`

export const EXPLORE_TOPICS_QUERY = gql`
  query{
    get_explore_topics{
      group
      items
    }
  }
`

export const POP_IDEAS_QUERY = gql`
  query{
    get_popular_ideas{
      _id
      title
      content
      creator
    }
  }
`

export const IDEAS_FROM_TOPIC_QUERY = gql`
  query get_ideas_by_topic(
    $topic: String!
  ){
    get_ideas_by_topic(topic: $topic){
      title
      topics
      content
      creator
      acceptors
      review_acceptors
      review_rejectors
      expire_time
      reference
      reference_picture
      score
    }
  }
`
export const GET_USER_LOGGIN_BY_EMAIL = gql`
  query get_user_by_email(
    $email: String!
  ){
    get_user_by_email(email: $email){
      _id
      account_type
      login_state
      device_keys
    }
  }
`
