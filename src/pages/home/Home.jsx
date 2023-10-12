import React from "react";
import { Box } from "@chakra-ui/react";

import FeatureProducts from "./components/FeatureProducts";
import BestExperience from "../../components/Bestexperience";
import Category from "../../components/Category";
import HeroBanner from "../../components/HeroBanner";
import NewArrivals from "./components/new-arrivals";

const Home = () => {
  return (
    <>
      <Box w={"100%"}>
        <HeroBanner />
        <FeatureProducts />
        <BestExperience />
        <Category />
        <NewArrivals />
      </Box>
    </>
  );
};

export default Home;
