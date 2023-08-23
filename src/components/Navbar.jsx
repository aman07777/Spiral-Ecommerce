import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Spacer, Link, Menu, MenuButton, MenuList, MenuItem, IconButton, useToast } from '@chakra-ui/react';
import { Menu as MenuIcon, ShoppingCart, Star as StarIcon } from '@mui/icons-material';

import Searchbar from './Searchbar';
import { useUserContext } from '../contexts/UserContext';


const Navbar = () => {
  const { currentUser, setCurrentUser } = useUserContext();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');

    navigate('/');
    toast({
      title: 'Logout Successful',
      description: 'You have been logged out successfully.',
      status: 'success',
      duration: 2500,
      isClosable: true,
    });
  }

  return (
    <Box as="nav" bg="gray.100" p={4} boxShadow="md" position="sticky" top={0} zIndex={10}>
      <Box ml="53px" mr="53px">
        <Flex alignItems="center">
          <NavLink href="/" fontWeight="bold" fontSize="xl" color="teal.500">AIJO</NavLink>
          <Spacer />
          <Box display={{ base: 'none', md: 'flex' }}>
            <NavLink href="/favorites" mr={4}>Shop</NavLink>
            <NavLink href="/cart" mr={4}>New Arrival</NavLink>
            <NavLink href="/cart" mr={4}>Brand</NavLink>
            <NavLink href="/cart" mr={4}>Shoes</NavLink>
            <NavLink href="/cart" mr={4}>Most Wanted</NavLink>
          </Box>
          <Spacer />
          <Searchbar />
          <Spacer />
          <Box display={{ base: 'none', md: 'flex' }} alignItems='center'>
            {
              currentUser &&
              <><NavLink href="/favorites" mr={4}><StarIcon /></NavLink>
                <NavLink href="/cart" mr={4}><ShoppingCart /></NavLink>
              </>
            }
            <Menu>
              <MenuButton as={IconButton} icon={<MenuIcon />} variant="outline" />
              <MenuList>
                <MenuItem as={Link} href="/infos">My Information</MenuItem>
                <MenuItem as={Link} href="/orders">Orders</MenuItem>
                {currentUser
                  ? <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  : <MenuItem as={Link} href='/login'>Log In</MenuItem>
                }
              </MenuList>
            </Menu>
          </Box>
          {/* Show the hamburger menu icon on small screens */}
          <Box display={{ base: 'flex', md: 'none' }}>
            <Menu>
              <MenuButton as={IconButton} icon={<MenuIcon />} variant="outline" />
              <MenuList>
                <NavLink href="/favorites">Western Dress</NavLink>
                <NavLink href="/favorites">Traditional Clothes</NavLink>
                <NavLink href="/favorites">Bags</NavLink>
                <NavLink href="/favorites">Shoes</NavLink>
                <NavLink href="/favorites">Accessories</NavLink>
                <NavLink href="/favorites">Favorites</NavLink>
                <NavLink href="/cart">Cart</NavLink>
                <NavLink href="/infos">My Information</NavLink>
                <NavLink href="/orders">Orders</NavLink>
                <MenuItem onClick={() => console.log('Log out')}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

const NavLink = ({ href, children, ...rest }) => (
  <Link href={href} mr={4} fontWeight="medium" {...rest}>
    {children}
  </Link>
);

export default Navbar;
