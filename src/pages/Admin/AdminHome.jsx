import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  VStack,
  Badge,
  useToast,
  Spinner,
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
import { useAdminOrderStore } from "./order/store.js";
import { useQuery } from "@tanstack/react-query";
import { handleToast } from "../../global/toast.js";
import UseGetInnerWidth from "../../hooks/get-inner-width.jsx";
function AdminHome() {
  const toast = useToast();
  const innerWidth = UseGetInnerWidth();
  // stores
  const getSales = useAdminOrderStore((state) => state.getSales);
  const getRecentOrders = useAdminOrderStore((state) => state.getRecentOrders);
  const getRevenue = useAdminOrderStore((state) => state.getRevenue);
  const getRecentMonthOrders = useAdminOrderStore(
    (state) => state.getRecentMonthOrders
  );
  const {
    data: recentOrders,
    isFetching: recentOrderFetching,
    isError: isRecentOrderError,
    error: recentOrderError,
  } = useQuery(["get", "recent", "orders"], getRecentOrders);
  const { data: revenue, isFetching: isRevenueFetching } = useQuery(
    ["get", "revenue"],
    getRevenue
  );
  const { data: order, isFetching: isOrderFetching } = useQuery(
    ["get", "30days", "orders"],
    getRecentMonthOrders
  );
  const { data: sales } = useQuery(["get", "sales"], getSales);

  isRecentOrderError &&
    handleToast(toast, "Error", recentOrderError.message, "error");
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
              <div className="border w-[15em] @[600px]:w-auto px-6 py-5 rounded-sm flex flex-col bg-slate-100 h-[8em]">
                <h3 className="font-semibold text-[.9rem]">Total Orders</h3>

                {!isOrderFetching ? (
                  <>
                    <p className="text-[1.4rem] text-[#008080]">
                      <strong>
                        {!isNaN(Number(order)) ? Number(order) : 0}
                      </strong>
                    </p>
                    <p className="text-[.9rem]">From the last 30 days</p>
                  </>
                ) : (
                  <div className="flex items-center justify-center mt-3">
                    <Spinner size="sm" />
                  </div>
                )}
              </div>
              <div className="border w-[15em] @[600px]:w-auto px-6 py-5 rounded-sm flex flex-col bg-slate-100 h-[8em]">
                <h3 className="font-semibold text-[.9rem]">Total Revenue</h3>
                {isRevenueFetching ? (
                  <div className="flex items-center justify-center mt-3">
                    <Spinner size="sm" />
                  </div>
                ) : (
                  <div>
                    <p className="text-[1.4rem] text-[#008080]">
                      <strong>
                        Rs.{" "}
                        {!isNaN(Number(revenue))
                          ? Number(revenue).toFixed(2)
                          : 0}{" "}
                      </strong>
                    </p>
                    <p className="text-[.9rem]">From the last 30 days</p>
                  </div>
                )}
              </div>
              <div className="border w-[15em] @[600px]:w-auto px-6 py-5 rounded-sm flex flex-col bg-slate-100 h-[8em]">
                <h3 className="font-semibold text-[.9rem]">
                  Average Order Value
                </h3>
                {isRevenueFetching ? (
                  <div className="flex items-center justify-center mt-3">
                    <Spinner size="sm" />
                  </div>
                ) : (
                  <>
                    <p className="text-[1.4rem] text-[#008080]">
                      <strong>
                        Rs.{" "}
                        {!isNaN(Number(revenue / order))
                          ? Number(revenue / order).toFixed(2)
                          : 0}
                      </strong>
                    </p>
                    <p className="text-[.9rem]">From the last 30 days</p>
                  </>
                )}
              </div>
            </div>
            <Box
              mt={8}
              p={4}
              borderWidth="1px"
              borderRadius="lg"
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
                      ? 400
                      : innerWidth > 701 && innerWidth <= 800
                      ? 500
                      : 700
                  }
                  height={250}
                  data={Array.isArray(sales) ? sales : []}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
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
                    dataKey="sales"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              </Box>
            </Box>
          </VStack>
          <Box className="@container">
            <Heading as="h2" size="md" my={2}>
              <span className="text-[#585858] font-bold text-[1.3rem] mt-5">
                Recent Orders
              </span>
            </Heading>
            <div
              className={`grid mt-5 gap-y-3 gap-3 @[600px]:grid-cols-2 @[1000px]:grid-cols-3`}
            >
              {!recentOrderFetching ? (
                Array.isArray(recentOrders) && recentOrders.length > 0 ? (
                  recentOrders?.map((order) => (
                    <Box
                      key={order._id}
                      borderWidth="1px"
                      borderRadius="lg"
                      overflow="hidden"
                      p={2}
                    >
                      <Box p="6" className="text-[#585858]">
                        <Box d="flex" alignItems="baseline">
                          <div className="flex gap-x-1">
                            <Badge
                              borderRadius="full"
                              px="2"
                              colorScheme="teal"
                            >
                              {order?.status}
                            </Badge>
                            <p className="text-[.7rem] text-gray-500 uppercase font-semibold">
                              &bull; {order?.createdAt?.split("T")[0]}
                            </p>
                          </div>
                          <p className="font-semibold text-[.9rem] mt-2">
                            #{order?._id}
                          </p>
                        </Box>
                        <p className="font-semibold  text-[.8rem]">
                          {Array.isArray(order?.orderItems) &&
                            order?.orderItems
                              ?.map((item) => item?.product?.name)
                              .join(", ")}
                        </p>

                        <Box className="text-[.8rem] font-semibold">
                          <Text mt="2" color="gray.600">
                            {order?.shippingInfo?.fullName}
                          </Text>
                          <Text color="gray.600">
                            NRP {order?.totalBillAmount?.toFixed(2)}
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <div className="">
                    <p>No recent orders found</p>
                  </div>
                )
              ) : (
                <Spinner size="lg" />
              )}
            </div>
          </Box>
        </VStack>
      </Flex>
    </>
  );
}

export default AdminHome;
