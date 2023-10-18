import React from "react";
import { Box, Checkbox } from "@chakra-ui/react";
export default function Brands({ brands, handleBrandChange }) {
  return (
    <>
      <Box>
        <h2 className="text-[1.2rem] font-semibold mb-2">Brands</h2>
        <div className="flex flex-col">
          {Array.isArray(brands) &&
            brands.map((brand) => (
              <Checkbox
                key={brand?.id}
                checked={brand?.isChecked}
                onChange={(e) => handleBrandChange(e, brand)}
                colorScheme="teal"
              >
                {brand?.title}
              </Checkbox>
            ))}
        </div>
      </Box>
    </>
  );
}
