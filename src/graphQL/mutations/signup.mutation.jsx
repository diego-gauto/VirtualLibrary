import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation register($fullName: String!, $email: String!, $password: String!) {
    register(
      input: { fullName: $fullName, email: $email, password: $password }
    ) {
      id
      fullName
      email
    }
  }
`;
