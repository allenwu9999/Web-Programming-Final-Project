import { gql } from 'apollo-boost'

export const USER_LOGIN_MUTATION = gql`
  mutation user_login(
    $email: String!
    $password_hashed: String!
    $uuid: String!
  ){
    user_login(
      data: {
        email: $email
        password_hashed: $password_hashed
        uuid: $uuid
      }
    )
  }
`

export const USER_LOGOUT_MUTATION = gql`
  mutation user_logout(
    $email: String!
  ){
    user_logout(
      email: $email
    )
  }
`

export const CREATE_USER_MUTATION = gql`
  mutation create_user(
    $account_type: Int!
    $realname: String!
    $nickname: String!
    $password_hashed: String!
    $email: String!
    $avatar_content: String!
    $avatar_color: String!
    $region: String!
    $expertise: [String!]!
    $login_state: Boolean!
    $ideas: [String!]!
    $interested_topics: [String!]!
    $ongoing_projects: [String!]!
    $ideas_to_be_reviewed: [String!]!
    $ideas_agreed: [String!]!
    $ideas_rejected: [String!]!
    $device_keys: [String!]!
  ){
    create_user(
      data: {
        account_type: $account_type
        info: {
          realname: $realname
          nickname: $nickname
          password_hashed: $password_hashed
          email: $email
          avatar_content: $avatar_content
          avatar_color: $avatar_color
          region: $region
          expertise: $expertise
        }
        login_state: $login_state
        ideas: $ideas
        interested_topics: $interested_topics
        ongoing_projects: $ongoing_projects
        ideas_to_be_reviewed: $ideas_to_be_reviewed
        ideas_agreed: $ideas_agreed
        ideas_rejected: $ideas_rejected
        device_keys: $device_keys
      }
    ) {
      _id
      account_type
      info {
        realname
        nickname
        password_hashed
        email
        avatar_content
        avatar_color
        region
        expertise
      }
      login_state
      ideas
      interested_topics
      ongoing_projects
      ideas_to_be_reviewed
      ideas_agreed
      ideas_rejected
      device_keys
    }
  }
`

export const ADD_IDEA_ACCEPTOR_MUTATION = gql`
  mutation add_idea_acceptor(
    $ideaId: String!
    $acceptor: String!
  ) {
    add_idea_acceptor(
      data: {
        ideaId: $ideaId
        acceptor: $acceptor
      }
    ) {
      _id
    }
  }
`

export const REMOVE_IDEA_ACCEPTOR_MUTATION = gql`
  mutation remove_idea_acceptor(
    $ideaId: String!
    $acceptor: String!
  ) {
    remove_idea_acceptor(
      data: {
        ideaId: $ideaId
        acceptor: $acceptor
      }
    ) {
      _id
    }
  }
`

export const CHANGE_USER_AVATAR_MUTATION = gql`
  mutation update_user_avatar(
    $userId: String!
    $avatar_content: String!
    $avatar_color: String!
  ) {
    update_user_avatar(
      data: {
        userId: $userId
        avatar_content: $avatar_content
        avatar_color: $avatar_color
      }
    ) {
      _id
      info {
        avatar_content
        avatar_color
      }
    }
  }
`;

export const CHANGE_USER_ALL_MUTATION = gql`
  mutation update_user_all(
    $userId: String!
    $realname: String!
    $region: String!
    $interested_topics: [String]!
    $old_password: String!
    $password_hashed: String!
  ) {
    update_user_all(
      data: {
        userId: $userId
        realname: $realname
        region: $region
        interested_topics: $interested_topics
        old_password: $old_password
        password_hashed: $password_hashed
      }
    ) {
      _id
      info {
        realname
        region
      }
      interested_topics
    }
  }
`;

export const USER_PASSWORD_CHECK = gql`
  mutation user_password_check($userId: String!, $password_hashed: String!) {
    user_password_check(
      data: { userId: $userId, password_hashed: $password_hashed }
    )
  }
`;
