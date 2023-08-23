import { Box, Image, Text, Input, Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

import emailverification from '../Images/emailverification.png'
import { verifyEmail } from '../services/AuthServices'
import { useUserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'

const EmailVerification = ({ email }) => {
  const navigate = useNavigate();
  const { setCurrentUser } = useUserContext();
  const [token, setToken] = useState("");
  const toast = useToast();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyEmail(token);
      if (response.status === 200) {
        setCurrentUser(response.data.token);
        toast({
          title: 'Email Verified Successfully',
          description: 'You have successfully logged in.',
          status: 'success',
          duration: 2500,
          isClosable: true,
        });
        localStorage.setItem('currentUser', JSON.stringify(response.data.token));
        navigate('/')
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
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      flexDirection='column'
      margin='10rem auto'
      width={{ base: '100vw', sm: '500px' }} p={2}
    >
      <Image src={emailverification} alt="emailVerification" width={40} height={20} />
      <Text textAlign="center" color={'linkedin.500'} fontSize={32} fontWeight={600} mb={10}>Verify its You</Text>
      <Text textAlign="center" fontSize={18} fontWeight={400} mb={10}>We sent code to {email}  Please check your inbox and the code below.</Text>
      <Input name="token" pr="4.5rem" placeholder="Enter 6-digits code" value={token} onChange={(e) => setToken(e.target.value)} />
      <Button mt={5} width="100%" colorScheme='linkedin' onClick={handleFormSubmit}>Verify Code</Button>
      <Text textAlign="center" fontSize={18} fontWeight={400} mt={10}> Didn't receive an email? <Text color='blue'><a href="#" >Try again</a></Text></Text>
    </Box>
  )
}

export default EmailVerification