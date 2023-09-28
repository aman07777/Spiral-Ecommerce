import React from "react";

import { Box, Flex, Text, useToast, Spinner } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import Saletime from "../../../components/Saletime";
import ProductCard from "../../../components/product-card";
import { getFeaturedProducts } from "../../../services/ProductServices";
import { handleToast } from "../../../global/toast";
import { useQuery } from "@tanstack/react-query";

const FeatureProducts = () => {
  const toast = useToast();
  const {
    data: products,
    error,
    isLoading,
    isError,
  } = useQuery(["get", "featured-products"], getFeaturedProducts);
  isError && handleToast(toast, "Error", error.message, "error");
  return !isLoading ? (
    !isError && Array.isArray(products) && products?.length > 0 && (
      <div className="flex justify-center">
        <Box
          py={10}
          width={{ base: "100%", md: "95%", lg: "75%" }}
          className="@container"
        >
          <Marquee gradient>
            <p className="text-[2.5rem] md:text-[2.75rem] font-semibold mb-6 font-mono text-[#585858]/80 select-none">
              FLASH SALE! Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Modi, repudiandae.
            </p>
          </Marquee>
          <Flex justify="center" align="center" direction="column">
            <div className="flex flex-col md:flex-row gap-y-3 md:justify-around w-full mb-5 px-4 items-center md:items-start">
              <Text className="text-[#0077B5] font-semibold text-[1.5rem] font-mono">
                On Sale
              </Text>
              <Saletime />
              <Box
                bg="#0077B5"
                color="white"
                borderRadius="lg"
                cursor="pointer"
                transition="transform 0.2s ease-in-out"
                _hover={{ transform: "scale(1.05)" }}
                className="py-[.6rem] text-center px-4 max-w-[17em] hidden md:block"
              >
                <Text fontWeight="bold" fontSize="md">
                  More Items
                </Text>
              </Box>
            </div>
            <div className="grid grid-cols-1 px-4 w-full @[500px]:grid-cols-2 gap-5 @[800px]:grid-cols-3 @[1000px]:grid-cols-4">
              {products?.map((product) => (
                <ProductCard data={product} key={product?.id} /> // this is the new product card component
              ))}
            </div>
          </Flex>
          <div className="flex justify-center w-full mt-5 md:hidden">
            <Box
              bg="#0077B5"
              color="white"
              borderRadius="md"
              cursor="pointer"
              transition="transform 0.2s ease-in-out"
              _hover={{ transform: "scale(1.05)" }}
              className="py-[.6rem] text-center px-5"
            >
              <Text fontWeight="bold" fontSize="md">
                More Items
              </Text>
            </Box>
          </div>
        </Box>
      </div>
    )
  ) : (
    <div className="flex justify-center my-5">
      <Box
        width={{ base: "100%", md: "95%", lg: "75%" }}
        className="flex justify-center"
      >
        <Spinner />
      </Box>
    </div>
  );
};

export default FeatureProducts;
