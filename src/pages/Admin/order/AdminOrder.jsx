import { useToast } from "@chakra-ui/react";
import Dashboard from "../Dashboard";
import { useAdminOrderStore } from "./store";
import { useQuery } from "@tanstack/react-query";
import { handleToast } from "../../../global/toast";
import BreadCrumb from "./components/breadcrumb";
import Navigation from "./components/navigation";
import OrderTable from "./components/table";
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
      {isLoading ? (
        <>
          <div className="flex justify-center">
            <p>Loading</p>
          </div>
        </>
      ) : (
        <OrderTable data={orders} />
      )}
    </>
  );
}

export default AdminOrder;
