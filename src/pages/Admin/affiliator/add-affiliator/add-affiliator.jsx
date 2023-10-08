import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Select,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAffiliatorStore } from "./store";
import { handleToast } from "../../../../global/toast";
import Dashboard from "../../Dashboard";
import BreadCrumb from "./bread-crumb";
import { useNavigate } from "react-router-dom";
const AddAffiliator = () => {
  const navigate = useNavigate();
  // toast
  const toast = useToast();
  // stores
  const addAffiliator = useAffiliatorStore((state) => state.addAffiliator);

  // states
  const [affiliator, setAffiliator] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  // react-query
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["add", "affiliators"],
    mutationFn: addAffiliator,
    onSuccess: (res) => {
      if (res?.data?.status === "success") {
        queryClient.invalidateQueries(["get", "affiliators"], { exact: true });
        handleToast(
          toast,
          "Success",
          "Affiliator added successfully.",
          "success"
        );
        setAffiliator({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        });
      }
    },
    onError: (error) => {
      handleToast(toast, "Error", error.message, "error");
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(affiliator);
  };

  return (
    <>
      <Dashboard />
      <BreadCrumb />
      <div className="px-4">
        <p className="font-semibold text-[#585858] text-[1.2rem] capitalize mt-5">
          Add affiliator
        </p>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          mb={4}
          className="max-w-[550px] text-[#585858] mt-3"
        >
          <Box p="6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  size="md"
                  type="text"
                  placeholder="Enter first name"
                  value={affiliator.firstName}
                  onChange={(event) =>
                    setAffiliator({
                      ...affiliator,
                      firstName: event.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl id="lastName" isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  size="md"
                  type="text"
                  placeholder="Enter last name"
                  value={affiliator.lastName}
                  onChange={(event) =>
                    setAffiliator({
                      ...affiliator,
                      lastName: event.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={affiliator.email}
                  onChange={(event) =>
                    setAffiliator({ ...affiliator, email: event.target.value })
                  }
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  size="md"
                  type="password"
                  placeholder="Enter password"
                  value={affiliator.password}
                  onChange={(event) =>
                    setAffiliator({
                      ...affiliator,
                      password: event.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl id="role" isRequired>
                <FormLabel>Role</FormLabel>
                <Select
                  placeholder="Select role"
                  size="md"
                  value={affiliator.role}
                  onChange={(event) =>
                    setAffiliator({
                      ...affiliator,
                      role: event.target.value,
                    })
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="affiliator">Affiliator</option>
                </Select>
              </FormControl>

              <Button type="submit" colorScheme="teal" className="mt-1">
                {isLoading ? "Adding..." : "Add Affiliator"}
              </Button>
            </form>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default AddAffiliator;
