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
                  <Spinner color="blue.300" size={30} />
                </Td>
              </Tr>
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
                <Td colSpan={4} textAlign={"center"}>
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
