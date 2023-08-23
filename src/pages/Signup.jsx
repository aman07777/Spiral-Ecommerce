import React, { useState } from 'react';
import { Box, Input, Text, FormControl, FormLabel, InputGroup, InputRightElement, Button, Checkbox, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import EmailVerification from './EmailVerification';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { signup } from '../services/AuthServices';

const Signup = () => {
  const navigate = useNavigate();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const toast = useToast();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleTermsAccepted = (e) => {
    setIsTermsAccepted(e.target.checked);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isTermsAccepted) {
      try {
        const response = await signup(firstName, lastName, email, password, confirmPassword);
        console.log(response.data);
        toast({
          title: 'Verfication Code Sent Successfully',
          description: 'Please check your email for the verification code.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        setIsFormSubmitted(true);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred.';
        toast({
          title: 'Error',
          description: errorMessage,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Error',
        description: 'Please accept terms and conditions.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      {!isFormSubmitted ? (
        <Box display="flex" justifyContent="center" alignItems="center" width="100vw" mt={5}>
          <Box width={{ base: '100vw', sm: '500px' }} p={2}>
            <Text textAlign="center" color={'linkedin.500'} fontSize={32} fontWeight={600} mb={10}>
              Signup
            </Text>
            <Box display="flex" flexDirection={{ base: 'column', sm: 'row' }}>
              <FormControl mt={3} width={{ base: '100%', sm: '50%' }} me={{ base: 0, sm: 2 }}>
                <FormLabel fontSize={20}>First Name</FormLabel>
                <Input name="firstName" placeholder="Enter First Name" onChange={handleFirstNameChange} value={firstName} />
              </FormControl>
              <FormControl mt={3} width={{ base: '100%', sm: '50%' }}>
                <FormLabel fontSize={20}>Last Name</FormLabel>
                <Input name="lastName" placeholder="Enter Last Name" onChange={handleLastNameChange} value={lastName} />
              </FormControl>
            </Box>
            <FormControl mt={3}>
              <FormLabel fontSize={20}>Email</FormLabel>
              <Input name="email" placeholder="Enter Email" onChange={handleEmailChange} value={email} />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={20}>Password</FormLabel>
              <Input name="password" type='password' maxLength={11} placeholder="Enter password" onChange={handlePasswordChange} value={password} />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel fontSize={20}>Confirm Password</FormLabel>
              <InputGroup size="md">
                <Input
                  type='password'
                  name="confirm-password"
                  pr="4.5rem"
                  placeholder="Enter Confirm password"
                  onChange={handleConfirmPasswordChange}
                  value={confirmPassword}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" variant="ghost"></Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Checkbox name="terms" mt={5} onChange={handleTermsAccepted}>
              I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
            </Checkbox>
            <Button mt={5} width="100%" variant="solid" colorScheme="linkedin" onClick={handleFormSubmit}>
              Register
            </Button>
            <br />
            <Text my={3} width="100%" textAlign="center">
              or
            </Text>
            <Button width="100%" variant="outline" colorScheme="linkedin" onClick={() => navigate('/login')}>
              Login
            </Button>
          </Box>
        </Box>
      ) : (
        <EmailVerification email={email} />
      )}
      <Footer />
    </>
  );
};

export default Signup;
