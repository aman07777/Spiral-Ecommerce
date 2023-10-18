import React from "react";
import { Box, Checkbox } from "@chakra-ui/react";
export default function Category({ categories, handleCategoryChange }) {
  return (
    <>
      <Box>
        <h2 className="text-[1.2rem] font-semibold mb-2">Categories</h2>
        <div className="flex flex-col">
          <Checkbox
            // isChecked={selectedCategories.length === 0}
            // onChange={() => setSelectedCategories([])}
            colorScheme="teal"
          >
            All
          </Checkbox>
          {Array.isArray(categories) &&
            categories.map((category) => (
              <Checkbox
                key={category?.id}
                checked={category?.isChecked}
                onChange={(e) => handleCategoryChange(e, category)}
                colorScheme="teal"
              >
                {category?.title}
              </Checkbox>
            ))}
        </div>
      </Box>
    </>
  );
}
