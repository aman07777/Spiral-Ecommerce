import React from "react";
import {
  Box,
  Flex,
  Spacer,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Menu,
  Home,
  ShoppingCart,
  People,
  LocalMall,
  Assignment,
  Settings,
  Logout,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import Searchbar from "../../components/Searchbar";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex as="nav" bg="blue.600" p={4} align="center" className="@container">
        <Box display={{ base: "block", md: "none" }}>
          <IconButton
            colorScheme="whiteAlpha"
            icon={<Menu />}
            onClick={onOpen}
            aria-label="Open sidebar"
          />
        </Box>
        <h1 className="text-[#fff] font-mono tracking-wide select-none cursor-pointer text-[1.4rem] hidden @[900px]:block">
          AIJO
        </h1>
        <Spacer />
        <Searchbar />
        <Spacer />
        <Box
          display={{ base: "none", md: "flex" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <NavLink
            to="/adminHome"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#fff] before:transition-[1s] hover:before:w-full duration-200"
          >
            Home
          </NavLink>
          <NavLink
            to="/adminProduct"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#fff] before:transition-[1s] hover:before:w-full duration-200"
          >
            Products
          </NavLink>
          <NavLink
            to="/adminOrder"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#fff] before:transition-[1s] hover:before:w-full duration-200"
          >
            Orders
          </NavLink>
          <NavLink
            to="/adminCustomer"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#fff] before:transition-[1s] hover:before:w-full duration-200"
          >
            Customers
          </NavLink>
          <NavLink
            to="/adminAffliator"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#fff] before:transition-[1s] hover:before:w-full duration-200"
          >
            Affiliators
          </NavLink>
          <NavLink
            to="/adminSetting"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#fff] before:transition-[1s] hover:before:w-full duration-200"
          >
            Settings
          </NavLink>
        </Box>
        {/* <IconButton
          colorScheme="whiteAlpha"
          icon={<Logout />}
          aria-label="Logout"
        /> */}
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <h1 className="text-[teal] font-mono tracking-wide select-none cursor-pointer text-[1.4rem]">
                AIJO
              </h1>
            </DrawerHeader>
            <DrawerBody>
              <div className="flex flex-col justify-between h-[87dvh]">
                <VStack spacing={5} align="flex-start">
                  <Box
                    as={Link}
                    to="/adminHome"
                    className="flex text-[#2e2e2e] hover:text-[#0077b5] transition-[color] relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:-bottom-[.1rem] before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
                  >
                    <Icon as={Home} mr={2} />
                    <Text className="font-semibold">Home</Text>
                  </Box>
                  <Box
                    as={Link}
                    to="/adminProduct"
                    className="flex text-[#2e2e2e] hover:text-[#0077b5] transition-[color] relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:-bottom-[.1rem] before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
                  >
                    <Icon as={ShoppingCart} mr={2} />
                    <Text className="font-semibold">Products</Text>
                  </Box>
                  <Box
                    as={Link}
                    to="/adminOrder"
                    className="flex text-[#2e2e2e] hover:text-[#0077b5] transition-[color] relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:-bottom-[.1rem] before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
                  >
                    <Icon as={LocalMall} mr={2} />
                    <Text className="font-semibold">Orders</Text>
                  </Box>
                  <Box
                    as={Link}
                    to="/adminCustomer"
                    className="flex text-[#2e2e2e] hover:text-[#0077b5] transition-[color] relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:-bottom-[.1rem] before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
                  >
                    <Icon as={People} mr={2} />
                    <Text className="font-semibold">Customers</Text>
                  </Box>
                  <Box
                    as={Link}
                    to="/adminAffliator"
                    className="flex text-[#2e2e2e] hover:text-[#0077b5] transition-[color] relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:-bottom-[.1rem] before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
                  >
                    <Icon as={Assignment} mr={2} />
                    <Text className="font-semibold">Affiliators</Text>
                  </Box>
                  <Box
                    as={Link}
                    to="/adminSetting"
                    className="flex text-[#2e2e2e] hover:text-[#0077b5] transition-[color] relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:-bottom-[.1rem] before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
                  >
                    <Icon as={Settings} mr={2} />
                    <Text className="font-semibold">Settings</Text>
                  </Box>
                </VStack>
                <Box
                  as={Link}
                  to="#"
                  className="flex text-[#2e2e2e] hover:text-rose-500 transition-[color] relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:-bottom-[.1rem] before:bg-rose-500 before:transition-[1s] hover:before:w-full duration-200 w-fit"
                >
                  <Icon as={Logout} mr={2} />
                  <Text className="font-semibold">Logout</Text>
                </Box>
              </div>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

const NavLink = ({ href, children, ...rest }) => (
  <Link
    href={href}
    mr={4}
    fontWeight="medium"
    _hover={{ textDecoration: "none", color: "white" }}
    _active={{ backgroundColor: "blue.700" }}
    {...rest}
    style={{ marginRight: "1rem", color: "white" }}
  >
    {children}
  </Link>
);

export default Sidebar;
