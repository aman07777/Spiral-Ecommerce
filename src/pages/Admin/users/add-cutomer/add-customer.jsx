import React, { useMemo, useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Button,
  FormControl,
  FormLabel,
  Input,
  Breadcrumb,
  BreadcrumbItem,
  useToast,
} from "@chakra-ui/react";
import Dashboard from "../../Dashboard";
import { NavLink } from "react-router-dom";
import { useAddCustomerStore } from "./store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleToast } from "../../../../global/toast";
const AddCustomer = () => {
  const toast = useToast();
  // states
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // stores
  const addCustomer = useAddCustomerStore((state) => state.addCustomer);
  // react query
  const queryClient = useQueryClient();
  const { mutate, isLoading, isError } = useMutation({
    queryKey: ["add", "customer"],
    queryFn: addCustomer,
    onSuccess: (data) => {
      data?.status === "success" &&
        queryClient.invalidateQueries(["get", "customers"]);
      handleToast(toast, "Success", "Customer added successfully", "success");
    },
    onError: (error) => {
      handleToast(toast, "Error", error.message, "error");
    },
  });
  // handel form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(customer);
  };

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
        <BreadcrumbItem>
          <NavLink
            to="/adminCustomer"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
          >
            Customer
          </NavLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <NavLink to="#">Add</NavLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex direction="column" p={4} className="text-[#585858]">
        <p className="font-semibold text-[#585858] text-[1.2rem]">
          Add a new Customers
        </p>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          mb={4}
          className="max-w-[450px] mt-3"
        >
          <Box p="6">
            <form onSubmit={handleSubmit}>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter first name"
                  value={customer.firstName}
                  onChange={(event) =>
                    setCustomer({ ...customer, firstName: event.target.value })
                  }
                />
              </FormControl>
              <FormControl id="lastName" mt={4} isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter last name"
                  value={customer.lastName}
                  onChange={(event) =>
                    setCustomer({ ...customer, lastName: event.target.value })
                  }
                />
              </FormControl>
              <FormControl id="email" mt={4} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={customer.email}
                  onChange={(event) =>
                    setCustomer({ ...customer, email: event.target.value })
                  }
                />
              </FormControl>
              <FormControl id="phone" mt={4} isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  value={customer.phone}
                  onChange={(event) =>
                    setCustomer({ ...customer, phone: event.target.value })
                  }
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" mt={4}>
                {
                  // show loading state
                  isLoading ? "Loading..." : "Add Customer"
                }
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default AddCustomer;
