import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Input,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";

import DeleteIcon from "@mui/icons-material/Delete";

import { getCart, removeCartItem } from "../services/CartServices";
import { useUserContext } from "../contexts/UserContext";
import Loader from "../components/Loader";
import { imageUrl } from "../global/config";

function CartPageDesktop() {
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  // const [totalQuantity, setTotalQuantity] = useState(0);

  const toast = useToast();

  const { currentUser } = useUserContext();

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

  const handleRemoveCartItem = (productId) => {
    removeCartItem(currentUser, productId)
      .then((result) => {
        toast({
          title: "Product removed",
          description: "Product removed from cart successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        const newCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(newCartItems);
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
  };

  const handleSelectAll = (event) => {
    const newCartItems = cartItems.map((item) => ({
      ...item,
      isChecked: event.target.checked,
    }));
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

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.isChecked ? item.price * item.selectedQuantity : 0),
    0
  );
  const discount = subtotal * 0.1;
  const grandTotal = subtotal - discount;

  return (
    <>
      {!isLoading ? (
        <Flex direction="column" p={4}>
          <Flex direction={["column", "column", "row"]} mb={4}>
            <Box flex={1}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
              >
                <Table variant="simple">
                  <Thead>
                    {selectAll ? (
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={handleDeleteAll}
                        isFullWidth
                        borderRadius="0.5rem"
                        m={5}
                      >
                        DeleteAll
                      </Button>
                    ) : null}
                    <Tr>
                      <Th>
                        <Checkbox
                          isChecked={selectAll}
                          onChange={handleSelectAll}
                          borderRadius="full"
                        />
                      </Th>
                      <Th>Product</Th>
                      <Th>Quantity</Th>
                      <Th>Price</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {cartItems.map((product, index) => (
                      <Tr key={product.id}>
                        <Td>
                          <Checkbox
                            isChecked={product.isChecked}
                            onChange={(event) => handleSelectItem(event, index)}
                          />
                        </Td>
                        <Td>
                          <Flex align="center" className="bg-blue-200">
                            <Image
                              src={`${imageUrl}/${product.image}`}
                              alt="Product Image"
                              boxSize={["30px", "30px", "50px"]}
                              mr={4}
                              borderRadius="0.5rem"
                            />
                            <Box>
                              <Text fontWeight="bold">{product.name}</Text>
                              <Text
                                fontSize={["sm", "sm", "md"]}
                                color="gray.500"
                              >
                                {product.description}
                              </Text>
                              <Text>Size {product.size}</Text>
                              <Text>Color {product.color}</Text>
                            </Box>
                          </Flex>
                        </Td>
                        <Td>
                          <Flex
                            direction={["column", "column", "row"]}
                            align={["flex-start", "flex-start", "center"]}
                          >
                            <Button
                              size="sm"
                              onClick={() => {
                                if (product.selectedQuantity > 0) {
                                  handleQuantityChange(
                                    {
                                      target: {
                                        value: product.selectedQuantity - 1,
                                      },
                                    },
                                    index
                                  );
                                }
                              }}
                            >
                              -
                            </Button>
                            <Input
                              type="number"
                              value={product.selectedQuantity}
                              onChange={(event) =>
                                handleQuantityChange(event, index)
                              }
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
                            <Button
                              size="sm"
                              onClick={() =>
                                handleQuantityChange(
                                  {
                                    target: {
                                      value: product.selectedQuantity + 1,
                                    },
                                  },
                                  index
                                )
                              }
                            >
                              +
                            </Button>
                          </Flex>
                        </Td>
                        <Td>${product?.selectedQuantity * product.price}</Td>
                        <Td>
                          <Button
                            colorScheme="red"
                            size="sm"
                            onClick={() => handleRemoveCartItem(product.id)}
                            borderRadius="2rem"
                          >
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
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                boxShadow="md"
              >
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
                  <Flex direction="column">
                    <Input
                      type="text"
                      placeholder="Enter voucher code"
                      size="sm"
                      borderRadius="0.5rem"
                      border="1px solid black"
                      color="black"
                      bg="white"
                    />
                    <Box mt={5}>
                      <Button
                        size="sm"
                        borderRadius="0.5rem"
                        bg="white"
                        color="black"
                        _hover={{ bg: "black", color: "white" }}
                      >
                        Apply Voucher
                      </Button>
                    </Box>
                    <Box p={2}>
                      <Button
                        colorScheme="blue"
                        size="lg"
                        onClick={handleCheckout}
                        isFullWidth
                        borderRadius="0.5rem"
                        width={["100%", "100%", "16vw"]}
                      >
                        Checkout now
                      </Button>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Flex>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default CartPageDesktop;
