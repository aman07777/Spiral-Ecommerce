import React from "react";
import { Box, Text, IconButton } from "@chakra-ui/react";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex justify-center bg-gray-100 text-[#585858] pb-20 pt-10">
      <Box mt={5} width={{ base: "95%", lg: "75%" }}>
        <div className="grid w-full grid-cols-2 md:grid-cols-3">
          <Box textAlign={{ sm: "start" }} py={5}>
            <Text fontSize={24} fontWeight={600}>
              Help
            </Text>
            <div className="flex flex-col mt-2 gap-y-1">
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#008080] before:transition-[1s] hover:before:w-full duration-200 w-fit"
              >
                FAQs
              </NavLink>
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#008080] before:transition-[1s] hover:before:w-full duration-200 w-fit"
              >
                Return And Exchange
              </NavLink>
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#008080] before:transition-[1s] hover:before:w-full duration-200 w-fit"
              >
                Support Team
              </NavLink>
            </div>
          </Box>
          <Box textAlign={{sm: "start" }} py={5}>
            <Text fontSize={24} fontWeight={600}>
              Corporate
            </Text>
            <div className="flex flex-col mt-2 gap-y-1">
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#008080] before:transition-[1s] hover:before:w-full duration-200 w-fit"
              >
                Career Opportunities
              </NavLink>
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#008080] before:transition-[1s] hover:before:w-full duration-200 w-fit"
              >
                Our Stores
              </NavLink>
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#008080] before:transition-[1s] hover:before:w-full duration-200 w-fit"
              >
                About Us
              </NavLink>
            </div>
          </Box>
          <Box textAlign={{sm: "start" }} className="md:py-5">
            <Text fontSize={24} fontWeight={600}>
              Policies
            </Text>
            <div className="flex flex-col mt-2 gap-y-1">
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#008080] before:transition-[1s] hover:before:w-full duration-200 w-fit"
              >
                Privacy Policies
              </NavLink>
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#008080] before:transition-[1s] hover:before:w-full duration-200 w-fit"
              >
                Terms & Conditions
              </NavLink>
              <NavLink
                to=""
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#008080] before:transition-[1s] hover:before:w-full duration-200 w-fit"
              >
                Return Policies
              </NavLink>
            </div>
          </Box>
          <div className="max-w-[15em]">
            <Text fontSize={24} fontWeight={600}>
              Socials
            </Text>
            <Box className="grid grid-cols-4 mt-3 gap-x-1 gap-y-1">
              <IconButton
                mr={3}
                colorScheme="blackAlpha"
                variant="ghost"
                _hover={{ color: "#C13584" }}
                as={Instagram}
                className="cursor-pointer"
                title="Instagram"
              />
              <IconButton
                mr={3}
                colorScheme="blackAlpha"
                variant="ghost"
                _hover={{ color: "facebook.500" }}
                as={Facebook}
                className="cursor-pointer"
                title="Facebook"
              />
              <IconButton
                mr={3}
                colorScheme="blackAlpha"
                variant="ghost"
                _hover={{ color: "red" }}
                as={YouTube}
                className="cursor-pointer"
                title="YouTube"
              />
              <IconButton
                colorScheme="blackAlpha"
                variant="ghost"
                _hover={{ color: "twitter.500" }}
                as={Twitter}
                className="cursor-pointer"
                title="Twitter"
              />
            </Box>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Footer;
