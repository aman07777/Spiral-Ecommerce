import React from "react";
import { useNavigate, NavLink as RouterNavLink } from "react-router-dom";
import {
  Box,
  Flex,
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
            <div
              onClick={() => navigate("/")}
              className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 w-fit cursor-pointer mr-3"
            >
              Home
            </div>
            <div
              onClick={() => navigate("/products")}
              className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 w-fit cursor-pointer mr-3"
            >
              Products
            </div>
            <div
              onClick={() => navigate("/brands")}
              className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 w-fit cursor-pointer mr-3"
            >
              Shoes
            </div>
            <div
              onClick={() => navigate("/brands")}
              className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 w-fit cursor-pointer"
            >
              Most Wanted
            </div>
          </Box>
          {/* search section */}
          <Searchbar />
          {/* user info section for lager screen */}
          <Box display={{ base: "none", md: "flex" }} alignItems="center">
            {currentUser && (
              <>
                <NavLink to="/favorites" mr={4}>
                  <StarIcon className="text-[#2e2e2e] hover:text-[#585858]" />
                </NavLink>
                <NavLink to="/protect/cart" mr={4}>
                  <ShoppingCart className="text-[#2e2e2e] hover:text-[#585858]" />
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
                    to="/profile/customer"
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
                  <MenuItem
                    onClick={handleLogout}
                    className="hover:bg-white w-full"
                  >
                    <div className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 w-fit cursor-pointer mr-3">
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
              <MenuList display="flex" flexDirection="column">
                {/* added flexDirection property */}
                <MenuItem className="">
                  <div
                    onClick={() => navigate("/")}
                    className="relative before:absolute before:content-[''] before:w-0 before:h-[1px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 w-fit text-[#585858]"
                  >
                    Home
                  </div>
                </MenuItem>
                <MenuItem className="">
                  <div
                    onClick={() => null}
                    className="relative before:absolute before:content-[''] before:w-0 before:h-[1px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 w-fit text-[#585858]"
                  >
                    Shop
                  </div>
                </MenuItem>
                <MenuItem>
                  <div
                    onClick={() => null}
                    className="relative before:absolute before:content-[''] before:w-0 before:h-[1px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 w-fit text-[#585858]"
                  >
                    Brand
                  </div>
                </MenuItem>
                <MenuItem>
                  <div
                    onClick={() => navigate("/products")}
                    className="relative before:absolute before:content-[''] before:w-0 before:h-[1px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 w-fit text-[#585858]"
                  >
                    Shoes
                  </div>
                </MenuItem>
                <MenuItem>
                  <div
                    onClick={() => navigate("/products")}
                    className="relative before:absolute before:content-[''] before:w-0 before:h-[1px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 w-fit text-[#585858]"
                  >
                    New Arrival
                  </div>
                </MenuItem>
                <MenuItem>
                  <div
                    onClick={() => navigate("/products")}
                    className="relative before:absolute before:content-[''] before:w-0 before:h-[1px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 w-fit text-[#585858]"
                  >
                    Most Wanted
                  </div>
                </MenuItem>
                <MenuItem>
                  <div
                    onClick={() => navigate("/protect/cart")}
                    className="relative before:absolute before:content-[''] before:w-0 before:h-[1px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 w-fit text-[#585858]"
                  >
                    Cart
                  </div>
                </MenuItem>
                <MenuItem>
                  <div
                    onClick={() => navigate("/profile/customer")}
                    className="relative before:absolute before:content-[''] before:w-0 before:h-[1px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 w-fit text-[#585858]"
                  >
                    My Information
                  </div>
                </MenuItem>
                <MenuItem>
                  <div
                    onClick={() => navigate("/products")}
                    className="relative before:absolute before:content-[''] before:w-0 before:h-[1px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 w-fit text-[#585858]"
                  >
                    Orders
                  </div>
                </MenuItem>
                <MenuItem>
                  <div
                    onClick={handleLogout}
                    className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 w-fit cursor-pointer mr-3"
                  >
                    Log out
                  </div>
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
    {...rest}
  >
    {children}
  </RouterNavLink>
);
export default Navbar;
