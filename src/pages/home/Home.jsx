import React from "react";
import { useToast, Box, Spinner } from "@chakra-ui/react";

import FeatureProducts from "../../components/FeatureProducts";
import BestExperience from "../../components/Bestexperience";
import Category from "../../components/Category";
import HeroBanner from "../../components/HeroBanner";

import { getFeaturedProducts } from "../../services/ProductServices";

import { useQuery } from "@tanstack/react-query";
import { handleToast } from "../../global/toast";

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
          data?.status === "success" &&
          Array.isArray(data.products) &&
          data.products?.length > 0 && (
            <FeatureProducts products={data.products} />
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
        )}
        <BestExperience />
        <Category />
      </Box>
    </>
  );
};

export default Home;
