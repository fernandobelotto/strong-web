import { Button, Center, Heading, useToast, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AppInput } from "../components/AppInput";
import { useSignInEmailPassword } from "@nhost/react";

type FormType = {
  email: string;
  password: string;
};

export const LoginPage = () => {
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
  } = useForm<FormType>({
    resolver: yupResolver(schema),
  });

  const { signInEmailPassword, isLoading, needsEmailVerification } =
    useSignInEmailPassword();

  const navigate = useNavigate();
  const toast = useToast();

  async function onSubmit(values: any) {
    const res = await signInEmailPassword(values.email, values.password);
    if (res.isError) {
      return toast({
        title: "An error occurred.",
        description: res?.error?.message,
        status: "error",
      });
    }
    toast({
      title: "Logged in.",
      status: "success",
    });
    navigate("/", { replace: true });
  }

  return (
    <Center h="90vh">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack>
          <Heading>Login</Heading>
          <VStack p={3} border="1px solid" borderColor="gray.300" rounded="sm">
            <AppInput<FormType>
              control={control}
              name="email"
              label="E-mail"
              errors={errors}
              type="email"
              isDisabled={isLoading}
            />
            <AppInput<FormType>
              control={control}
              name="password"
              label="Password"
              errors={errors}
              type="password"
              isDisabled={isLoading}
            />
            <Button size="sm" type="submit" isLoading={isLoading}>
              Login
            </Button>
          </VStack>
          {needsEmailVerification && (
            <p>Check your email for a verification link.</p>
          )}
          <Link to="/register">Register here</Link>
          {/* TODO */}
          {/* <Link to="/recover">recover your account here</Link> */}
        </VStack>
      </form>
    </Center>
  );
};
