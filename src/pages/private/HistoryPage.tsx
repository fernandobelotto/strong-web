import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { GetWorkoutsQuery, useGetWorkoutsQuery } from "../../generated/graphql";
import * as dayjs from "dayjs";

type Props = {};

type Workout = GetWorkoutsQuery["workouts"][0];

const HistoryCard = ({ workout }: { workout: Workout }) => {
  return (
    <Box border="1px solid white" rounded="sm" p={3}>
      <Text>{workout.name}</Text>
      <Text>{dayjs(workout.created_at).format("DD/MM/YYYY")}</Text>
      <Text>Exercises!</Text>
      {workout.sets.map((set) => {
        return (
          <Box key={set.id}>
            <Text>exercise: {set.exercise.name}</Text>
            <Text>repetitions {set.repetitions}</Text>
            <Text>type {set.type}</Text>
            <Text>weight {set.weight}</Text>
          </Box>
        );
      })}
    </Box>
  );
};

export const HistoryPage = () => {
  const { data, loading, error } = useGetWorkoutsQuery();

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <Box>
      <Heading>History Page</Heading>
      <Text>total {data?.workouts.length}</Text>
      <Flex direction="row" gap={3} flexWrap="wrap">
        {data?.workouts.map((workout) => (
          <HistoryCard key={workout.id} workout={workout} />
        ))}
      </Flex>
    </Box>
  );
};
