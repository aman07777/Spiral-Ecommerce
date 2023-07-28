import React,{useState} from 'react'
import { Box,Text,Input,Button,FormLabel } from '@chakra-ui/react'


const ResetPassword = () => {

    const [showResetPassword, setShowResetPasswod] = useState(false)
    const handleSubmit = (e) => {
    e.preventDefault();
    setShowResetPasswod(true)
    }

  return (
 
    <Box
    display='flex'
    justifyContent='center'
    alignItems='center'
    flexDirection='column'
    margin='10rem auto'
    width={{base:'100vw' ,sm:'500px'}} p={2}
    >  {!showResetPassword ? (
         <>
        <Text textAlign="center" color={'linkedin.500'} fontSize={32} fontWeight={600} mb={10}>Enter the Email Address</Text>
        <Input name="email" pr="4.5rem" placeholder="Email"/>
        <Button mt={5} width="100%" colorScheme='linkedin' onClick={handleSubmit}>Continue</Button>
        <Text textAlign="center" fontSize={18} fontWeight={400} mt={10}> Don't have an account? <Text color='blue'><a href="#" >Sign Up</a></Text></Text>
        </>
   ):(
        <>
         <Text textAlign="center" color={'linkedin.500'} fontSize={32} fontWeight={600} mb={10}>Reset Password</Text>
         <FormLabel fontSize={20} margin="1rem 20rem 1rem 0rem">Current Password</FormLabel>
        <Input name="password" pr="4.5rem" placeholder="Current Password"/>

        <FormLabel fontSize={20} margin="1rem 21rem 1rem 0rem">New Password</FormLabel>
        <Input name="password" pr="4.5rem" placeholder="New Password"/>

        <FormLabel fontSize={20} margin="1rem 20rem 1rem 0rem">Confirm Password</FormLabel>
        <Input name="password" pr="4.5rem" placeholder="Confirm Password"/>
        <Button mt={5} width="100%" colorScheme='linkedin' onClick={handleSubmit}>Reset Password</Button>
        </>
        )}
</Box>
// 

  

  )
}

export default ResetPassword