import React from 'react';
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
} from '@chakra-ui/react';
import { Menu, Home, ShoppingCart, People, LocalMall, Assignment, Settings, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Searchbar from '../../components/Searchbar';



const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex as="nav" bg="blue.600" p={4} align="center">
        <Box display={{ base: 'block', md: 'none' }}>
          <IconButton
            colorScheme="whiteAlpha"
            icon={<Menu />}
            onClick={onOpen}
            aria-label="Open sidebar"
          />
        </Box>
        <Spacer />
      <Searchbar/>
        <Spacer />
        <Box display={{ base: 'none', md: 'flex' }} justifyContent="space-between" alignItems="center">
        <NavLink to="/adminHome">Home</NavLink>
        <NavLink to="/adminProduct">Products</NavLink>
        <NavLink to="/adminOrder">Orders</NavLink>
        <NavLink to="/adminCustomer">Customers</NavLink>
        <NavLink to="/adminAffliator">Affiliators</NavLink>
        <NavLink to="/adminSetting">Settings</NavLink>
       
        </Box>  
        <IconButton
          colorScheme="whiteAlpha"
          icon={<Logout />}
          aria-label="Logout"
        />
      </Flex>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
            <VStack spacing={4} align="flex-start">
          <Box as={Link} to="/adminHome" w="100%" textAlign="left">
            <Icon as={Home} mr={2} />
            <Text>Home</Text>
          </Box>
          <Box as={Link} to="/adminProduct" w="100%" textAlign="left">
            <Icon as={ShoppingCart} mr={2} />
            <Text>Products</Text>
          </Box>
          <Box as={Link} to="/adminOrder" w="100%" textAlign="left">
            <Icon as={LocalMall} mr={2} />
            <Text>Orders</Text>
          </Box>
          <Box as={Link} to="/adminCustomer" w="100%" textAlign="left">
            <Icon as={People} mr={2} />
            <Text>Customers</Text>
          </Box>
          <Box as={Link} to="/adminAffliator" w="100%" textAlign="left">
            <Icon as={Assignment} mr={2} />
            <Text>Affiliators</Text>
          </Box>
          <Box as={Link} to="/adminSetting" w="100%" textAlign="left">
            <Icon as={Settings} mr={2} />
            <Text>Settings</Text>
          </Box>
          
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      
    </>
  );
};



const NavLink = ({ href, children, ...rest }) => (
  <Link href={href} mr={4} fontWeight="medium" _hover={{ textDecoration: 'none', color: 'white' }} _active={{ backgroundColor: 'blue.700' }} {...rest} style={{ marginRight: '1rem', color: 'white' }}>
    {children}
  </Link>
);

export default Sidebar;
