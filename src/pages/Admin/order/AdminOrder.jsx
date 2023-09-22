import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Breadcrumb,
  BreadcrumbItem,
  Box,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { NavLink, Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import Dashboard from "../Dashboard";
import { useAdminOrderStore } from "./store";
import { useQuery } from "@tanstack/react-query";
import { handleToast } from "../../../global/toast";
function AdminOrder() {
  const toast = useToast();
  // stores
  const getAllOrders = useAdminOrderStore((state) => state.getOrders);
  const setOrders = useAdminOrderStore((state) => state.setOrders);

  // react query
  const {
    data: orders,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery(["get", "orders"], getAllOrders);
  //
  !isLoading &&
    !isError &&
    isSuccess &&
    Array.isArray(orders) &&
    orders?.length > 0 &&
    setOrders(orders);

  isError && handleToast(toast, "Error", error.message, "error");

  return (
    <>
      <Dashboard />
      <Breadcrumb
        spacing="5px"
        className="text-[.9rem] font-semibold text-[#585858] px-4 @[767px]:px-0 mt-3"
      >
        <BreadcrumbItem>
          <NavLink
            to="/adminHome"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
          >
            Home
          </NavLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <NavLink to="#">Orders</NavLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="flex justify-between px-4 mt-3 @container">
        <p className="font-semibold text-[#585858] text-[1.2rem]">Orders</p>
        <Box
          as={Link}
          title="Add new order"
          to="/admin-add-order"
          className="text-[#585858] hover:text-[#0077b5] transition-[color] relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:-bottom-[.1rem] before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 border hover:border-transparent p-1 rounded-sm before:left-0 @[600px]:px-3 @[700px]:px-5"
        >
          <Icon as={Add} />
        </Box>
      </div>
      <div className="md:px-4 class">
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
            {isLoading ? (
              <div className="">
                <p>Loading...</p>
              </div>
            ) : Array.isArray(orders) && orders?.length > 0 ? (
              orders.map((order) => (
                <Tr key={order._id}>
                  <Td>{order?.shippingInfo?.fullName}</Td>
                  <Td>{order.productName || "unknown"}</Td>
                  <Td>{order.quantity || 0}</Td>
                  <Td>Rs. {order.price || 0}</Td>
                </Tr>
              ))
            ) : (
              <Tr className="text-red-500 text-[.8rem] font-semibold">
                <Td colSpan={4} className="text-center" c>
                  No any orders are available
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </div>
    </>
  );
}

export default AdminOrder;
