import { Button, Center, Heading, useToast, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignUpEmailPassword } from "@nhost/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { AppInput } from "../components/AppInput";

type RegisterFormType = {
  email: string;
  password: string;
};

export const RegisterPage = () => {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: yupResolver(schema),
  });

  const { signUpEmailPassword, isLoading } = useSignUpEmailPassword();

  const toast = useToast();

  function onSubmit(values: any) {
    signUpEmailPassword(values.email, values.password)
      .then(() => {
        toast({
          title: "Account created.",
          status: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "An error occurred.",
          description: err.data?.message,
          status: "error",
        });
      });
  }

  return (
    <Center h="90vh">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          <Heading>Register</Heading>
          <VStack p={3} border="1px solid" borderColor="gray.300" rounded="sm">
            <AppInput<RegisterFormType>
              control={control}
              name="email"
              label="E-mail"
              errors={errors}
              isDisabled={isLoading}
            />
            <AppInput<RegisterFormType>
              control={control}
              name="password"
              label="Password"
              errors={errors}
              type="password"
              isDisabled={isLoading}
            />
            <Button size="sm" type="submit" isLoading={isLoading}>
              register
            </Button>
          </VStack>
          <Link to="/">login here</Link>
        </VStack>
      </form>
    </Center>
  );
};
