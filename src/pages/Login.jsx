import React,{useState}from 'react'
import { Box, Checkbox, FormControl,FormLabel,Input,InputRightElement,Button, InputGroup, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
const Login = () => {
  const navigate = useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const handleEmailChange=(e)=>{
    setEmail(e.target.value);
  }

  const handlePasswordChange=(e)=>{
    setPassword(e.target.value);
  }
  return (
    <>
    <Navbar/>
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
      <Input name='email' placeholder='Enter Email' onChange={handleEmailChange} value={email}/>
    </FormControl>
    <FormControl mt={3}>
 <FormLabel fontSize={20}>Password</FormLabel>
 <InputGroup size="md">
  <Input name="password" pr="4.5rem" placeholder="Enter Password" onChange={handlePasswordChange} value={password}/>
  <InputRightElement width="4.5rem">
    <Button h="1.75rem" size="sm" variant="ghost"></Button>
  </InputRightElement>
 </InputGroup>
    </FormControl>
    <Checkbox mt={5}>Remember Me</Checkbox>
    <Button mt={5} width="100%" colorScheme='linkedin' >Login</Button>
    <br/>
    <Text my={3} width="100%"  textAlign="center">or</Text>
    <Button width="100%" variant="outline" colorScheme="linkedin" onClick={()=>navigate('/signup')}>Register</Button>
    </Box>
    </Box>
    <Footer/>
    </>
  )
}

export default Login