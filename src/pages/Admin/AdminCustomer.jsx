import React, { useState } from 'react';
import { Flex, Box, Heading, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import AdminNavbar from './AdminNavbar';
function AdminCustomer() {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
  };

  return (<>
    <AdminNavbar />
    <Flex direction="column" p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Add a New Customer
      </Heading>
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4}>
        <Box p="6">
          <form onSubmit={handleSubmit}>
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input type="text" placeholder="Enter first name" value={customer.firstName} onChange={(event) => setCustomer({ ...customer, firstName: event.target.value })} />
            </FormControl>
            <FormControl id="lastName" mt={4} isRequired>
              <FormLabel>Last Name</FormLabel>
              <Input type="text" placeholder="Enter last name" value={customer.lastName} onChange={(event) => setCustomer({ ...customer, lastName: event.target.value })} />
            </FormControl>
            <FormControl id="email" mt={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter email" value={customer.email} onChange={(event) => setCustomer({ ...customer, email: event.target.value })} />
            </FormControl>
            <FormControl id="phone" mt={4} isRequired>
              <FormLabel>Phone</FormLabel>
              <Input type="tel" placeholder="Enter phone number" value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} />
            </FormControl>
            <Button type="submit" colorScheme="blue" mt={4}>
              Add Customer
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  </>
  );
}

export default AdminCustomer;