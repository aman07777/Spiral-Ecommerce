import React from 'react';
import { Box, Flex, Image, Heading, Text } from '@chakra-ui/react';
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
              <Text fontSize="16px"  fontWeight="10px"color="#007B5">
                On Sale
              </Text>
              <Saletime/>
              <Heading size="lg" mr="190px" color="#0077B5"><marquee>FLASH SALE!</marquee></Heading>
              <Box
                bg="#0077B5"
                color="white"
                borderRadius="lg"
                py={2}
                px={4}
                cursor="pointer"
                transition="transform 0.2s ease-in-out"
                _hover={{ transform: 'scale(1.05)' }}
              >
                <Text fontWeight="bold" fontSize="md">
                  More Items
                </Text>
              </Box>
            </Flex>
            <Flex justify="center" align="center" direction="row" flexWrap="wrap" gap={8} >
              {Dummy.map((item) => (
                <Box
                  key={item.id}
                  borderRadius="lg"
                  bg="white"
                  width="250px"
                  height="375px"
                  cursor="pointer"
                  boxShadow="2xl"
                  position="relative"
                  transition="transform 0.2s ease-in-out"
                  _hover={{ transform: 'scale(1.05)' }}
                >
                  <Box
                    width="250px"
                    height="250px"
                    overflow="hidden"
                    position="relative"
                    mb={4}
                  >
                    <Image
                      src={item.img}
                      width="250px"
                      height="250px"
                      objectFit="center"
                    />
                    <Box
                      position="absolute"
                      top={2}
                      right={2}
                      bg="white"
                      p={1}
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
          </Flex>
        </Box>
      </>
    );
  };
  
  export default Flashsale;
