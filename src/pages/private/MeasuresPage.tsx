import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { core } from "../../constants/core";
import { AddIcon } from "@chakra-ui/icons";
import { bodyParts } from "../../constants/body-parts";

export const MeasuresPage = () => {
  return (
    <Box>
      <Heading mb={5}>Measures Page</Heading>
      <Box w="lg">
        <VStack p={3} border="1px solid" borderColor="gray.500" mb={3} w="full">
          {core.map((measure) => {
            return (
              <Flex
                alignItems="center"
                key={measure.value}
                gap={5}
                justifyContent="space-between"
              >
                <Text>{measure.label}</Text>
                <IconButton aria-label="plus" icon={<AddIcon />} size="sm" />
              </Flex>
            );
          })}
        </VStack>
        <VStack p={3} border="1px solid" borderColor="gray.500" mb={3} w="full">
          {bodyParts.map((part) => {
            return (
              <Flex
                alignItems="center"
                key={part.value}
                gap={5}
                justifyContent="space-between"
              >
                <Text>{part.label}</Text>
                <IconButton aria-label="plus" icon={<AddIcon />} size="sm" />
              </Flex>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
};
