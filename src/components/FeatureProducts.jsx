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
          <Text fontSize="16px" fontWeight="10px" color="#007B5">
            On Sale
          </Text>
          <Saletime />
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
          {products.map((product) => (
            <Box
              key={product.id}
              borderRadius="lg"
              bg="white"
              width="250px"
              height="375px"
              cursor="pointer"
              boxShadow="2xl"
              position="relative"
              transition="transform 0.2s ease-in-out"
              _hover={{ transform: 'scale(1.05)' }}
              onClick={() => handleSelectedProduct(product.id)}
            >
              <Box
                width="250px"
                height="250px"
                overflow="hidden"
                position="relative"
                mb={4}
              >
                <Image
                  src={`http://localhost:8080/${product.image}`}
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
      </Flex>
    </Box>
  );
};

export default FeatureProducts;