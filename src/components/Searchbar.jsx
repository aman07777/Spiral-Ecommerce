import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@chakra-ui/react";
import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { Search } from "@mui/icons-material";

const Searchbar = () => {
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/products", { state: { keyWord } });
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
      className="border rounded-[.25em] border-[#585858]/60"
    >
      <FormControl
        as="form"
        width={{ base: "100%", sm: "19vw", md: "15vw" }}
        minWidth="200px"
        onSubmit={handleFormSubmit}
      >
        <InputGroup size="md">
          <Input
            name="search"
            pr="4.5rem"
            placeholder="Search for clothes..."
            onChange={handleKeyWordChange}
          />
          <InputRightElement className="pr-1">
            <button h="1.75rem" size="sm" type="submit">
              <Search className="text-[#585858]" />
            </button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </Box>
  );
};

export default Searchbar;
