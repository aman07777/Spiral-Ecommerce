import React from "react";
import { Flex, Box, Heading, Text, useToast, Spinner } from "@chakra-ui/react";
import Dashboard from "../Dashboard";
import BreadCrumb from "./components/bread-crumb";
import Navigation from "./components/navigation";
import { useQuery } from "@chakra-ui/react";
import { handleToast } from "../../../global/toast";
import { useAffiliatorStore } from "./store";
function AdminAffiliator() {
  const toast = useToast();
  // stores
  const getAffiliators = useAffiliatorStore((state) => state.getAffiliators);
  const setAffiliator = useAffiliatorStore((state) => state.setAffiliator);

  const {
    data: affiliators,
    isError,
    isLoading,
    error,
  } = useQuery(["get", "affiliators"], getAffiliators);
  isError && handleToast(toast, "Error", error.message, "error");
  !isLoading &&
    !isError &&
    Array.isArray(affiliators) &&
    setAffiliator(affiliators);
  return (
    <>
      <Dashboard />
      <BreadCrumb />
      <Navigation />
      <Flex direction="column" p={4} className="text-[#585858]">
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4}>
          <Box p="6">
            <Heading as="h2" size="md" mb={4}>
              All Affiliators
            </Heading>
            {isLoading ? (
              <>
                <div className="flex justify-center w-full">
                  <Spinner color="blue.300" size={30} />
                </div>
              </>
            ) : [].length > 0 ? (
              [].map((affiliator, index) => (
                <Box key={index} mb={2}>
                  <Text>
                    {affiliator.firstName} {affiliator.lastName} (
                    {affiliator.email}) - Promo Code: {affiliator.promoCode}
                  </Text>
                </Box>
              ))
            ) : (
              <Text>No affiliators added yet.</Text>
            )}
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default AdminAffiliator;
