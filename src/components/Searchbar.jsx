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
        width={{ base: "100%", sm: "20vw", md: "30vw" }}
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
          <InputRightElement width="4rem">
            <Button
              h="1.75rem"
              size="sm"
              variant="solid"
              colorScheme="linkedin"
              type="submit"
            >
              <Search />
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </Box>
  );
};

export default Searchbar;
