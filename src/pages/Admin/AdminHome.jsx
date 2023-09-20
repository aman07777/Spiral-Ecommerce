import React from "react";
import { Flex, Box, Heading, Text, VStack, Badge } from "@chakra-ui/react";
import Dashboard from "./Dashboard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import UseGetInnerWidth from "./hooks/get-inner-width.jsx";
function AdminHome() {
  const innerWidth = UseGetInnerWidth();
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
      <Flex direction="column" p={4} className="@container">
        <VStack spacing={4} align="stretch">
          {/* Total Orders, Total Revenue, and Average Order Value */}
          <VStack spacing={4} align="stretch">
            <h3 className="text-[#585858] font-bold text-[1.3rem] mt-5">
              Stats
            </h3>
            <div className="grid @[600px]:grid-cols-3  gap-3 font-sans text-[#585858] max-w-[750px]">
              <div className="border w-[15em] @[600px]:w-auto px-6 py-5 rounded-sm flex flex-col bg-slate-100">
                <h3 className="font-semibold text-[.9rem]">Total Orders</h3>
                <p className="text-[1.4rem]">
                  <strong>{totalOrders}</strong>
                </p>
                <p className="text-[.9rem]">From the last 30 days</p>
              </div>
              <div className="border w-[15em] @[600px]:w-auto px-6 py-5 rounded-sm flex flex-col bg-slate-100">
                <h3 className="font-semibold text-[.9rem]">Total Revenue</h3>
                <p className="text-[1.4rem]">
                  <strong>${totalRevenue.toFixed(2)}</strong>
                </p>
                <p className="text-[.9rem]">From the last 30 days</p>
              </div>
              <div className="border w-[15em] @[600px]:w-auto px-6 py-5 rounded-sm flex flex-col bg-slate-100">
                <h3 className="font-semibold text-[.9rem]">
                  Average Order Value
                </h3>
                <p className="text-[1.4rem]">
                  <strong>${averageOrderValue.toFixed(2)}</strong>
                </p>
                <p className="text-[.9rem]">From the last 30 days</p>
              </div>
            </div>
            <Box
              mt={8}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
              // overflow="hidden"
              className="w-fit"
            >
              <Heading as="h2" size="md" mb={2}>
                <span className="text-[#585858] font-bold text-[1.3rem] mt-5">
                  Sales Chart
                </span>
              </Heading>
              <Box p={2}>
                <AreaChart
                  width={
                    innerWidth <= 450
                      ? 250
                      : innerWidth > 451 && innerWidth <= 700
                      ? 350
                      : innerWidth > 701 && innerWidth <= 800
                      ? 500
                      : 700
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
            <Heading as="h2" size="md" my={2}>
              <span className="text-[#585858] font-bold text-[1.3rem] mt-5">
                Recent Orders
              </span>
            </Heading>
            <div className="flex flex-col gap-y-3 mt-5">
              {recentOrders.map((order) => (
                <Box
                  key={order.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  p={2}
                >
                  <Box p="6" className="text-[#585858]">
                    <Box d="flex" alignItems="baseline">
                      <div className="flex gap-x-1">
                        <Badge borderRadius="full" px="2" colorScheme="teal">
                          {order.status}
                        </Badge>
                        <p className="text-[.7rem] text-gray-500 uppercase font-semibold">
                          &bull; {order.date}
                        </p>
                      </div>
                      <p className="font-semibold text-[1.1rem] mt-2">
                        #{order.id}
                      </p>
                    </Box>
                    <p className="font-semibold ">{order.productName}</p>

                    <Box className="text-[.8rem] font-semibold">
                      <Text mt="2" color="gray.600">
                        {order.customerName}
                      </Text>
                      <Text color="gray.600">NRP {order.price.toFixed(2)}</Text>
                    </Box>
                  </Box>
                </Box>
              ))}
            </div>
          </Box>
        </VStack>
      </Flex>
    </>
  );
}

export default AdminHome;
