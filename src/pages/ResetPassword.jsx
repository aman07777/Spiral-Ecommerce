import React, { useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

import { forgotPassword, resetPassword } from "../services/AuthServices";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [showResetPassword, setShowResetPasswod] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();

  const handleResetPassword = async (e) => {
    try {
      const response = await forgotPassword(email);
      if (response.status === 200) {
        setShowResetPasswod(true);
      }
      toast({
        title: "Verfication Code Sent Successfully",
        description: "Please check your email for the verification code.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleNewPassword = async (e) => {
    try {
      const response = await resetPassword("token", password, confirmPassword);
      if (response.status === 200) {
        toast({
          title: "Password Reset Successfully",
          description: "Please login with your new password.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      margin="10rem auto"
      width={{ base: "100vw", sm: "500px" }}
      p={2}
    >
      {" "}
      {!showResetPassword ? (
        <>
          <Text
            textAlign="center"
            color={"linkedin.500"}
            fontSize={32}
            fontWeight={600}
            mb={10}
          >
            Enter the Email Address
          </Text>
          <Input
            name="email"
            pr="4.5rem"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Button
            mt={5}
            width="100%"
            colorScheme="linkedin"
            onClick={handleResetPassword}
          >
            Continue
          </Button>
          <Text textAlign="center" fontSize={18} fontWeight={400} mt={10}>
            {" "}
            Don't have an account?{" "}
            <Text color="blue">
              <a href="/signup">Sign Up</a>
            </Text>
          </Text>
        </>
      ) : (
        <>
          <Text
            textAlign="center"
            color={"linkedin.500"}
            fontSize={32}
            fontWeight={600}
            mb={10}
          >
            Reset Password
          </Text>
          <FormLabel fontSize={20} margin="1rem 21rem 1rem 0rem">
            New Password
          </FormLabel>
          <Input
            name="password"
            pr="4.5rem"
            placeholder="New Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <FormLabel fontSize={20} margin="1rem 20rem 1rem 0rem">
            Confirm Password
          </FormLabel>
          <Input
            name="password"
            pr="4.5rem"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <Button
            mt={5}
            width="100%"
            colorScheme="linkedin"
            onClick={handleNewPassword}
          >
            Reset Password
          </Button>
        </>
      )}
    </Box>
    //
  );
};

export default ResetPassword;
