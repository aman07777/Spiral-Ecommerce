import React from "react";
import { Box } from "@chakra-ui/react";
const NewArrivals = () => {
  return (
    <>
      <div className="flex justify-center w-full  text-[#585858]">
        <Box
          p={4}
          width={{ base: "100%", md: "95%", lg: "75%" }}
          className="@container"
        >
          <h1 className="text-[1.5rem] mb-5 font-semibold md:text-[2rem]">
            New Arrival
          </h1>
        </Box>
      </div>
    </>
  );
};

export default NewArrivals;
