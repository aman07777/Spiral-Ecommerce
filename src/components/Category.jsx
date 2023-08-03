import React from 'react';
import { Box, Button, Flex, Image, Heading, IconButton } from '@chakra-ui/react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Category = () => {
  const categories = [
    { name: 'Western', imageUrl: 'https://www.pinkvilla.com/images/2022-09/western_dresss_2.jpg' },
    { name: 'Traditional', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_28UUGZNtLiKQxXvAuOBWtlIhZDIQY6GPCQ&usqp=CAU'},
    {name: 'Western', imageUrl: 'https://www.pinkvilla.com/images/2022-09/western_dresss_2.jpg' },
    { name: 'Traditional', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_28UUGZNtLiKQxXvAuOBWtlIhZDIQY6GPCQ&usqp=CAU'},
  ];

  return (
    <Box p={4}  >
         <Heading size="lg" fontWeight="bold">Category</Heading>
      <Flex flexWrap="wrap" justifyContent="center" alignItems="center" mt={10}>
        {categories.map((category) => (
          <Box key={category.name} p={2} textAlign="center" position="relative" >
            <Box mb={2} border="1px solid #ccc" borderRadius="10px" overflow="hidden" boxShadow="2xl" >
              <Image src={category.imageUrl} alt={category.name} borderRadius="md" boxSize="300px" />
            </Box>
            <Button
              position="absolute"
              bottom={20}
              left={20}
              right={0}
              width="50%"
              colorScheme="blackAlpha"
              variant="solid"
              py={1}
              px={1}
            >
              {category.name}
              <IconButton
                icon={<ArrowForwardIcon />}
                ml={2}
                aria-label="Category Arrow"
                size="sm"
                variant="ghost"
              />
            </Button>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Category;
