import React from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
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
    <div className="flex justify-center w-full text-[#585858]">
      <Box p={4} width={{ base: "100%", md: "95%", lg: "75%" }}>
        <h1 className="text-[1.3rem] mb-5 font-semibold md:text-[1.7rem] text-[#008080]">
          Category
        </h1>
        <Flex flexWrap="wrap" justifyContent="center" alignItems="center">
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
                boxShadow="xl"
              >
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  borderRadius="md"
                  boxSize={{ base: "200px", md: "300px" }}
                />
              </Box>
              <di className="absolute border bottom-[20%] left-[50%] transform -translate-x-1/2 cursor-pointer text-[#fff] bg-[teal] border-[teal] flex items-center gap-x-1 px-2 py-1 rounded capitalize group">
                <span className="text-[1.1rem]">{category.name}</span>
                <ArrowForwardIcon className="group-hover:translate-x-1 group-hover:transition-[translate] duration-300 ease-linear" />
              </di>
            </Box>
          ))}
        </Flex>
      </Box>
    </div>
  );
};

export default Category;
