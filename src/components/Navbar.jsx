import React from 'react';
import { Box, Flex, Spacer, Link, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { Menu as MenuIcon, ShoppingCart } from '@mui/icons-material';
import Searchbar from './Searchbar';

const Navbar = () => {
  return (
    <Box as="nav" bg="gray.100" p={4} boxShadow="md" position="sticky" top={0} zIndex={10}>
      <Box ml="53px" mr="53px">
      <Flex alignItems="center">
        <Link href="/" fontWeight="bold" fontSize="xl" color="teal.500">Spiral</Link>
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
          <NavLink href="/favorites" mr={4}>Favorites</NavLink>
          <NavLink href="/cart" mr={4}><ShoppingCart /></NavLink>
          <Menu>
            <MenuButton as={IconButton} icon={<MenuIcon />} variant="outline" />
            <MenuList>
              <MenuItem as={Link} href="/infos">My Information</MenuItem>
              <MenuItem as={Link} href="/orders">Orders</MenuItem>
              <MenuItem onClick={() => console.log('Log out')}>Log out</MenuItem>
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
