import React from 'react';
import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import {
  CheckBoxOutlineBlankOutlined as OriginalProductsIcon,
  LocalShippingOutlined as FastShippingIcon,
  NewReleasesOutlined as NewArrivalIcon,
  LoyaltyOutlined as BrandsIcon,
} from '@mui/icons-material';

const BestExperiencePage = () => {
  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={8}>
        We Provide the Best Experience
      </Heading>
      <Grid templateColumns={{base:"repeat(2, 165px)",md:"repeat(auto-fit, minmax(270px, 1fr))"}} gap={{base:'5', md:'15'}}>
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
        <FeatureCard
          icon={<BrandsIcon fontSize="large" />}
          title="Brands"
        >
          We only offer products from renowned brands known for their quality and reliability.
        </FeatureCard>
      </Grid>
    </Box>
  );
};

const FeatureCard = ({ icon, title, children }) => {
  return (
    <Box
      p={{base:'1', md:'5'}}
      borderRadius="lg"
      boxShadow="2xl"
      cursor="pointer"
      transition="transform 0.2s ease-in-out"
      _hover={{ transform: 'scale(1.05)' }}
      maxWidth={{ base: '100%', md: 'none' }}
    >
      <Box>{icon}</Box>
      <Heading as="h3" size="md" mt={4} mb={2}>
        {title}
      </Heading>
      <Text>{children}</Text>
    </Box>
  );
};

export default BestExperiencePage;