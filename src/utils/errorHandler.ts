import { toast } from "./toast";

export const errorHandler = ({
  graphQLErrors,
  _networkError,
  operation,
  forward,
}: any) => {
  if (graphQLErrors) {
    toast({
      title: "Error",
      description: graphQLErrors?.[0]?.message || "Could not complete request",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  }
  return forward(operation);
};
