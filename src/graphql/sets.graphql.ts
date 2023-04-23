import { gql } from "@apollo/client";

const GET_SETS = gql`
  query GetSets {
    sets {
      exercise_id
      id
      repetitions
      workout_id
      weight
      type
      completed_at
      created_at
      updated_at
    }
  }
`;

const INSERT_SET = gql`
  mutation InsertSets(
    $exercise_id: Int
    $repetitions: Int
    $workout_id: Int
    $weight: numeric
    $type: String
    $completed_at: timestamptz
  ) {
    insert_sets(
      objects: {
        exercise_id: $exercise_id
        repetitions: $repetitions
        workout_id: $workout_id
        weight: $weight
        type: $type
        completed_at: $completed_at
      }
    ) {
      affected_rows
      returning {
        exercise_id
        id
        repetitions
        workout_id
        weight
        type
        completed_at
        created_at
        updated_at
      }
    }
  }
`;
