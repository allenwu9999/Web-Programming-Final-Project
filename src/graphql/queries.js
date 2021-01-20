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
      _id
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
      info {
        nickname
      }
      account_type
      login_state
      device_keys
    }
  }
`

export const GET_USER_BY_EMAIL = gql`
  query get_user_by_email($email: String!) {
    get_user_by_email(email: $email) {
      _id
      account_type
      interested_topics
      info {
        realname
        nickname
        email
        avatar_content
        avatar_color
        region
        expertise
      }
      ideas
      interested_topics
      ongoing_projects
      ideas_agreed
      ideas_rejected
    }
  }
`;

export const GET_USER_IDEAS = gql`
  query get_user_ideas($email: String!) {
    get_user_ideas(email: $email){
      title
      topics
      content
      creator
      acceptors
      _id
      review_acceptors
      review_rejectors
      num_reviewers
      reviewed
      published
      expire_time
      reference
      reference_picture
      score
    }
  }
`

export const GET_IDEA_BY_ID = gql`
  query get_idea_by_id($ideaId: String!) {
    get_idea_by_id(ideaId: $ideaId) {
      title
      topics
      content
      creator
      acceptors
      _id
      review_acceptors
      review_rejectors
      num_reviewers
      reviewed
      published
      expire_time
      reference
      reference_picture
      score
    }
  }
`;

export const CHECK_USER_PASSWORD = gql`
  query check_user_password($email: String!, $password_hashed: String!) {
    check_user_password(
      data: { email: $email, password_hashed: $password_hashed }
    )
  }
`;
