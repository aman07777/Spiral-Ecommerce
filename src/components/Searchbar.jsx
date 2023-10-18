import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@chakra-ui/react";
import { FormControl } from "@chakra-ui/react";
import { Search } from "@mui/icons-material";

const Searchbar = () => {
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${keyWord}`);
  };

  const handleKeyWordChange = (e) => {
    setKeyWord(e.target.value);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={{ base: "center" }}
      py={{ base: 3, sm: 0 }}
    >
      <FormControl
        as="form"
        width={{ base: "8vw", sm: "19vw", md: "15vw" }}
        minWidth="200px"
        onSubmit={handleFormSubmit}
      >
        <div className="flex bg-white border items-center rounded">
          <input
            name="search"
            type="search"
            placeholder="Search..."
            onChange={handleKeyWordChange}
            className="w-full h-10 px-3 outline-none rounded-[inherit]"
          />
          <div className="pr-1">
            <button type="submit">
              <Search className="text-[#585858]" />
            </button>
          </div>
        </div>
      </FormControl>
    </Box>
  );
};

export default Searchbar;
