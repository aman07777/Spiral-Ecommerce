import React, { useState } from 'react';
import { Flex, Box, Heading, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import Dashboard from './Dashboard';

function AdminProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
        <Dashboard />
    <Flex direction="column" p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Add a New Product
      </Heading>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4}>
        <Box p="6">
          <form onSubmit={handleSubmit}>
            <FormControl id="name" isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input type="text" placeholder="Enter product name" value={product.name} onChange={(event) => setProduct({ ...product, name: event.target.value })} />
            </FormControl>
            <FormControl id="description" mt={4} isRequired>
              <FormLabel>Product Description</FormLabel>
              <Textarea placeholder="Enter product description" value={product.description} onChange={(event) => setProduct({ ...product, description: event.target.value })} />
            </FormControl>
            <FormControl id="price" mt={4} isRequired>
              <FormLabel>Product Price</FormLabel>
              <Input type="number" placeholder="Enter product price" value={product.price} onChange={(event) => setProduct({ ...product, price: event.target.value })} />
            </FormControl>
            <Button type="submit" colorScheme="blue" mt={4}>
              Add Product
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
    </>
  );
}

export default AdminProduct;