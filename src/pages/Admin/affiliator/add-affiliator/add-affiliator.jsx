import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useAffiliatorStore } from "./store";
import { handleToast } from "../../../../global/toast";
const AddAffiliator = () => {
  // toast
  const toast = useToast();
  // stores
  const addAffiliator = useAffiliatorStore((state) => state.addAffiliator);
  // states
  const [affiliator, setAffiliator] = useState({
    firstName: "",
    lastName: "",
    email: "",
    promoCode: "",
  });

  // react-query
  const queryClient = new QueryClient();
  const { mutate, isLoading } = useMutation({
    mutationKey: ["add", "affiliators"],
    mutationFn: addAffiliator,

    onSuccess: (data) => {
      data?.status === "success" &&
        queryClient.invalidateQueries(["get", "affiliator"], { exact: true });
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
        promoCode: "",
      });
    },
    onError: (error) => {
      handleToast(toast, "Error", error.message, "error");
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(affiliator);
  };

  const generatePromoCode = () => {
    const promoCode = Math.random().toString(36).substring(2, 8);
    setAffiliator({ ...affiliator, promoCode });
  };
  return (
    <>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        mb={4}
        className="max-w-[550px] text-[#585858]"
      >
        <Box p="6">
          <form onSubmit={handleSubmit}>
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
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
            <FormControl id="lastName" mt={4} isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input
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
            <FormControl id="email" mt={4} isRequired>
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
            <FormControl id="promoCode" mt={4} isRequired>
              <FormLabel>Promo Code</FormLabel>
              <Input
                type="text"
                placeholder="Enter promo code"
                value={affiliator.promoCode}
                onChange={(event) =>
                  setAffiliator({
                    ...affiliator,
                    promoCode: event.target.value,
                  })
                }
              />
            </FormControl>
            <Button
              type="button"
              colorScheme="blue"
              mt={4}
              onClick={generatePromoCode}
            >
              Generate Promo Code
            </Button>
            <Button type="submit" colorScheme="blue" mt={4} ml={4}>
              {isLoading ? "Adding..." : "Add Affiliator"}
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default AddAffiliator;
