import React from 'react';
import { Flex, Box, Heading, Text, Stat, StatLabel, StatNumber, StatHelpText, Divider, VStack, HStack, Badge } from '@chakra-ui/react';
import Dashboard from './Dashboard';
function AdminHome() {
  const totalOrders = 1234;
  const totalRevenue = 12345.67;
  const averageOrderValue = totalRevenue / totalOrders;

  const recentOrders = [
    {
      id: 1,
      status: 'New',
      date: '2 hours ago',
      productName: 'Product Name 1',
      customerName: 'Customer Name 1',
      price: 10.00,
    },
    {
      id: 2,
      status: 'Processing',
      date: '1 day ago',
      productName: 'Product Name 2',
      customerName: 'Customer Name 2',
      price: 20.00,
    },
    {
      id: 3,
      status: 'Shipped',
      date: '2 days ago',
      productName: 'Product Name 3',
      customerName: 'Customer Name 3',
      price: 30.00,
    },
  ];

  return (<>
  <Dashboard />
    <Flex direction="column" p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Welcome to the Admin Dashboard
      </Heading>
      <Divider mb={4} />
      <VStack spacing={4} align="stretch">
        <HStack spacing={4} justify="space-between">
          <Stat>
            <StatLabel>Total Orders</StatLabel>
            <StatNumber>{totalOrders}</StatNumber>
            <StatHelpText>From the last 30 days</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Total Revenue</StatLabel>
            <StatNumber>${totalRevenue.toFixed(2)}</StatNumber>
            <StatHelpText>From the last 30 days</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Average Order Value</StatLabel>
            <StatNumber>${averageOrderValue.toFixed(2)}</StatNumber>
            <StatHelpText>From the last 30 days</StatHelpText>
          </Stat>
        </HStack>
        <Box>
          <Heading as="h2" size="md" mb={2}>
            Recent Orders
          </Heading>
          {recentOrders.map((order) => (
            <Box key={order.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
              <Box p="6">
                <Box d="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    {order.status}
                  </Badge>
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                    ml="2"
                  >
                    #{order.id} &bull; {order.date}
                  </Box>
                </Box>

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                  {order.productName}
                </Box>

                <Box>
                  <Text mt="2" color="gray.600">
                    {order.customerName}
                  </Text>
                  <Text mt="2" color="gray.600">
                    ${order.price.toFixed(2)}
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </VStack>
    </Flex>
    </>
  );
}

export default AdminHome;