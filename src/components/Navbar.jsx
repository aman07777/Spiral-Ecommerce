import React,{useState} from 'react';
import { Box, Flex, Spacer, Link, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import MenuIcon from '@mui/icons-material/Menu';
import Searchbar from './Searchbar';

const Navbar = () => {
  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  return (
    <Box boxShadow="md" bg="gray.100" p={4}>
      <Flex alignItems="center">
        <Link href="/" fontWeight="bold" fontSize="xl" color="teal.500">Spiral</Link>
        <Spacer />
        <Box display={{ base: 'none', md: 'flex' }}>
          <Link href="/favorites" mr={4} fontWeight="medium">Western Dress</Link>
          <Link href="/cart" mr={4} fontWeight="medium">Traditional Clothes</Link>
          <Link href="/cart" mr={4} fontWeight="medium"> Bags</Link>
          <Link href="/cart" mr={4} fontWeight="medium">Shoes </Link>
          <Link href="/cart" mr={4} fontWeight="medium">Accessories</Link>
          </Box>
          <Spacer />
        <Searchbar/>
        <Spacer />
        <Box display={{ base: 'none', md: 'flex', }} alignItems='center'>
          <Link href="/favorites" mr={4} fontWeight="medium">Favorites</Link>
          <Link href="/cart" mr={4} fontWeight="medium">Cart</Link>
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
            <MenuItem as={Link} href="/favorites">Western Dress</MenuItem>
            <MenuItem as={Link} href="/favorites">Traditional Clothes</MenuItem>
            <MenuItem as={Link} href="/favorites">Bags</MenuItem>
            <MenuItem as={Link} href="/favorites">Shoes</MenuItem>
            <MenuItem as={Link} href="/favorites">Accessories</MenuItem>

              <MenuItem as={Link} href="/favorites">Favorites</MenuItem>
              <MenuItem as={Link} href="/cart">Cart</MenuItem>
              <MenuItem as={Link} href="/infos">My Information</MenuItem>
              <MenuItem as={Link} href="/orders">Orders</MenuItem>
              <MenuItem onClick={() => console.log('Log out')}>Log out</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;