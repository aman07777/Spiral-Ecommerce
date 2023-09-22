import React, { useState } from "react";
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
import { NavLink } from "react-router-dom";
import Dashboard from "../../Dashboard";
import { useAddOrderStore } from "./store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleToast } from "../../../../global/toast";
const AddOrder = () => {
  const toast = useToast();
  // stores
  const addOrder = useAddOrderStore((state) => state.addOrder);
  // states
  const [order, setOrder] = useState({
    customerName: "",
    productName: "",
    quantity: "",
    price: "",
  });
  // react query
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    queryKey: ["add", "order"],
    mutationFn: addOrder,
    onSuccess: (data) => {
      data?.status === "success" &&
        queryClient.invalidateQueries(["get", "orders"]);
      handleToast(toast, "Success", "Order added successfully", "success");
      setOrder({
        customerName: "",
        productName: "",
        quantity: "",
        price: "",
      });
    },
    onError: (error) => handleToast(toast, "Error", error.message, "error"),
  });
  // handles
  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(order);
  };

  return (
    <>
      <Dashboard />
      <Breadcrumb
        spacing="5px"
        className="text-[.9rem] font-semibold text-[#585858] px-4 @[767px]:px-0 mt-3 "
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
            to="/adminProduct"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
          >
            Orders
          </NavLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <NavLink to="#">Add</NavLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex direction="column" p={4} className="max-w-[550px] text-[#585858]">
        <Heading as="h1" size="lg" mb={4}>
          Add a New Order
        </Heading>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4}>
          <Box p="6">
            <form onSubmit={handleSubmit} className="text-[#585858] ">
              <FormControl id="customerName" isRequired>
                <FormLabel>Customer Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter customer name"
                  size="md"
                  value={order.customerName}
                  onChange={(event) =>
                    setOrder({ ...order, customerName: event.target.value })
                  }
                />
              </FormControl>
              <FormControl id="productName" mt={4} isRequired>
                <FormLabel>Product Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter product name"
                  size="md"
                  value={order.productName}
                  onChange={(event) =>
                    setOrder({ ...order, productName: event.target.value })
                  }
                />
              </FormControl>
              <FormControl id="quantity" mt={4} isRequired>
                <FormLabel>Quantity</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter quantity"
                  size="md"
                  value={order.quantity}
                  onChange={(event) =>
                    setOrder({ ...order, quantity: event.target.value })
                  }
                />
              </FormControl>
              <FormControl id="price" mt={4} isRequired>
                <FormLabel>Price</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter price"
                  size="md"
                  value={order.price}
                  onChange={(event) =>
                    setOrder({ ...order, price: event.target.value })
                  }
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" mt={5}>
                {isLoading ? "Adding" : "Add Order"}
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

export default AddOrder;
