import React from "react";
import { useToast, Box, Spinner } from "@chakra-ui/react";

import FeatureProducts from "../components/FeatureProducts";
import BestExperience from "../components/Bestexperience";
import Category from "../components/Category";
import HeroBanner from "../components/HeroBanner";

import { getFeaturedProducts } from "../services/ProductServices";

import { useQuery } from "@tanstack/react-query";
import { handleToast } from "../global/toast";

const Home = () => {
  // const [featuredProducts, setFeaturedProducts] = useState([]);

  const toast = useToast();

  const { data, error, isLoading, isError } = useQuery(
    ["get", "featured-products"],
    getFeaturedProducts
  );
  isError && handleToast(toast, "Error", error.message, "error");

  return (
    <>
      <Box w={"100%"}>
        <HeroBanner />
        {!isLoading ? (
          !isError &&
          data.status === "success" &&
          Array.isArray(data.products) &&
          data.products?.length > 0 ? (
            <FeatureProducts products={data.products} />
          ) : (
            isError &&
            handleToast(
              toast,
              "No products",
              "No any products are available",
              "info"
            )
          )
        ) : (
          <Spinner />
        )}
        <BestExperience />
        <Category />
      </Box>
    </>
  );
};

export default Home;
