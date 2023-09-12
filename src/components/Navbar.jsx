import React ,{useState} from 'react';
import { useNavigate,NavLink as RouterNavLink } from 'react-router-dom';
import { Box, Flex, Spacer, Link, Menu, MenuButton, MenuList, MenuItem, IconButton, useToast } from '@chakra-ui/react';
import { Menu as MenuIcon, ShoppingCart, Star as StarIcon } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
        <NavLink href="/" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: 'teal', textDecoration: 'none', textTransform: 'uppercase' }}>AIJO</NavLink>
          <Spacer />
          <Box display={{ base: 'none', md: 'flex' }} alignItems="center">
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
              <>
                <NavLink href="/favorites" mr={4}><StarIcon /></NavLink>
                <NavLink href="/cart" mr={4}><ShoppingCart /></NavLink>
              </>
            }
            <Menu>
              <MenuButton as={IconButton} icon={<MenuIcon />} variant="outline" />
              <MenuList>
                <MenuItem  href="/infos">My Information</MenuItem>
                <MenuItem  href="/orders">Orders</MenuItem>
                {currentUser
                  ? <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  : <MenuItem  href='/login'>Log In</MenuItem>
                }
              </MenuList>
            </Menu>
          </Box>
          <Box display={{ base: 'flex', md: 'none' }} >
            <Menu>
              <MenuButton as={IconButton} icon={<MenuIcon />} variant="outline" />
              <MenuList display="flex" flexDirection="column" fontWeight={10}> 
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

const NavLink = ({ to, children, ...rest }) => (
  <RouterNavLink to={to} style={{ marginRight: '12px' }} fontWeight="medium" activeStyle={{ textDecoration: 'none' }} {...rest}>
    {children}
  </RouterNavLink>
);
export default Navbar;