import React, { useState, useEffect } from "react";
import { useToast, Box } from "@chakra-ui/react";

import FeatureProducts from "../components/FeatureProducts";
import BestExperience from "../components/Bestexperience";
import Category from "../components/Category";
import HeroBanner from "../components/HeroBanner";

import { getFeaturedProducts } from "../services/ProductServices";
import Loader from "../components/Loader";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  useEffect(() => {
    getFeaturedProducts()
      .then((result) => {
        if (result.products.length === 0) {
          toast({
            title: "No feature product found",
            description: "Please try again with different keywords.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
        setFeaturedProducts(result.products);
        setIsLoading(false);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "An error occurred.";
        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, [toast]);

  return (
    <>
      <Box w={"100%"}>
        <HeroBanner />
        {!isLoading ? (
          <FeatureProducts products={featuredProducts} />
        ) : (
          <Loader />
        )}
        <BestExperience />
        <Category />
      </Box>
    </>
  );
};

export default Home;
