import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  Button,
  InputGroup,
  Text,
  useToast,
} from "@chakra-ui/react";

import { login } from "../services/AuthServices";
import { useUserContext } from "../contexts/UserContext";
import { useGlobalStore } from "../global/store";
import { handleToast } from "../global/toast";

const Login = () => {
  const setUser = useGlobalStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setCurrentUser } = useUserContext();

  const navigate = useNavigate();
  const toast = useToast();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.status === 200) {
        setCurrentUser(response.data.token);
        setUser(response.data);
        handleToast(
          toast,
          "Login Successful",
          "You have been logged in successfully.",
          "success"
        );
        localStorage.setItem("currentUser", response.data.token);
        response.data.user?.role === "user" && navigate("/");
        response.data.user?.role === "admin" && navigate("/adminHome");
        response.data.user?.role === "affiliator" &&
          navigate("/profile/affiliator");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      handleToast(toast, "Error", errorMessage, "error");
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100vw"
        height="75vh"
      >
        <Box width={{ base: "100vw", sm: "500px" }} p={2}>
          <Text
            textAlign="center"
            color={"linkedin.500"}
            fontSize={32}
            fontWeight={600}
            mb={10}
          >
            Login
          </Text>
          <FormControl mt={3}>
            <FormLabel fontSize={20}>Email</FormLabel>
            <Input
              name="email"
              placeholder="Enter Email"
              onChange={handleEmailChange}
              value={email}
            />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel fontSize={20}>Password</FormLabel>
            <InputGroup size="md">
              <Input
                name="password"
                pr="4.5rem"
                placeholder="Enter Password"
                onChange={handlePasswordChange}
                value={password}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" variant="ghost"></Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Checkbox mt={5}>Remember Me</Checkbox>
          <Button
            mt={5}
            width="100%"
            colorScheme="linkedin"
            onClick={handleFormSubmit}
          >
            Login
          </Button>
          <br />
          <Text my={3} width="100%" textAlign="center">
            or
          </Text>
          <Button
            width="100%"
            variant="outline"
            colorScheme="linkedin"
            onClick={() => navigate("/signup")}
          >
            Register
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Login;
