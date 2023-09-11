import React, { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Button,
  Checkbox,
  Input,
  Image,
  Text,
} from "@chakra-ui/react";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "./Navbar";
import Footer from "./Footer";

function CartPageMobile() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      price: 10,
      quantity: 1,
      isChecked: true,
      size: "M",
      color: "Red",
    },
    {
      id: 2,
      name: "Product 2",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      price: 20,
      quantity: 2,
      isChecked: true,
      size: "L",
      color: "Blue",
    },
    {
      id: 3,
      name: "Product 3",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      price: 30,
      quantity: 3,
      isChecked: true,
      size: "S",
      color: "Green",
    },
    {
      id: 4,
      name: "Product 4",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
      price: 10,
      quantity: 1,
      isChecked: true,
      size: "M",
      color: "Red",
    },
  ]);

  const [isSelectAllChecked, setIsSelectAllChecked] = useState(true);
  const [isDeleteAllVisible, setIsDeleteAllVisible] = useState(true);

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
    const newCartItems = cartItems.map((item) => ({
      ...item,
      isChecked: event.target.checked,
    }));
    setCartItems(newCartItems);
    setIsSelectAllChecked(event.target.checked);
    setIsDeleteAllVisible(event.target.checked);
  };

  const handleSelectItem = (event, index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].isChecked = event.target.checked;
    setCartItems(newCartItems);
    setIsSelectAllChecked(newCartItems.every((item) => item.isChecked));
    setIsDeleteAllVisible(
      newCartItems.filter((item) => item.isChecked).length ===
        newCartItems.length
    );
  };

  const handleCheckout = () => {
    //...
  };

  const handleDeleteAll = () => {
    const newCartItems = cartItems.filter((item) => !item.isChecked);
    setCartItems(newCartItems);
    setIsSelectAllChecked(false);
    setIsDeleteAllVisible(false);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.isChecked ? item.price * item.quantity : 0),
    0
  );
  const discount = subtotal * 0.1;
  const grandTotal = subtotal - discount;

  return (
    <>
      <Flex direction={{ base: "column", md: "row" }} p={4}>
        <Flex
          direction="column"
          mb={4}
          mr={{ md: 4 }}
          flex={{ base: "none", md: 1 }}
        >
          <Flex direction="column">
            <Flex
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Checkbox
                isChecked={isSelectAllChecked}
                onChange={handleSelectAll}
              >
                Select All
              </Checkbox>
              {isDeleteAllVisible && (
                <Button colorScheme="red" size="sm" onClick={handleDeleteAll}>
                  Delete All
                </Button>
              )}
            </Flex>
            {cartItems.map((item, index) => (
              <Box
                key={item.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                mb={4}
              >
                <Flex direction="column">
                  <Flex
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    p={2}
                  >
                    <Box pb={20}>
                      <Checkbox
                        isChecked={item.isChecked}
                        onChange={(event) => handleSelectItem(event, index)}
                      />
                    </Box>
                    <Image
                      src={item.image}
                      alt="Product Image"
                      boxSize="50px"
                      mr={4}
                      borderRadius="0.5rem"
                    />
                    <Box>
                      <Text fontWeight="bold">{item.name}</Text>
                      <Text fontSize="sm" color="gray.500">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </Text>
                      <Text>Size {item.size}</Text>
                      <Text>Color {item.color}</Text>
                    </Box>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleRemoveItem(index)}
                      borderRadius="2rem"
                    >
                      <DeleteIcon />
                    </Button>
                  </Flex>
                  <Flex
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    p={2}
                  >
                    <Box>
                      <Text>Quantity:</Text>
                      <Flex direction="row" alignItems="center">
                        <Button
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(
                              { target: { value: item.quantity - 1 } },
                              index
                            )
                          }
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(event) =>
                            handleQuantityChange(event, index)
                          }
                          min={1}
                          max={10}
                          size="sm"
                          w="50px"
                          mx={2}
                          borderRadius="0.5rem"
                          border="1px solid black"
                          color="black"
                          bg="white"
                        />
                        <Button
                          size="sm"
                          onClick={() =>
                            handleQuantityChange(
                              { target: { value: item.quantity + 1 } },
                              index
                            )
                          }
                        >
                          +
                        </Button>
                      </Flex>
                    </Box>
                    <Box>
                      <Text>Price:</Text>
                      <Text>${item.price}</Text>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            ))}
            {cartItems.length === 0 && (
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                p={2}
                textAlign="center"
              >
                Your cart is empty
              </Box>
            )}
          </Flex>
        </Flex>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
          boxShadow="md"
          width={{ base: "none", md: "27vw" }}
        >
          <Flex direction="column">
            <Box mb={2}>
              <Text fontSize="md" fontWeight="bold">
                Order Summary
              </Text>
            </Box>
            <Box mb={2}>
              <Flex direction="row" justifyContent="space-between">
                <Text fontSize="sm">Subtotal:</Text>
                <Text fontSize="sm">${subtotal.toFixed(2)}</Text>
              </Flex>
            </Box>
            <Box mb={2}>
              <Flex direction="row" justifyContent="space-between">
                <Text fontSize="sm">Discount:</Text>
                <Text fontSize="sm">${discount.toFixed(2)}</Text>
              </Flex>
            </Box>
            <Box mb={2}>
              <Flex direction="row" justifyContent="space-between">
                <Text fontSize="md" fontWeight="bold">
                  Total:
                </Text>
                <Text fontSize="md" fontWeight="bold">
                  ${grandTotal.toFixed(2)}
                </Text>
              </Flex>
            </Box>

            <Flex direction="column">
              <Input
                type="text"
                placeholder="Enter voucher code"
                size="sm"
                borderRadius="0.5rem"
                border="1px solid black"
                color="black"
                bg="white"
                mb={2}
              />
              <Button
                size="sm"
                borderRadius="0.5rem"
                bg="white"
                color="black"
                _hover={{ bg: "black", color: "white" }}
                mb={2}
              >
                Apply Voucher
              </Button>
              <Button
                colorScheme="blue"
                size="lg"
                onClick={handleCheckout}
                isFullWidth
                borderRadius="0.5rem"
              >
                Checkout now
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </>
  );
}

export default CartPageMobile;
