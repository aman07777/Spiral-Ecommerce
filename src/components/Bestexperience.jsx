import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Marquee from "react-fast-marquee";
import {
  CheckBoxOutlineBlankOutlined as OriginalProductsIcon,
  LocalShippingOutlined as FastShippingIcon,
  NewReleasesOutlined as NewArrivalIcon,
  LoyaltyOutlined as BrandsIcon,
} from "@mui/icons-material";

const BestExperiencePage = () => {
  return (
    <div className="flex justify-center text-[#585858] mb-5">
      <Box p={4} width={{ base: "100%", md: "95%", lg: "75%" }}>
        <h1 className="text-[1.5rem] mb-5 font-semibold md:text-[2rem]">
          We Provide the Best Experience
        </h1>
        <Marquee gradient speed={25}>
          <FeatureCard
            icon={<OriginalProductsIcon fontSize="large" />}
            title="Original Products"
          >
            We believe in quality and authenticity.
          </FeatureCard>
          <FeatureCard
            icon={<FastShippingIcon fontSize="large" />}
            title="Fast and Free Shipping"
          >
            No more waiting! We offer light
          </FeatureCard>
          <FeatureCard
            icon={<NewArrivalIcon fontSize="large" />}
            title="New Arrival"
          >
            Stay ahead of the trends with our New Arrival section.
          </FeatureCard>
          <FeatureCard icon={<BrandsIcon fontSize="large" />} title="Brands">
            We only offer products from renowned brands known for their quality
            and reliability.
          </FeatureCard>
        </Marquee>
      </Box>
    </div>
  );
};

const FeatureCard = ({ icon, title, children }) => {
  return (
    <Box className="w-[20em] h-[11em] px-2 border mx-2 p-2 ">
      <Box>{icon}</Box>
      <Heading as="h3" size="md" mt={4} mb={2}>
        {title}
      </Heading>
      <Text>{children}</Text>
    </Box>
  );
};

export default BestExperiencePage;
