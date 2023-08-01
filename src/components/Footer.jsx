import React from 'react';
import { Box, Text, IconButton, Container } from '@chakra-ui/react';
import {  Facebook, Instagram, Twitter, YouTube } from '@mui/icons-material';

const Footer = () => {
  return (
    
    <Box mt={5} width="100vw" backgroundColor="rgba(244, 244, 244, 0.8)" >
      <Container maxW='1200px'display='flex' py={10} justifyContent='space-between' flexDirection={{base:'column',sm:'row'}}  >
            <Box textAlign={{base:'center',sm:'start'}} py={5} >
              <Text fontSize={24} fontWeight={600} >Help</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >FAQs</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >Return And Exchange</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >Support Team</Text>
            </Box>
            <Box textAlign={{base:'center',sm:'start'}} py={5}>
              <Text fontSize={24} fontWeight={600} >Corporate</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >Career Opportunities</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >Our Stores</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >About Us</Text>
            </Box>
            <Box textAlign={{base:'center',sm:'start'}} py={5} >
              <Text fontSize={24} fontWeight={600} >Policies</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >Privacy Policies</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >Terms & Conditions</Text>
              <Text mt={2} _hover={{ textDecoration: 'underline' }} >Return Policies</Text>
            </Box>
            <Box display='flex' justifyContent='center' >
              <IconButton mr={3} colorScheme='blackAlpha' variant='ghost' _hover={{ color: '#C13584' }} as={Instagram} />
              <IconButton mr={3} colorScheme='blackAlpha' variant='ghost' _hover={{ color: 'facebook.500' }} as={Facebook} />
              <IconButton mr={3} colorScheme='blackAlpha' variant='ghost' _hover={{ color: 'red' }} as={YouTube} />
              <IconButton colorScheme='blackAlpha' variant='ghost' _hover={{ color: 'twitter.500' }} as={Twitter} />
            </Box>
      </Container>
    </Box>

  )
}

export default Footer;