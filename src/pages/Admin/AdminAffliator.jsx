import React, { useState } from 'react';
import { Flex, Box, Heading, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import AdminNavbar from './AdminNavbar';

function AdminAffiliator() {
  const [affiliators, setAffiliators] = useState([]);
  const [affiliator, setAffiliator] = useState({
    firstName: '',
    lastName: '',
    email: '',
    promoCode: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setAffiliators([...affiliators, affiliator]);
    setAffiliator({
      firstName: '',
      lastName: '',
      email: '',
      promoCode: '',
    });
  };

  const generatePromoCode = () => {
    const promoCode = Math.random().toString(36).substring(2, 8);
    setAffiliator({ ...affiliator, promoCode });
  };

  return (
    <>
      <AdminNavbar />
      <Flex direction="column" p={4}>
        <Heading as="h1" size="xl" mb={4}>
          Add a New Affiliator
        </Heading>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4}>
          <Box p="6">
            <form onSubmit={handleSubmit}>
              <FormControl id="firstName" isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter first name"
                  value={affiliator.firstName}
                  onChange={(event) => setAffiliator({ ...affiliator, firstName: event.target.value })}
                />
              </FormControl>
              <FormControl id="lastName" mt={4} isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter last name"
                  value={affiliator.lastName}
                  onChange={(event) => setAffiliator({ ...affiliator, lastName: event.target.value })}
                />
              </FormControl>
              <FormControl id="email" mt={4} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={affiliator.email}
                  onChange={(event) => setAffiliator({ ...affiliator, email: event.target.value })}
                />
              </FormControl>
              <FormControl id="promoCode" mt={4} isRequired>
                <FormLabel>Promo Code</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter promo code"
                  value={affiliator.promoCode}
                  onChange={(event) => setAffiliator({ ...affiliator, promoCode: event.target.value })}
                />
              </FormControl>
              <Button type="button" colorScheme="blue" mt={4} onClick={generatePromoCode}>
                Generate Promo Code
              </Button>
              <Button type="submit" colorScheme="blue" mt={4} ml={4}>
                Add Affiliator
              </Button>
            </form>
          </Box>
        </Box>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4}>
          <Box p="6">
            <Heading as="h2" size="md" mb={4}>
              Added Affiliators
            </Heading>
            {affiliators.length > 0 ? (
              affiliators.map((affiliator, index) => (
                <Box key={index} mb={2}>
                  <Text>
                    {affiliator.firstName} {affiliator.lastName} ({affiliator.email}) - Promo Code: {affiliator.promoCode}
                  </Text>
                </Box>
              ))
            ) : (
              <Text>No affiliators added yet.</Text>
            )}
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default AdminAffiliator;