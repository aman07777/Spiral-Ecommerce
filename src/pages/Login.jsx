import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Checkbox, FormControl, FormLabel, Input, InputRightElement, Button, InputGroup, Text, useToast } from '@chakra-ui/react'

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { login } from '../services/AuthServices';
import { useUserContext } from '../contexts/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setCurrentUser } = useUserContext();

  const navigate = useNavigate();
  const toast = useToast();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.status === 200) {
        setCurrentUser(response.data.token);
        toast({
          title: 'Login Successful',
          description: 'You have been logged in successfully.',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
        localStorage.setItem('currentUser', JSON.stringify(response.data.token));
        navigate('/cart')
      }

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

  }
  return (
    <>
      <Navbar />
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        width='100vw'
        height='75vh'>
        <Box width={{ base: '100vw', sm: '500px' }} p={2}>
          <Text textAlign='center' color={'linkedin.500'} fontSize={32} fontWeight={600} mb={10}>Login</Text>
          <FormControl mt={3}>
            <FormLabel fontSize={20}>Email</FormLabel>
            <Input name='email' placeholder='Enter Email' onChange={handleEmailChange} value={email} />
          </FormControl>
          <FormControl mt={3}>
            <FormLabel fontSize={20}>Password</FormLabel>
            <InputGroup size="md">
              <Input name="password" pr="4.5rem" placeholder="Enter Password" onChange={handlePasswordChange} value={password} />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" variant="ghost"></Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Checkbox mt={5}>Remember Me</Checkbox>
          <Button mt={5} width="100%" colorScheme='linkedin' onClick={handleFormSubmit}>Login</Button>
          <br />
          <Text my={3} width="100%" textAlign="center">or</Text>
          <Button width="100%" variant="outline" colorScheme="linkedin" onClick={() => navigate('/signup')}>Register</Button>
        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default Login