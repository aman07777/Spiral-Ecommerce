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

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex as="nav" bg="blue.600" p={4} align="center">
        <IconButton
          colorScheme="whiteAlpha"
          icon={<Menu />}
          display={{ base: 'block', md: 'none' }}
          onClick={onOpen}
          aria-label="Open sidebar"
        />
        <Text fontSize="xl" fontWeight="bold" color="white">
          Admin Dashboard
        </Text>
        <Spacer />
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
                <Box as="button" w="100%" textAlign="left">
                  <Icon as={Home} mr={2} />
                  <Text>Home</Text>
                </Box>
                <Box as="button" w="100%" textAlign="left">
                  <Icon as={ShoppingCart} mr={2} />
                  <Text>Products</Text>
                </Box>
                <Box as="button" w="100%" textAlign="left">
                  <Icon as={LocalMall} mr={2} />
                  <Text>Orders</Text>
                </Box>

                <Box as="button" w="100%" textAlign="left">
                  <Icon as={People} mr={2} />
                  <Text>Customers</Text>
                </Box>
                
                <Box as="button" w="100%" textAlign="left">
                  <Icon as={Assignment} mr={2} />
                  <Text>Affliators</Text>
                </Box>
                <Box as="button" w="100%" textAlign="left">
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

export default Sidebar;
