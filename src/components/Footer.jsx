import React from "react";
import { Box, Text, IconButton } from "@chakra-ui/react";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex justify-center bg-gray-100 text-[#585858] pb-20 pt-10">
      <Box mt={5} width={{ base: "95%", lg: "75%" }}>
        <div className="grid grid-cols-2 w-full place-items-center md:grid-cols-3">
          <Box textAlign={{ base: "center", sm: "start" }} py={5}>
            <Text fontSize={24} fontWeight={600}>
              Help
            </Text>
            <div className="flex flex-col gap-y-1 mt-2">
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-[1rem] duration-200 "
              >
                FAQs
              </NavLink>
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-[60%] duration-200 "
              >
                Return And Exchange
              </NavLink>
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-[60%] duration-200 "
              >
                Support Team
              </NavLink>
            </div>
          </Box>
          <Box textAlign={{ base: "center", sm: "start" }} py={5}>
            <Text fontSize={24} fontWeight={600}>
              Corporate
            </Text>
            <div className="flex flex-col gap-y-1 mt-2">
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-[60%] duration-200"
              >
                Career Opportunities
              </NavLink>
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-[3rem] duration-200"
              >
                Our Stores
              </NavLink>
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-[3rem] duration-200"
              >
                About Us
              </NavLink>
            </div>
          </Box>
          <Box textAlign={{ base: "center", sm: "start" }} py={5}>
            <Text fontSize={24} fontWeight={600}>
              Policies
            </Text>
            <div className="flex flex-col gap-y-1 mt-2">
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-[60%] duration-200"
              >
                Privacy Policies
              </NavLink>
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-[60%] duration-200"
              >
                Terms & Conditions
              </NavLink>
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-[60%] duration-200"
              >
                Return Policies
              </NavLink>
            </div>
          </Box>
          <Box className="flex flex-col md:flex-row md:mt-5">
            <IconButton
              mr={3}
              colorScheme="blackAlpha"
              variant="ghost"
              _hover={{ color: "#C13584" }}
              as={Instagram}
            />
            <IconButton
              mr={3}
              colorScheme="blackAlpha"
              variant="ghost"
              _hover={{ color: "facebook.500" }}
              as={Facebook}
            />
            <IconButton
              mr={3}
              colorScheme="blackAlpha"
              variant="ghost"
              _hover={{ color: "red" }}
              as={YouTube}
            />
            <IconButton
              colorScheme="blackAlpha"
              variant="ghost"
              _hover={{ color: "twitter.500" }}
              as={Twitter}
            />
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Footer;
