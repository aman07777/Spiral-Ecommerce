import React from "react";
import { Box, Checkbox } from "@chakra-ui/react";
export default function Brands({
  selectedBrands,
  setSelectedBrands,
  handleBrandChange,
}) {
  return (
    <>
      <Box>
        <h2 className="text-[1.2rem] font-semibold mb-2">Brands</h2>
        <div className="flex flex-col">
          <Checkbox
            isChecked={selectedBrands.length === 0}
            onChange={() => setSelectedBrands([])}
            colorScheme="teal"
          >
            All
          </Checkbox>
          <Checkbox
            // isChecked={selectedBrands.includes("Brand A")}
            onChange={handleBrandChange}
            colorScheme="teal"
          >
            Nike
          </Checkbox>
          <Checkbox
            isChecked={selectedBrands.includes("Brand A")}
            onChange={handleBrandChange}
            colorScheme="teal"
          >
            Armani
          </Checkbox>
          <Checkbox
            isChecked={selectedBrands.includes("Brand A")}
            onChange={handleBrandChange}
            colorScheme="teal"
          >
            Varsachhi
          </Checkbox>
          <Checkbox
            isChecked={selectedBrands.includes("Brand B")}
            onChange={handleBrandChange}
            colorScheme="teal"
          >
            Baanarasi
          </Checkbox>
        </div>
      </Box>
    </>
  );
}
