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

  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false);

  const handleShopMenuOpen = () => {
    setIsShopMenuOpen(true);
  };

  const handleShopMenuClose = () => {
    setIsShopMenuOpen(false);
  };

  return (
    <Box as="nav" bg="gray.100" p={4} boxShadow="md" position="sticky" top={0} zIndex={10} width="100%">
      <Box ml="53px" mr="53px" width={{ base: '100%', md: '80%' }} margin="auto">
        <Flex alignItems="center">
          <Link href="/" fontWeight="bold" fontSize="xl" color="teal.500">Spiral</Link>
          <Spacer />
          <Box display={{ base: 'none', md: 'flex' }}>
            <Menu>
              <MenuButton as={NavLink} href="/favorites" onMouseMove={handleShopMenuOpen} onMouseLeave={handleShopMenuClose} mr={4}>Shop <ArrowDropDownIcon /></MenuButton>
              <MenuList isOpen={isShopMenuOpen} onOpen={handleShopMenuOpen} onClose={handleShopMenuClose}>
                <MenuItem><NavLink href="/western">Western</NavLink></MenuItem>
                <MenuItem><NavLink href="/traditional">Traditional</NavLink></MenuItem>
                <MenuItem><NavLink href="/accessories">Accessories</NavLink></MenuItem>
                <MenuItem><NavLink href="/others">Others</NavLink></MenuItem>
              </MenuList>
            </Menu>
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
              <MenuList display="flex" flexDirection="column" fontWeight={10}> {/* added flexDirection property */}
                <MenuItem><NavLink href="/favorites" mr={4}>Shop</NavLink></MenuItem>
                <MenuItem><NavLink href="/cart" mr={4}>Brand</NavLink></MenuItem>
                <MenuItem><NavLink href="/cart" mr={4}>Shoes</NavLink></MenuItem>
                <MenuItem><NavLink href="/cart" mr={4}>New Arrival</NavLink></MenuItem>
                <MenuItem><NavLink href="/cart" mr={4}>Most Wanted</NavLink></MenuItem>
                <MenuItem><NavLink href="/cart">Cart</NavLink></MenuItem>
                <MenuItem><NavLink href="/infos">My Information</NavLink></MenuItem>
                <MenuItem><NavLink href="/orders">Orders</NavLink></MenuItem>
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