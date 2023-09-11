import React from "react";
import { Box, Button, Flex, Image, IconButton } from "@chakra-ui/react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Category = () => {
  const categories = [
    {
      name: "Western",
      imageUrl: "https://www.pinkvilla.com/images/2022-09/western_dresss_2.jpg",
    },
    {
      name: "Traditional",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_28UUGZNtLiKQxXvAuOBWtlIhZDIQY6GPCQ&usqp=CAU",
    },
    {
      name: "Western",
      imageUrl: "https://www.pinkvilla.com/images/2022-09/western_dresss_2.jpg",
    },
    {
      name: "Traditional",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_28UUGZNtLiKQxXvAuOBWtlIhZDIQY6GPCQ&usqp=CAU",
    },
  ];

  return (
    <div className="flex justify-center w-full mb-10 text-[#585858]">
      <Box p={4} width={{ base: "100%", md: "95%", lg: "75%" }}>
        <h1 className="text-[1.5rem] mb-5 font-semibold md:text-[2rem]">
          Category
        </h1>
        <Flex
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          mt={10}
        >
          {categories.map((category, index) => (
            <Box
              key={index}
              p={2}
              textAlign="center"
              position="relative"
              width={{ base: "50%", md: "270px" }}
            >
              <Box
                mb={2}
                border="1px solid #ccc"
                borderRadius="10px"
                overflow="hidden"
                boxShadow="2xl"
              >
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  borderRadius="md"
                  boxSize={{ base: "200px", md: "300px" }}
                />
              </Box>
              <Button
                position="absolute"
                bottom={20}
                left={{ base: "30%", md: "20%" }}
                width="50%"
                colorScheme="blackAlpha"
                variant="solid"
                py={1}
                px={1}
              >
                {category.name}
                <IconButton
                  icon={<ArrowForwardIcon />}
                  ml={2}
                  aria-label="Category Arrow"
                  size="sm"
                  variant="ghost"
                />
              </Button>
            </Box>
          ))}
        </Flex>
      </Box>
    </div>
  );
};

export default Category;
