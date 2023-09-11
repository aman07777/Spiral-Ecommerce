import React, { useState } from "react";
import { useNavigate, NavLink as RouterNavLink } from "react-router-dom";
import {
  Box,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import {
  Menu as MenuIcon,
  ShoppingCart,
  Star as StarIcon,
} from "@mui/icons-material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Searchbar from "./Searchbar";
import { useUserContext } from "../contexts/UserContext";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useUserContext();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/");
    toast({
      title: "Logout Successful",
      description: "You have been logged out successfully.",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
  };

  return (
    <Box
      as="nav"
      bg="gray.100"
      p={4}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={10}
      width="100%"
    >
      <Box
        ml="53px"
        mr="53px"
        width={{ base: "100%", md: "95%", lg: "75%" }}
        margin="auto"
      >
        <Flex alignItems="center" justifyContent="space-between">
          <NavLink
            to="/"
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: "teal",
              textDecoration: "none",
              textTransform: "uppercase",
            }}
          >
            AIJO
          </NavLink>
          <Box display={{ base: "none", md: "flex" }} alignItems="center">
            <NavLink
              to="/cart"
              mr={4}
              className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
            >
              New Arrival
            </NavLink>
            <NavLink
              to="/cart"
              mr={4}
              className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
            >
              Brand
            </NavLink>
            <NavLink
              to="/cart"
              mr={4}
              className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
            >
              Shoes
            </NavLink>
            <NavLink
              to="/cart"
              mr={4}
              className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
            >
              Most Wanted
            </NavLink>
          </Box>
          {/* search section */}
          <Searchbar />
          {/* user info section for lager screen */}
          <Box display={{ base: "none", md: "flex" }} alignItems="center">
            {currentUser && (
              <>
                <NavLink to="/favorites" mr={4}>
                  <StarIcon />
                </NavLink>
                <NavLink to="/cart" mr={4}>
                  <ShoppingCart />
                </NavLink>
              </>
            )}
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<MenuIcon />}
                variant="outline"
              />
              <MenuList className="px-2 pb-2">
                <MenuItem className="hover:bg-white">
                  <NavLink
                    to="/infos"
                    className="relative before:absolute before:content-[''] before:w-0 before:h-[1.5px] before:-bottom-1 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-300 capitalize"
                  >
                    My profile
                  </NavLink>
                </MenuItem>
                <MenuItem className="hover:bg-white">
                  <NavLink
                    to="/orders"
                    className="relative before:absolute before:content-[''] before:w-0 before:h-[1.5px] before:-bottom-1 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-300 capitalize"
                  >
                    Orders
                  </NavLink>
                </MenuItem>
                {currentUser ? (
                  <MenuItem onClick={handleLogout} className="hover:bg-white">
                    <div className="relative before:absolute before:content-[''] before:w-0 before:h-[1.5px] before:-bottom-1 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-300 capitalize">
                      Log Out
                    </div>
                  </MenuItem>
                ) : (
                  <MenuItem className="hover:bg-white">
                    <NavLink
                      to="/login"
                      className="relative before:absolute before:content-[''] before:w-0 before:h-[1.5px] before:-bottom-1 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-300 capitalize"
                    >
                      Log In
                    </NavLink>
                  </MenuItem>
                )}
              </MenuList>
            </Menu>
          </Box>
          {/* user info section fin */}

          {/* Show the hamburger menu icon on small screens */}
          <Box display={{ base: "flex", md: "none" }}>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<MenuIcon />}
                variant="outline"
              />
              <MenuList display="flex" flexDirection="column" fontWeight={10}>
                {/* added flexDirection property */}
                <MenuItem>
                  <NavLink to="/favorites" mr={4}>
                    Shop
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/cart" mr={4}>
                    Brand
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/cart" mr={4}>
                    Shoes
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/cart" mr={4}>
                    New Arrival
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/cart" mr={4}>
                    Most Wanted
                  </NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/cart">Cart</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/infos">My Information</NavLink>
                </MenuItem>
                <MenuItem>
                  <NavLink to="/orders">Orders</NavLink>
                </MenuItem>
                <MenuItem onClick={() => console.log("Log out")}>
                  Log out
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

const NavLink = ({ to, children, ...rest }) => (
  <RouterNavLink
    to={to}
    style={{ marginRight: "12px" }}
    fontWeight="medium"
    activeStyle={{ textDecoration: "none" }}
    {...rest}
  >
    {children}
  </RouterNavLink>
);
export default Navbar;
