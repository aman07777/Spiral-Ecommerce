import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import Dashboard from "../Dashboard";
import { useAdminOrderStore } from "./store";
import { useQuery } from "@tanstack/react-query";
import { handleToast } from "../../../global/toast";
import BreadCrumb from "./components/breadcrumb";
import Navigation from "./components/navigation";
import { useState } from "react";
import TablePagination from "../../../components/table-pagination";
function AdminOrder() {
  const toast = useToast();
  // stores
  const getAllOrders = useAdminOrderStore((state) => state.getOrders);
  const setOrders = useAdminOrderStore((state) => state.setOrders);

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // react query
  const {
    data: orders,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useQuery(["get", "orders"], getAllOrders);
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
      <BreadCrumb />
      <Navigation />
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
              <Tr className="text-red-500 text-[.8rem] font-semibold">
                <Td colSpan={4} textAlign={"center"}>
                  <Spinner color="blue.300" />
                </Td>
              </Tr>
            ) : Array.isArray(orders) && orders?.length > 0 ? (
              orders?.slice(startIndex, endIndex)?.map((order) => (
                <Tr key={order._id}>
                  <Td>{order?.shippingInfo?.fullName}</Td>
                  <Td>{order.productName || "unknown"}</Td>
                  <Td>{order.quantity || 0}</Td>
                  <Td>Rs. {order.price || 0}</Td>
                </Tr>
              ))
            ) : (
              <Tr className="text-red-500 text-[.8rem] font-semibold">
                <Td colSpan={4} textAlign={"center"}>
                  No any orders are available
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        {Array.isArray(orders) && orders.length > 10 && (
          <TablePagination
            length={orders?.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </>
  );
}

export default AdminOrder;
