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