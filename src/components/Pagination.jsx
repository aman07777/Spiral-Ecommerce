import React, { useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const [pageButtons, setPageButtons] = useState([]);

  // Generate an array of page numbers to display as buttons
  // Only show up to 5 page buttons at a time
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

  // Handle clicking on a page button
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  // Generate the page buttons when the component mounts or when the currentPage changes
  React.useEffect(() => {
    generatePageButtons();
  }, [currentPage]);

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
        ml={2}
        colorScheme="blue"
      >
        Next
      </Button>
      <Box ml={4}>
        <Text fontSize="sm">
          Page {currentPage} of {totalPages}
        </Text>
      </Box>
    </Flex>
  );
}

export default Pagination;