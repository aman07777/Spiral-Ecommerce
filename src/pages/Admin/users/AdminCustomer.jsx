import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import Dashboard from "../Dashboard";
import { useCustomerStore } from "./store";
import { useQuery } from "@tanstack/react-query";
import Navigation from "./components/navigation";
import BreadCrumb from "./components/bread-crumb";
import { handleToast } from "../../../global/toast";

function AdminCustomer() {
  const toast = useToast();
  // stores
  const getCustomers = useCustomerStore((state) => state.getCustomers);
  const setCustomers = useCustomerStore((state) => state.setCustomers);

  const {
    isLoading,
    data: customers,
    error,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["get", "customers"],
    queryFn: () => getCustomers(),
  });
  !isLoading &&
    isSuccess &&
    !isError &&
    Array.isArray(customers) &&
    customers?.length > 0 &&
    setCustomers(customers);

  isError && handleToast(toast, "Error", error.message, "error");

  return !isError ? (
    <>
      <Dashboard />
      <BreadCrumb />
      <Navigation />
      <div className="md:px-4">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Tr className="text-red-500 text-[.8rem] font-semibold">
                <Td colSpan={4} textAlign={"center"}>
                  <Spinner isIndeterminate color="blue.300" size={30} />
                </Td>
              </Tr>
            ) : Array.isArray(customers) && customers?.length > 0 ? (
              customers.map((user) => (
                <Tr key={user._id}>
                  <Td className="capitalize">{`${user?.firstName} ${user?.lastName}`}</Td>
                  <Td>{user?.email}</Td>
                  <Td>
                    <span
                      className={`text-[#fff] text-[.8rem] px-[.25rem] rounded-full pb-[.15rem] ${
                        user?.isVerified ? "bg-green-500" : "bg-rose-500"
                      }`}
                    >
                      {user?.isVerified ? "verified" : "unverified"}
                    </span>
                  </Td>
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
  ) : (
    <>
      <p>Error occurred</p>
      <p>{error}</p>
    </>
  );
}

export default AdminCustomer;
