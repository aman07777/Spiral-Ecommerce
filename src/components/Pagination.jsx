import React, { useState, useEffect } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const [pageButtons, setPageButtons] = useState([]);

  useEffect(() => {
    const generatePageButtons = () => {
      const buttons = [];
      const maxButtons = 5;
      const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
      const endPage = Math.min(totalPages, startPage + maxButtons - 1);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(i);
      }

      setPageButtons(buttons);
    };

    generatePageButtons();
  }, [currentPage, totalPages, onPageChange]);

  const handlePageClick = (page) => {
    const newPage = Math.max(1, Math.min(page, totalPages)); // Ensure page is within valid range
    onPageChange(newPage);
  };

  return (
    <Flex direction="row" justifyContent="center" alignItems="center" mt={4}>
      <Button
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
        mr={2}
        colorScheme="blue"
      >
        Previous
      </Button>
      {pageButtons.map((page) => (
        <Button
          key={page}
          onClick={() => handlePageClick(page)}
          mr={2}
          colorScheme={currentPage === page ? 'blue' : 'gray'}
        >
          {page}
        </Button>
      ))}
      <Button
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
        colorScheme="blue"
      >
        Next
      </Button>
      <Box ml={4}>
        <Text fontSize="lg">
          Page {currentPage} of {totalPages}
        </Text>
      </Box>
    </Flex>
  );
}

export default Pagination;