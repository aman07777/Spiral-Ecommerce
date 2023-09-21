import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { NavLink, Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import Dashboard from "../Dashboard";
import { useAdminOrderStore } from "./store";

function AdminOrder() {
  // stores
  const getAllOrders = useAdminOrderStore((state) => state.getOrders);
  const orders = useAdminOrderStore((state) => state.orders);
  // states
  // const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

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
          {Array.isArray(orders) && orders?.length > 0 ? (
            orders.map((order) => (
              <Tr key={order.id}>
                <Td>{order.customerName}</Td>
                <Td>{order.productName}</Td>
                <Td>{order.quantity}</Td>
                <Td>{order.price}</Td>
              </Tr>
            ))
          ) : (
            <Tr className="text-red-500 text-[.8rem] font-semibold">
              <Td colSpan={4} className="text-center">
                No any orders are available
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </>
  );
}

export default AdminOrder;
