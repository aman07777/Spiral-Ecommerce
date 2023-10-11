import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  useToast,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import Dashboard from "../Dashboard";
import BreadCrumb from "./components/bread-crumb";
import Navigation from "./components/navigation";
import { handleToast } from "../../../global/toast";
import { useAffiliatorStore } from "./store";
import { MdOutlineUnfoldMoreDouble } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import PromoCodeModal from "./components/promo-code-modals";
function AdminAffiliator() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // stores
  const getAffiliators = useAffiliatorStore((state) => state.getAffiliators);

  // states
  const [affiliator, setAffiliator] = useState([]);
  const {
    data: affiliators,
    isError,
    isLoading,
    error,
  } = useQuery(["get", "affiliators"], getAffiliators);

  isError && handleToast(toast, "Error", error.message, "error");
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
                  <Spinner color="blue.300" />
                </div>
              </>
            ) : affiliators.length > 0 ? (
              affiliators.map((affiliator, index) => (
                <Box key={index} mb={2} className="flex items-center gap-x-2">
                  <Text>
                    {affiliator.firstName} {affiliator.lastName} (
                    {affiliator.email})
                  </Text>
                  <p>
                    {Array.isArray(affiliator.promoCode) &&
                      affiliator.promoCode?.length > 0 &&
                      affiliator.promoCode?.length && <span> promo codes</span>}
                  </p>
                  {Array.isArray(affiliator.promoCode) &&
                    affiliator.promoCode?.length > 0 && (
                      <p className="flex items-center cursor-pointer">
                        <MdOutlineUnfoldMoreDouble
                          className="rotate-90 text-[1.4rem] hover:scale-x-125 hover:scale-y-105 transition-[scale] duration-300 text-[#585858] cursor-pointer"
                          title={`${affiliator.firstName} has ${
                            Array.isArray(affiliator.promoCode) &&
                            affiliator.promoCode?.length
                          } promo codes`}
                          onClick={() => {
                            onOpen();
                            setAffiliator(affiliator);
                          }}
                        />
                      </p>
                    )}
                </Box>
              ))
            ) : (
              <Text>No affiliators added yet.</Text>
            )}
          </Box>
        </Box>
      </Flex>
      <PromoCodeModal isOpen={isOpen} onClose={onClose} data={affiliator} />
    </>
  );
}

export default AdminAffiliator;
