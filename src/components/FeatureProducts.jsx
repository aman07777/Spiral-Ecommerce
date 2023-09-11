import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Flex, Image, Heading, Text } from "@chakra-ui/react";
import { ShoppingCart } from "@mui/icons-material";
import Marquee from "react-fast-marquee";
import Saletime from "./Saletime";
import { imageUrl } from "../global/config";

const FeatureProducts = ({ products }) => {
  const navigate = useNavigate();

  const handleSelectedProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="flex justify-center">
      <Box py={10} width={{ base: "100%", md: "95%", lg: "75%" }}>
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
          <Flex
            justify="center"
            align="center"
            direction="row"
            flexWrap="wrap"
            gap={8}
          >
            {products.map((product) => (
              <Box
                key={product.id}
                borderRadius="lg"
                bg="white"
                width="250px"
                height="375px"
                cursor="pointer"
                boxShadow="2xl"
                position="relative"
                transition="transform 0.2s ease-in-out"
                _hover={{ transform: "scale(1.05)" }}
                onClick={() => handleSelectedProduct(product.id)}
              >
                <Box
                  width="250px"
                  height="250px"
                  overflow="hidden"
                  position="relative"
                  mb={4}
                >
                  <Image
                    src={`${imageUrl}/${product.image}`}
                    width="250px"
                    height="250px"
                    objectFit="center"
                  />
                  <Box
                    position="absolute"
                    top={2}
                    right={2}
                    bg="white"
                    p={1}
                    borderRadius="10px"
                    color="#0077B5"
                  >
                    <ShoppingCart />
                  </Box>
                </Box>
                <Text fontWeight="bold" fontSize="lg" mb={2} ml={2}>
                  {product.name}
                </Text>
                <Text
                  fontSize="lg"
                  color="grey.100"
                  fontWeight="bold"
                  mb={2}
                  ml={2}
                >
                  ${product.price}
                </Text>
                <Text
                  fontSize="lg"
                  color="#0077B5"
                  textDecoration="line-through"
                  ml={2}
                >
                  ${product.discount}
                </Text>
              </Box>
            ))}
          </Flex>
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
  );
};

export default FeatureProducts;
