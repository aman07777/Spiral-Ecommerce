import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Button,
  Checkbox,
  Input,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import DeleteIcon from "@mui/icons-material/Delete";
import { getCart, removeCartItem } from "../services/CartServices";
import { useUserContext } from "../contexts/UserContext";
import { imageUrl } from "../global/config";

function CartPageMobile() {
  const [cartItems, setCartItems] = useState([]);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState(true);
  const [isDeleteAllVisible, setIsDeleteAllVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);



  const toast = useToast();

  const { currentUser } = useUserContext();



  // getting the cart items  
  useEffect(() => {
    getCart(currentUser)
      .then((result) => {
        if (result.data.cart.length === 0) {
          toast({
            title: "Cart is empty",
            description: "Please add some products to cart.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
        setCartItems(result.data.cart);
        console.log(result.data.cart)
        setIsLoading(false);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "An error occurred.";
        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  }, [toast, currentUser]);

  const handleQuantityChange = (event, index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].selectedQuantity = parseInt(event.target.value);
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
    (total, item) => total + (item.isChecked ? item.price * item.selectedQuantity : 0),
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
                      src={`${imageUrl}/${item.image}`}
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
                          onClick={() => {
                            if (item?.selectedQuantity > 0) {
                              handleQuantityChange(
                                { target: { value: item.selectedQuantity - 1 } },
                                index
                              )
                            }
                          }}
                        >
                          -
                        </Button>
                        <Input
                          type="number"
                          value={item.selectedQuantity}
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
                              { target: { value: item.selectedQuantity + 1 } },
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
                      <Text>${item?.selectedQuantity * item.price}</Text>
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
