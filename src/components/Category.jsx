import React from "react";
import { Box, Button, Flex, Image, Icon } from "@chakra-ui/react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Define a functional component called Category
const Category = () => {
  // Define an array of categories with names and image URLs
  const categories = [
    {
      name: "Western",
      imageUrl: "https://www.pinkvilla.com/images/2022-09/western_dresss_2.jpg",
    },
    {
      name: "Western",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_28UUGZNtLiKQxXvAuOBWtlIhZDIQY6GPCQ&usqp=CAU",
    },
    {
      name: "Western",
      imageUrl: "https://www.pinkvilla.com/images/2022-09/western_dresss_2.jpg",
    },
    {
      name: "Western",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_28UUGZNtLiKQxXvAuOBWtlIhZDIQY6GPCQ&usqp=CAU",
    },
  ];

  // Render a list of categories with images and buttons
  return (
    <div className="flex justify-center w-full mb-10 text-[#585858]">
      <Box p={4} width={{ base: "100%", md: "95%", lg: "75%" }}>
        <h1 className="text-[1.5rem] mb-5 font-semibold md:text-[2rem]">
          Category
        </h1>
        <Flex
          flexWrap="wrap"
          justifyContent={{ base: "center", md: "center" }}
          alignItems="center"
          gap={{ base: "6", md: "2" }}
        >
          {categories.map((category, index) => (
            <Box
              key={index}
              p={2}
              textAlign="center"
              position="relative"
              width={{ base: "45%", md: "270px" }}
              mb={2}
              bg="rgb(223, 225, 235)"
              borderRadius="50px"
              overflow="hidden"
            >
              <Box
                borderRadius="50px"
                overflow="hidden"
                height={{ base: "200px", md: "310px" }}
              >
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  borderRadius="50px"
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  p={2}
                />
              </Box>
              <Button
                position="absolute"
                bottom={20}
                left={{ base: "28%", md: "25%" }}
                top={{ base: "65%", md: "70%" }}
                width="50%"
                height={{ base: "30px", md: "40px" }}
                colorScheme="teal"
                variant="solid"
                py={1}
                px={1}
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "0 10px 20px rgba(27, 27, 27, .5)",
                  _after: {
                    backgroundColor: "rgb(0, 238, 255)",
                    transform: "scaleX(1.4) scaleY(1.5)",
                    opacity: 0,
                  },
                }}
                _active={{
                  transform: "translateY(-3px)",
                }}
                _after={{
                  content: '""',
                  display: "inline-block",
                  height: "100%",
                  width: "100%",
                  borderRadius: "300px",
                  top: 0,
                  left: 0,
                  position: "absolute",
                  zIndex: -1,
                  transition: "all .3s",
                }}
              >
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  fontSize={{ base: "10px", md: "15px" }}
                >
                  <span>{category.name}</span>
                  <Icon
                    as={ArrowForwardIcon}
                    fontSize={{ base: "1xl", md: "2xl" }}
                  />
                </Flex>
              </Button>
            </Box>
          ))}
        </Flex>
      </Box>
    </div>
  );
};

// Export the Category component as the default export
export default Category;
