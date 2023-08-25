import React from 'react';
import { Box, Flex, Image, Heading, Text, Spacer, Divider } from '@chakra-ui/react';
import { ShoppingCart } from '@mui/icons-material';
import Saletime from './Saletime';

const Dummy = [

  {
    id: 1,
    name: 'T-Shirt',
    img: 'https://www.byrdie.com/thmb/1mtEzOLSXxFH4AQygcf4W-ZXcL0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/greenjumpsuit-c700f1b32e5c4bd3ad561339dc9a25f2.jpg',
    price: 80,
    discount: 20,
  },
  {
    id: 1,
    name: 'T-Shirt',
    img: 'https://www.byrdie.com/thmb/1mtEzOLSXxFH4AQygcf4W-ZXcL0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/greenjumpsuit-c700f1b32e5c4bd3ad561339dc9a25f2.jpg',
    price: 80,
    discount: 20,
  },
  {
    id: 1,
    name: 'T-Shirt',
    img: 'https://toyszoom.net/cdn/shop/products/Girls-Wedding-Dress-Kids-Princess-Dress-Little-Girl-Ball-Gown-Clothes-Baby-Floor-Satin-Dresses-Age_large.jpg?v=1537720572',
    price: 80,
    discount: 20,
  },
  {
    id: 1,
    name: 'T-Shirt',
    img: 'https://www.byrdie.com/thmb/1mtEzOLSXxFH4AQygcf4W-ZXcL0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/greenjumpsuit-c700f1b32e5c4bd3ad561339dc9a25f2.jpg',
    price: 80,
    discount: 20,
  },
  {
    id: 1,
    name: 'T-Shirt',
    img: 'https://www.byrdie.com/thmb/1mtEzOLSXxFH4AQygcf4W-ZXcL0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/greenjumpsuit-c700f1b32e5c4bd3ad561339dc9a25f2.jpg',
    price: 80,
    discount: 20,
  },
  
 
];
const Flashsale = () => {
  
    return (
      <>
        <Box py={10} >
          <Flex justify="center" align="center" direction="column">
            <Flex justify="space-between" align="center" width="80%" mb={10}>


              
             <Box display={{base:'block',md:'none'}}>
              <Text fontSize={{base:'16px',md:'12px',sm:'10px'}}  fontWeight="10px"color="#007B5">
                On Sale
              </Text>
              <div><Saletime/></div>
              <div><Heading mr={{ base: "0", md: "190px" ,sm:"0"}}color="#0077B5" fontSize={{ base: "1.5rem", md: "2rem" }} >
                <marquee>FLASH SALE!</marquee>
              </Heading></div>
              </Box> 



              <Box display={{base:'none',md:'block'}}>
              <Text fontSize={{base:'16px',md:'12px',sm:'10px'}}  fontWeight="10px"color="#007B5">
                On Sale
              </Text>
              <Saletime/>
              <Heading mr={{ base: "0", md: "190px" ,sm:"0"}}color="#0077B5" fontSize={{ base: "1.5rem", md: "2rem" }} >
                <marquee>FLASH SALE!</marquee>
              </Heading>
              </Box>




              <Box
                bg="#0077B5"
                color="white"
                borderRadius="lg"
                py={2}
                px={4}
                cursor="pointer"
                transition="transform 0.2s ease-in-out"
                _hover={{ transform: 'scale(1.05)' }}
                display={{ base: 'none', sm: 'none' ,md:'block'}}
              >
                <Text fontWeight="bold" fontSize="md">
                  More Items
                </Text>
              </Box>
            </Flex>
<Flex justify="center" align="center" direction="row" flexWrap="wrap" gap={{ base: '10', md: '8' }}>
  {Dummy.map((item) => (
    <Box
      key={item.id}
      borderRadius="lg"
      bg="white"
      width={{ base: '40%', md: '18%' }}
      height={{ base: '15rem', md: '375px' }}
      cursor="pointer"
      boxShadow="2xl"
      position="relative"
      transition="transform 0.2s ease-in-out"
      _hover={{ transform: 'scale(1.05)' }}
    >
      <Box
        width="100%"
        height={{ base: '50%', md: '70%' }}
        overflow="hidden"
        position="relative"
        mb={4}
      >
        <Image
          src={item.img}
          width="100%"
          height="100%"
          objectFit="center"
        />
        <Box
  position="absolute"
  top={{base:'1',md:'2'}}
  right={{base:'1',md:'2'}}
  bg="white"
  p={{base:'0.5px',md:'1'}}
  borderRadius="10px"
  color="#0077B5"
>
  <ShoppingCart />
</Box>
      </Box>
      <Text fontWeight="bold" fontSize="lg" mb={2} ml={2}>
        {item.name}
      </Text>
      <Text fontSize="lg" color="grey.100" fontWeight="bold" mb={2} ml={2}>
        ${item.price}
      </Text>
      <Text fontSize="lg" color="#0077B5" textDecoration="line-through" ml={2}>
        ${item.discount}
      </Text>
    </Box>
  ))}
</Flex>
           
<Box display={{ base: 'block', sm: 'block',md:'none' }}
              bg="#0077B5"
              color="white"
              borderRadius="lg"
              py={2}
              px={4}
              cursor="pointer"
              transition="transform 0.2s ease-in-out"
              _hover={{ transform: 'scale(1.05)' }}
              mt={8}
            >
              <Text fontWeight="bold" fontSize="md">
                More Items
              </Text>
            </Box>
 
          </Flex>
        </Box>
      </>
    );
  };
  
  export default Flashsale;
