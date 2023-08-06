import React, { useState } from 'react';
import { Flex, Box, Heading, Button, Table, Thead, Tbody, Tr, Th, Td, Checkbox, Input, Image,Text,} from '@chakra-ui/react';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Product 1',
      image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
      price: 10,
      quantity: 1,
      isChecked: true,
      size: 'M',
      color: 'Red',
    },
    {
      id: 2,
      name: 'Product 2',
      image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
      price: 20,
      quantity: 2,
      isChecked: true,
      size: 'L',
      color: 'Blue',
    },
    {
      id: 3,
      name: 'Product 3',
      image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
      price: 30,
      quantity: 3,
      isChecked: true,
      size: 'S',
      color: 'Green',
    },
  ]);

  const [selectAll, setSelectAll] = useState(true);

  const handleQuantityChange = (event, index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = parseInt(event.target.value);
    setCartItems(newCartItems);
  };

  const handleRemoveItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const handleSelectAll = (event) => {
    const newCartItems = cartItems.map((item) => ({ ...item, isChecked: event.target.checked }));
    setCartItems(newCartItems);
    setSelectAll(event.target.checked);
  };

  const handleSelectItem = (event, index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].isChecked = event.target.checked;
    setCartItems(newCartItems);
    setSelectAll(newCartItems.every((item) => item.isChecked));
  };

  const handleCheckout = () => {
    // ...
  };

  const handleDeleteAll = () => {
    const newCartItems = cartItems.filter((item) => !item.isChecked);
    setCartItems(newCartItems);
    setSelectAll(false);
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.isChecked ? item.price * item.quantity : 0), 0);
  const discount = subtotal * 0.1;
  const grandTotal = subtotal - discount;

  return (
    <>
    <Navbar/>
      <Flex direction="column" p={4}>
        {/* <Heading as="h1" size="xl" mb={4}>
          Shopping Cart
        </Heading> */}
        <Flex direction={["column", "column", "row"]} mb={4}>
          <Box flex={1}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
              <Table variant="simple">
                <Thead>
                {selectAll ? 
              <Button colorScheme="red" size="sm" onClick={handleDeleteAll} isFullWidth borderRadius="0.5rem" m={5}>
               DeleteAll
              </Button>:null}
                  <Tr>
                    <Th >
                      <Checkbox isChecked={selectAll} onChange={handleSelectAll} borderRadius="full" />
                    </Th>
                    <Th>Product</Th>
                    <Th>Quantity</Th>
                    <Th>Price</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {cartItems.map((item, index) => (
                    <Tr key={item.id}>
                      <Td>
                        <Checkbox isChecked={item.isChecked} onChange={(event) => handleSelectItem(event, index)} />
                      </Td>
                      <Td>
                        <Flex align="center">
                          <Image src={item.image} alt="Product Image" boxSize={["30px", "30px", "50px"]} mr={4} borderRadius="0.5rem" />
                          <Box>
                            <Text fontWeight="bold">{item.name}</Text>
                            <Text fontSize={["sm", "sm", "md"]} color="gray.500">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </Text>
                            <Text>Size {item.size}</Text>
                            <Text>Color {item.color}</Text>
                          </Box>
                        </Flex>
                      </Td>
                      <Td>
                        <Flex direction={["column", "column", "row"]} align={["flex-start", "flex-start", "center"]}>
                          <Button size="sm" onClick={() => handleQuantityChange({ target: { value: item.quantity - 1 } }, index)}>-</Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(event) => handleQuantityChange(event, index)}
                            min={1}
                            max={10}
                            size="sm"
                            w={["50px", "50px", "70px"]}
                            mx={2}
                            borderRadius="0.5rem"
                            border="1px solid black"
                            color="black"
                            bg="white"
                          />
                          <Button size="sm" onClick={() => handleQuantityChange({ target: { value: item.quantity + 1 } }, index)}>+</Button>
                        </Flex>
                      </Td>
                      <Td>${item.price}</Td>
                      <Td>
                        <Button colorScheme="red" size="sm" onClick={() => handleRemoveItem(index)} borderRadius="2rem">
                          <DeleteIcon />
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table> 
            </Box>
          </Box>
          <Box w={["100%", "100%", "300px"]} ml={[0, 0, 4]}>
            <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
              <Flex direction="column">
                <Box mb={4}>
                  <Text fontSize="xl" fontWeight="bold">
                    Order Summary
                  </Text>
                </Box>
                <Box mb={4}>
                  <Flex direction="row" justifyContent="space-between">
                    <Text>Subtotal:</Text>
                    <Text>${subtotal.toFixed(2)}</Text>
                  </Flex>
                </Box>
                <Box mb={4}>
                  <Flex direction="row" justifyContent="space-between">
                    <Text>Discount:</Text>
                    <Text>${discount.toFixed(2)}</Text>
                  </Flex>
                </Box>
                <Box mb={4}>
                  <Flex direction="row" justifyContent="space-between">
                    <Text fontWeight="bold">Total:</Text>
                    <Text fontWeight="bold">${grandTotal.toFixed(2)}</Text>
                  </Flex>
                </Box>
                <Flex direction="column" >

                    <Input type="text" placeholder="Enter voucher code" size="sm" borderRadius="0.5rem" border="1px solid black" color="black" bg="white" />
                    <Box mt={5}>
                    <Button size="sm"
                  borderRadius="0.5rem"
                  bg="white"
                  color="black"
                   _hover={{ bg: 'black', color: 'white' }}>
                      Apply Voucher
                    </Button>
                    </Box>
                    <Box p={2}>
                  <Button colorScheme="blue" size="lg" onClick={handleCheckout} isFullWidth borderRadius="0.5rem" width={["100%", "100%", "16vw"]}  >
                    Checkout now
                  </Button>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Flex>
      <Footer/>
    </>
  );
}

export default CartPage;