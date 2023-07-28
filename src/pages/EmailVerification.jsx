import { Box,Image,Text,Input,Button } from '@chakra-ui/react'
import React from 'react'
import emailverification from '../Images/emailverification.png'

const EmailVerification = ({email}) => {
  return (
<Box
    display='flex'
    justifyContent='center'
    alignItems='center'
    flexDirection='column'
    margin='10rem auto'
    width={{base:'100vw' ,sm:'500px'}} p={2}
    >
        <Image src={emailverification} alt="emailVerification" width={40} height={20} />
        <Text textAlign="center" color={'linkedin.500'} fontSize={32} fontWeight={600} mb={10}>Verify its You</Text>
        <Text textAlign="center" fontSize={18} fontWeight={400} mb={10}>We sent code to {email}  Please check your inbox and the code below.</Text>
        <Input name="password" pr="4.5rem" placeholder="Enter 6-digits code"/>
        <Button mt={5} width="100%" colorScheme='linkedin' >Verify Code</Button>
        <Text textAlign="center" fontSize={18} fontWeight={400} mt={10}> Didn't receive an email? <Text color='blue'><a href="#" >Try again</a></Text></Text>

</Box>
  )
}

export default EmailVerification