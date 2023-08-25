import React, { useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Avatar,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  List,
  ListItem,
  ListIcon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,

} from '@chakra-ui/react';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CakeIcon from '@mui/icons-material/Cake';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import MenuIcon from '@mui/icons-material/Menu';

const CustomerProfile = () => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [birthday, setBirthday] = useState('1990-01-01');
  const [password, setPassword] = useState('');
  const [bonus, setBonus] = useState(100);
  const [image, setImage] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handlePasswordChange = () => {
    // TODO: Implement password change logic
  };

  const handleImageUpload = () => {
    // TODO: Implement image upload logic
  };

  const handleLogout = () => {
    // TODO: Implement logout logic
  };

  const handleEditProfile = () => {
    // TODO: Implement edit profile logic
  };

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      
      <Flex alignItems="center" bg="gray.50" p={4}>
        <Avatar size="lg" name={`${firstName} ${lastName}`} src={image} />
        <Box ml={4}>
          <Text fontWeight="bold">{`${firstName} ${lastName}`}</Text>
          <Text fontSize="sm">{email}</Text>
          <Text fontSize="sm">{`Bonus: ${bonus}`}</Text>
        </Box>
        <Box ml="auto">
          <IconButton aria-label="Edit Profile" icon={<EditIcon />} onClick={handleEditProfile} />
        </Box>
        <Box display={{ base: 'block', md: 'none' }}>
          <IconButton aria-label="Open Sidebar" icon={<MenuIcon />} onClick={() => setIsDrawerOpen(true)} />
        </Box>
      </Flex>
      <Flex>
       
        <Box w={{ base: '100%', md: '25%' }} bg="gray.50" p={4} display={{ base: 'none', md: 'block' }}>
          <Heading size="md" mb={4}>
            My Account
          </Heading>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={ShoppingCartIcon} />
              <Text>My Orders</Text>
            </ListItem>
            <ListItem>
              <ListIcon as={ShoppingCartIcon} />
              <Text>My Cart</Text>
            </ListItem>
            <ListItem>
              <ListIcon as={ExitToAppIcon} />
              <Text onClick={handleLogout}>Log Out</Text>
            </ListItem>
            <ListItem>
              <ListIcon as={CakeIcon} />
              <Text>My Profile</Text>
            </ListItem>
          </List>
        </Box>
       
        <Box w={{ base: '100%', md: '75%' }} p={4}>
          <Heading size="md" mb={4}>
            My Profile
          </Heading>
          
          <Stack spacing={4}>
            <FormControl id="firstName">
              <FormLabel>First Name</FormLabel>
              <Input type="text" value={firstName} isReadOnly onChange={(e) => setFirstName(e.target.value)} />
            </FormControl>
            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input type="text" value={lastName} isReadOnly onChange={(e) => setLastName(e.target.value)} />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} isReadOnly onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="birthday">
              <FormLabel>Birthday</FormLabel>
              <Flex alignItems="center">
                <CakeIcon size={20} />
                <Input type="date" value={birthday} isReadOnly onChange={(e) => setBirthday(e.target.value)} ml={2} />
              </Flex>
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Flex alignItems="center">
                <Input type="password" value={password} isReadOnly onChange={(e) => setPassword(e.target.value)} mr={2} />
                <IconButton
                  aria-label="Change Password"
                  icon={<LockIcon />}
                  onClick={handlePasswordChange}
                  variant="outline"
                  isDisabled
                />
              </Flex>
              <FormHelperText>Leave blank to keep the same password</FormHelperText>
            </FormControl>
            <FormControl id="bonus">
              <FormLabel>Collected Bonus</FormLabel>
              <Input type="number" value={bonus} isReadOnly onChange={(e) => setBonus(e.target.value)} />
            </FormControl>
            <FormControl id="image">
              <FormLabel>Profile Image</FormLabel>
              <Flex alignItems="center">
                <Avatar size="xl" name={`${firstName} ${lastName}`} src={image} mr={4} />
                <IconButton
                  aria-label="Upload Image"
                  icon={<AddAPhotoIcon />}
                  onClick={handleImageUpload}
                  variant="outline"
                  isDisabled
                />
              </Flex>
            </FormControl>
          </Stack>
        </Box>
      </Flex>
      <Drawer placement="left" isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
  <DrawerOverlay />
  <DrawerContent>
    <DrawerCloseButton />
    <DrawerHeader>
      <Avatar size="lg" name={`${firstName} ${lastName}`} src={image} />
      <Box ml={4}>
        <Text fontWeight="bold">{`${firstName} ${lastName}`}</Text>
        <Text fontSize="sm">{email}</Text>
        <Text fontSize="sm">{`Bonus: ${bonus}`}</Text>
      </Box>
      <Box ml="auto">
        <IconButton aria-label="Edit Profile" icon={<EditIcon />} onClick={handleEditProfile} />
      </Box>
    </DrawerHeader>
    <DrawerBody>
      <List spacing={3}>
        <ListItem>
          <ListIcon as={ShoppingCartIcon} />
          <Text>My Orders</Text>
        </ListItem>
        <ListItem>
          <ListIcon as={ShoppingCartIcon} />
          <Text>My Cart</Text>
        </ListItem>
        <ListItem>
          <ListIcon as={ExitToAppIcon} />
          <Text onClick={handleLogout}>Log Out</Text>
        </ListItem>
        <ListItem>
          <ListIcon as={CakeIcon} />
          <Text>My Profile</Text>
        </ListItem>
      </List>
    </DrawerBody>
  </DrawerContent>
</Drawer>
    </Box>
  );
};

export default CustomerProfile;