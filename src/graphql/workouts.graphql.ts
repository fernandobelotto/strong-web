import { gql } from "@apollo/client";

const GET_WORKOUTS = gql`
  query GetWorkouts {
    workouts {
      id
      name
      created_at
      updated_at
      sets {
        completed_at
        created_at
        exercise_id
        id
        exercise {
          name
        }
        repetitions
        type
        updated_at
        weight
      }
    }
  }
`;

const INSERT_WORKOUTS = gql`
  mutation InsertWorkouts($name: String) {
    insert_workouts(objects: { name: $name }) {
      affected_rows
      returning {
        id
        name
        created_at
        updated_at
      }
    }
  }
`;

const INSERT_WORKOUT = gql`
  mutation InsertWorkout($object: workouts_insert_input!) {
    insert_workouts_one(object: $object) {
      id
    }
  }
`;

const UPDATE_WORKOUT = gql`
  mutation UpdateWorkout(
    $_set: workouts_set_input
    $pk_columns: workouts_pk_columns_input!
  ) {
    update_workouts_by_pk(_set: $_set, pk_columns: $pk_columns) {
      id
    }
  }
`;

// const UPDATE_WORKOUT = gql`
//  `

const DELETE_WORKOUT = gql`
  mutation DeleteWorkouts($id: Int!) {
    delete_workouts_by_pk(id: $id) {
      id
    }
  }
`;
