import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Flex, Image, Heading, Text, useToast } from '@chakra-ui/react';
import { ShoppingCart } from '@mui/icons-material';

import Saletime from './Saletime';
import { getProduct } from '../services/ProductServices';

const FeatureProducts = ({ products }) => {
  const toast = useToast();
  const navigate = useNavigate();

  const handleSelectedProduct = async (productId) => {
    try {
      const product = await getProduct(productId);
      navigate("/productDetails", { state: product });
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
    <Box py={10} >
      <Flex justify="center" align="center" direction="column">
        <Flex justify="space-between" align="center" width="80%" mb={10}>
          <Box display={{base:'block',md:'none'}}>
          <Text fontSize="16px" fontWeight="10px" color="#007B5">
            On Sale
          </Text>
          <Saletime />
        <Heading mr={{ base: "0", md: "190px" ,sm:"0"}}color="#0077B5" fontSize={{ base: "1.5rem", md: "2rem" }} ><marquee>FLASH SALE!</marquee></Heading>
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
          {products.map((product) => (
            <Box
              key={product.id}
              borderRadius="lg"
              bg="white"
              width={{ base: '40%', md: '18%' }}
              height={{ base: '15rem', md: '375px' }}
              cursor="pointer"
              boxShadow="2xl"
              position="relative"
              transition="transform 0.2s ease-in-out"
              _hover={{ transform: 'scale(1.05)' }}
              onClick={() => handleSelectedProduct(product.id)}
            >
              <Box
                width="100%"
                height={{ base: '50%', md: '70%' }}
                overflow="hidden"
                position="relative"
                mb={4}
              >
                <Image
                  src={`http://localhost:8080/${product.image}`}
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
                {product.name}
              </Text>
              <Text fontSize="lg" color="grey.100" fontWeight="bold" mb={2} ml={2}>
                ${product.price}
              </Text>
              <Text fontSize="lg" color="#0077B5" textDecoration="line-through" ml={2}>
                ${product.discount}
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
  );
};

export default FeatureProducts;
