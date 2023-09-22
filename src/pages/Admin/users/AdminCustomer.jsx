import React from "react";
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
import Dashboard from "../Dashboard";
import { Add } from "@mui/icons-material";
import { NavLink, Link } from "react-router-dom";
import { useCustomerStore } from "./store";
import { useQuery } from "@tanstack/react-query";

function AdminCustomer() {
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
  !isLoading && isSuccess && setCustomers(customers);

  return !isError ? (
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
          <NavLink to="#">Customers</NavLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="flex justify-between px-4 mt-3 @container">
        <p className="font-semibold text-[#585858] text-[1.2rem]">Customers</p>
        <Box
          as={Link}
          title="Add new order"
          to="/admin-add-customer"
          className="text-[#585858] hover:text-[#0077b5] transition-[color] relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:-bottom-[.1rem] before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 border hover:border-transparent p-1 rounded-sm before:left-0 @[600px]:px-3 @[700px]:px-5"
        >
          <Icon as={Add} />
        </Box>
      </div>
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
              "Lading..."
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
                <Td colSpan={4} className="text-center">
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
