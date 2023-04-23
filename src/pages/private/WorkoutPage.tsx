import {
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  useDeleteWorkoutsMutation,
  useGetWorkoutsQuery,
  useInsertWorkoutMutation,
  useInsertWorkoutsMutation,
  useUpdateWorkoutMutation,
} from "../../generated/graphql";
import { useState } from "react";
import { RepeatClockIcon } from "@chakra-ui/icons";
import { useDebounce } from "../../hooks/useDebounce";

type Props = {};

export const WorkoutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const [id, setId] = useState<number | undefined>(undefined);
  const { data, loading: workoutLoading, error } = useGetWorkoutsQuery();

  const [insertWorkout, { loading }] = useInsertWorkoutMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = async (data: any) => {
    const res = await insertWorkout({
      variables: {
        object: {
          name: data.workoutName,
        },
      },
      refetchQueries: ["GetWorkouts"],
    });

    setId(res.data?.insert_workouts_one?.id);
    onOpen();

    toast({
      title: "Workout created.",
      description: "We've created your workout for you.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Heading>Workout Page</Heading>
      <Button size="sm" isLoading={loading} onClick={handleSubmit(onSubmit)}>
        New Workout
      </Button>
      {/* {data?.workouts.map((workout) => (
        <Box key={workout.id}>
          <Heading>{workout.name}</Heading>
        </Box>
      ))} */}
      <WorkoutModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} id={id} />
      {/* <Input
        placeholder="Workout Name"
        {...register("workoutName", { required: true })}
        disabled={loading}
      /> */}
    </Box>
  );
};

function WorkoutModal({ isOpen, onOpen, onClose, id }) {
  const [deleteWorkout, { loading }] = useDeleteWorkoutsMutation();

  const [updateWorkout, { loading: updateLoading }] =
    useUpdateWorkoutMutation();

  const onCancel = () => {
    deleteWorkout({
      variables: {
        id,
      },
      refetchQueries: ["GetWorkouts"],
    });
    onClose();
  };

  const [title, setTitle] = useState("");

  const debouncedRequest = useDebounce(() => {
    updateWorkout({
      variables: {
        pk_columns: {
          id,
        },
        _set: {
          name: title,
        },
      },
    });
  });

  const onChange = (e) => {
    const value = e.currentTarget.textContent;
    setTitle(value);

    debouncedRequest();
  };

  const addExercise = () => {};
  const openTimerModal = () => {};

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"6xl"}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent height="xl">
          <ModalHeader display={"flex"} justifyContent="space-between">
            <Heading onInput={onChange} contentEditable w="full">
              Workout Name
            </Heading>
            <IconButton
              size="sm"
              colorScheme="gray"
              mr={3}
              onClick={openTimerModal}
              aria-label={""}
              icon={<RepeatClockIcon />}
            />
          </ModalHeader>
          <ModalBody>
            <Input placeholder="Notes" variant="unstyled" />

            <Button size="sm" colorScheme="blue" mr={3} onClick={addExercise}>
              Add Exercise
            </Button>
          </ModalBody>

          <ModalFooter>
            <Button size="sm" colorScheme="red" mr={3} onClick={onCancel}>
              Cancel Workout
            </Button>
            <Button size="sm" colorScheme="green" onClick={onClose}>
              Finish
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
