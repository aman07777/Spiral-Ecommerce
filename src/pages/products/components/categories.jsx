import React from "react";
import { Box, Checkbox } from "@chakra-ui/react";
export default function Category({
  selectedCategories,
  setSelectedCategories,
  handleCategoryChange,
}) {
  return (
    <>
      <Box>
        <h2 className="text-[1.2rem] font-semibold mb-2">Categories</h2>
        <div className="flex flex-col">
          <Checkbox
            isChecked={selectedCategories.length === 0}
            onChange={() => setSelectedCategories([])}
          >
            All
          </Checkbox>
          <Checkbox
            // isChecked={selectedCategories.includes("Category A")}
            onChange={handleCategoryChange}
          >
            Traditional
          </Checkbox>
          <Checkbox
            // isChecked={selectedCategories.includes("Category A")}
            onChange={handleCategoryChange}
          >
            Western
          </Checkbox>
          <Checkbox
            // isChecked={selectedCategories.includes("Category A")}
            onChange={handleCategoryChange}
          >
            Accesories
          </Checkbox>
          <Checkbox
            // isChecked={selectedCategories.includes("Category B")}
            onChange={handleCategoryChange}
          >
            Shoes
          </Checkbox>
        </div>
      </Box>
    </>
  );
}
