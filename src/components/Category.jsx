import React from "react";
import { Box } from "@chakra-ui/react";

const Category = () => {
  const categories = [
    {
      name: "Western",
      imageUrl: "western.png",
    },
    {
      name: "Traditional",
      imageUrl: "traditional.png",
    },
    {
      name: "Accessories",
      imageUrl: "bags.png",
    },
    {
      name: "Shoes",
      imageUrl: "shoes.png",
    },
    {
      name: "Kids",
      imageUrl: "children.png",
    },
  ];

  return (
    <div className="flex justify-center w-full text-[#585858]">
      <Box p={4} width={{ base: "100%", md: "95%", lg: "75%" }}>
        <h1 className="text-[1.3rem] mb-5 font-semibold md:text-[1.7rem] text-[#008080]">
          Category
        </h1>

        <div className="w-[100%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 place-items-center">
          {categories.map((val, index) => (
            <div
              className="rounded-full border-2 gap-y-2 cursor-pointer flex-col border-gray-200 w-[10rem] h-[10rem] flex items-center justify-center hover:border-teal-500"
              key={index}
            >
              <img src={val?.imageUrl} className="w-[5rem]" />
              <span className="text-sm">{val.name}</span>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

export default Category;
