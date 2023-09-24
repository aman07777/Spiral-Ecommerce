import React from "react";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import Dashboard from "../Dashboard";
import BreadCrumb from "./components/bread-crumb";
import Navigation from "./components/navigation";
import { useQuery } from "@chakra-ui/react";
function AdminAffiliator() {
  const foo = () => {
    return "ok";
  };
  const {
    data: affiliators,
    // isError,
    // isLoading,
  } = useQuery(["get", "affiliators"], foo);
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
            {[].length > 0 ? (
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
