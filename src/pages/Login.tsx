// src/pages/Login.tsx
import { useForm } from "@mantine/form";
import {
  Button,
  TextInput,
  Text,
  Loader,
  Anchor,
  Checkbox,
  Paper,
  PasswordInput,
  Title,
} from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../store/store";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { useEffect } from "react";

// Tipe untuk Form Values
interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const form = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    dispatch(login(values));
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Title
            order={2}
            className={classes.title}
            ta="center"
            mt="md"
            mb={50}
          >
            Welcome back to Mantine!
          </Title>

          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...form.getInputProps("password")}
          />
          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button type="submit" disabled={loading} fullWidth mt="xl" size="md">
            {loading ? <Loader color="white" size="sm" /> : "Login"}
          </Button>

          {error && <Text c="red">{error}</Text>}

          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor<"a">
              href="#"
              fw={700}
              onClick={(event) => event.preventDefault()}
            >
              Register
            </Anchor>
          </Text>
        </form>
      </Paper>
    </div>
  );
};

export default Login;
