import React, { useState, useEffect } from 'react';
import { Flex, Box, Heading, Button, FormControl, FormLabel, Input ,Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import Dashboard from './Dashboard';
function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/orders')
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Customer Name</Th>
          <Th>Product Name</Th>
          <Th>Quantity</Th>
          <Th>Price</Th>
        </Tr>
      </Thead>
      <Tbody>
        {orders.map((order) => (
          <Tr key={order.id}>
            <Td>{order.customerName}</Td>
            <Td>{order.productName}</Td>
            <Td>{order.quantity}</Td>
            <Td>{order.price}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

function AdminOrder() {
  const [order, setOrder] = useState({
    customerName: '',
    productName: '',
    quantity: 0,
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
          Add a New Order
        </Heading>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4}>
          <Box p="6">
            <form onSubmit={handleSubmit}>
              <FormControl id="customerName" isRequired>
                <FormLabel>Customer Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter customer name"
                  value={order.customerName}
                  onChange={(event) => setOrder({ ...order, customerName: event.target.value })}
                />
              </FormControl>
              <FormControl id="productName" mt={4} isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter product name"
                  value={order.productName}
                  onChange={(event) => setOrder({ ...order, productName: event.target.value })}
                />
              </FormControl>
              <FormControl id="quantity" mt={4} isRequired>
                <FormLabel>Quantity</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  value={order.quantity}
                  onChange={(event) => setOrder({ ...order, quantity: event.target.value })}
                />
              </FormControl>
              <FormControl id="price" mt={4} isRequired>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter price"
                  value={order.price}
                  onChange={(event) => setOrder({ ...order, price: event.target.value })}
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" mt={4}>
                Add Order
              </Button>
            </form>
          </Box>
        </Box>
        <OrderList />
      </Flex>
    </>
  );
}

export default AdminOrder;