import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import Dashboard from "./Dashboard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AdminHome() {
  const totalOrders = 1234;
  const totalRevenue = 12345.67;
  const averageOrderValue = totalRevenue / totalOrders;

  const recentOrders = [
    {
      id: 1,
      status: "New",
      date: "2 hours ago",
      productName: "Product Name 1",
      customerName: "Customer Name 1",
      price: 10.0,
    },
    {
      id: 2,
      status: "Processing",
      date: "1 day ago",
      productName: "Product Name 2",
      customerName: "Customer Name 2",
      price: 20.0,
    },
    {
      id: 3,
      status: "Shipped",
      date: "2 days ago",
      productName: "Product Name 3",
      customerName: "Customer Name 3",
      price: 30.0,
    },
  ];
  const data = [
    { name: "Jan", uv: 4000, pv: 2400 },
    { name: "Feb", uv: 3000, pv: 1398 },
    { name: "Mar", uv: 2000, pv: 9800 },
    { name: "Apr", uv: 2780, pv: 3908 },
    { name: "May", uv: 1890, pv: 4800 },
    { name: "Jun", uv: 2390, pv: 3800 },
    { name: "Jul", uv: 3490, pv: 4300 },
  ];
  return (
    <>
      <Dashboard />
      <Flex direction="column" p={4}>
        <VStack spacing={4} align="stretch">
          {/* Total Orders, Total Revenue, and Average Order Value */}
          <VStack spacing={4} align="stretch">
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
            <Box
              mt={8}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
            >
              <Heading as="h2" size="md" mb={2}>
                Sales Chart
              </Heading>
              <Box p={2}>
                <AreaChart
                  width={
                    window.innerWidth <= 480 ? window.innerWidth - 40 : 730
                  }
                  height={250}
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              </Box>
            </Box>
          </VStack>
          <Box>
            <Heading as="h2" size="md" mb={2}>
              Recent Orders
            </Heading>
            {recentOrders.map((order) => (
              <Box
                key={order.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={2}
              >
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

                  <Box
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    lineHeight="tight"
                    isTruncated
                  >
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
