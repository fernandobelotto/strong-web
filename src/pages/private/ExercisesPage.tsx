import { Box, Heading, Text } from "@chakra-ui/react";
import { useGetExercisesQuery } from "../../generated/graphql";

export const ExercisesPage = () => {
  const { data, loading, error } = useGetExercisesQuery();

  if (loading) {
    return (
      <>
        <Heading>Loading...</Heading>
      </>
    );
  }
  if (error) {
    <>
      <Heading>error.</Heading>
    </>;
  }

  return (
    <Box>
      <Heading>Exercises Page</Heading>
      {data?.exercises.map((exercise) => {
        return (
          <Box key={exercise.id}>
            <Heading>{exercise.name}</Heading>
            <Text>{exercise.body_part}</Text>
            <Text>{exercise.category}</Text>
          </Box>
        );
      })}
    </Box>
  );
};
