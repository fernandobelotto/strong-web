import { gql } from "@apollo/client";

const GET_EXERCISES = gql`
  query GetExercises {
    exercises {
      id
      body_part
      category
      name
      created_at
      updated_at
    }
  }
`;
