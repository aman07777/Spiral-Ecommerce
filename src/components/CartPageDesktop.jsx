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
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import DeleteIcon from "@mui/icons-material/Delete";
import { useMediaQuery } from "@chakra-ui/react";
import { useUserContext } from "../contexts/UserContext";
import { imageUrl } from "../global/config";
import { cartStore } from "../services/CartStore";
import { Link } from "react-router-dom";

function CartPageDesktop() {
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isDesktop] = useMediaQuery("(min-width: 968px)");
  const getAllCarts = cartStore((state) => state.getAllCarts);
  const deleteCart = cartStore((state) => state.removeCart);

  const toast = useToast();

  const { currentUser } = useUserContext();

  useEffect(() => {
    getAllCarts()
      .then((data) => {
        if (data.length === 0) {
          toast({
            title: "Cart is empty",
            description: "Please add some products to cart.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
        setCartItems(data);
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
  }, [currentUser, toast]);

  const handleQuantityChange = (event, index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].selectedQuantity = parseInt(event.target.value);
    setCartItems(newCartItems);
  };

  const handleRemoveCartItem = async (productId) => {
    try {
      await deleteCart(productId);
      toast({
        title: "Product removed",
        description: "Product removed from cart successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      getAllCarts().then((data) => {
        setCartItems(data);
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred.";
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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

  const subtotal = cartItems?.reduce(
    (total, item) =>
      total + (item.isChecked ? item.price * item.selectedQuantity : 0),
    0
  );
  const discount = subtotal * 0.1;
  const grandTotal = subtotal - discount;

  return (
    <>
      {!isLoading ? (
        <Flex direction="column" p={4}>
          <Flex
            direction={
              isDesktop ? ["column", "column", "row"] : { base: "column" }
            }
            mb={4}
          >
            <Box flex={1} className="">
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow={isDesktop ? "md" : ""}
                className="h-[100%] sm:mb-5"
              >
                {selectAll ? (
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={handleDeleteAll}
                    borderRadius="0.5rem"
                    m={5}
                  >
                    DeleteAll
                  </Button>
                ) : null}
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>
                        <Checkbox
                          isChecked={selectAll}
                          onChange={handleSelectAll}
                          borderRadius="full"
                          className={!isDesktop && "ml-[-7px]"}
                        />
                        <span className={`ml-3 ${isDesktop ? "hidden" : ""}`}>
                          select all
                        </span>
                      </Th>
                      {isDesktop && (
                        <>
                          <Th>Product</Th>
                          <Th>Quantity</Th>
                          <Th>Price</Th>
                          <Th>Actions</Th>
                        </>
                      )}
                    </Tr>
                  </Thead>
                  {isDesktop ? (
                    <>
                      <Tbody className="">
                        {cartItems?.map((product, index) => (
                          <Tr key={index}>
                            <Td>
                              <Checkbox
                                isChecked={product.isChecked}
                                onChange={(event) =>
                                  handleSelectItem(event, index)
                                }
                              />
                            </Td>
                            <Td className="bg-blue-300">
                              <Link
                                to={`/products/${product?.id}`}
                                state={{
                                  product: {
                                    color: product.color,
                                    size: product.size,
                                  },
                                }}
                              >
                                <ul className="flex items-center w-[100%] py-4 gap-x-2">
                                  {/* product image  */}
                                  <li className="bg-blue-400 w-[40%]">
                                    <img
                                      src={`${imageUrl}/${product.image}`}
                                      className="rounded-md h-[3rem] w-[4rem]"
                                      alt={product?.name}
                                    />
                                  </li>
                                  {/* product desc  */}
                                  <li className="flex flex-col gap-y-1 w-[60%]">
                                    <span className="text-lg font-bold line-clamp-2">
                                      {product.name}
                                    </span>
                                    <span className="text-xs font-semibold line-clamp-2">
                                      {product.description}
                                    </span>
                                    <span className="flex text-xs gap-x-1">
                                      {" "}
                                      <span className="font-semibold">
                                        Size:
                                      </span>{" "}
                                      {product.size}
                                    </span>
                                    <span className="flex text-xs gap-x-1 ">
                                      <span className="font-semibold">
                                        Color:
                                      </span>
                                      {product.color ? product.color : "Yellow"}
                                    </span>
                                  </li>
                                </ul>
                              </Link>
                            </Td>
                            <Td>
                              <Flex
                                direction={
                                  isDesktop
                                    ? ["column", "column", "row"]
                                    : "row"
                                }
                                align={
                                  isDesktop
                                    ? ["flex-start", "flex-start", "center"]
                                    : "center"
                                }
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
                                  readOnly
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
                            <Td>
                              <span className="font-serif text-sm">
                                Rs. {product?.selectedQuantity * product.price}
                              </span>
                            </Td>
                            <Td>
                              <Button
                                onClick={() => handleRemoveCartItem(product.id)}
                              >
                                <DeleteIcon className="text-red-600" />
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </>
                  ) : (
                    <>
                      {cartItems.map((item, index) => (
                        <Box
                          key={index}
                          borderWidth="1px"
                          borderRadius="lg"
                          overflow="hidden"
                          boxShadow="md"
                          mb={4}
                        >
                          <Flex direction="column" className="p-4">
                            <Flex
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              className=""
                            >
                              <Box pb={20}>
                                <Checkbox
                                  isChecked={item.isChecked}
                                  onChange={(event) =>
                                    handleSelectItem(event, index)
                                  }
                                />
                              </Box>
                              <Link
                                to={`/products/${item?.id}`}
                                state={{
                                  product: {
                                    color: item.color,
                                    size: item.size,
                                  },
                                }}
                              >
                                <ul className="flex gap-x-3 w-[100%] items-center space-around p-3">
                                  {/* image  */}
                                  <li className="w-[30%]">
                                    <img
                                      src={`${imageUrl}/${item.image}`}
                                      className="object-cover w-[3.5rem] rounded-md"
                                      alt=""
                                    />
                                  </li>
                                  {/* product desc  */}
                                  <li className="flex flex-col gap-y-1">
                                    <span className="text-lg font-bold line-clamp-2">
                                      {item.name}
                                    </span>
                                    <span className="text-xs font-semibold line-clamp-3">
                                      {item.description}
                                    </span>
                                    <span className="flex text-xs gap-x-1">
                                      {" "}
                                      <span className="font-semibold">
                                        Size:
                                      </span>{" "}
                                      {item.size}
                                    </span>
                                    <span className="flex text-xs gap-x-1 ">
                                      <span className="font-semibold">
                                        Color:
                                      </span>
                                      {item.color ? item.color : "Yellow"}
                                    </span>
                                  </li>
                                </ul>
                              </Link>
                              <button
                                onClick={() => handleRemoveCartItem(item.id)}
                              >
                                <DeleteIcon className="text-red-600" />
                              </button>
                            </Flex>
                            <Flex
                              direction="row"
                              justifyContent="space-between"
                              alignItems="center"
                              p={2}
                            >
                              <Box>
                                <Text className="mb-2 font-serif text-sm">
                                  Quantity:
                                </Text>
                                <Flex direction="row" alignItems="center">
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      if (item?.selectedQuantity > 0) {
                                        handleQuantityChange(
                                          {
                                            target: {
                                              value: item.selectedQuantity - 1,
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
                                    readOnly
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleQuantityChange(
                                        {
                                          target: {
                                            value: item.selectedQuantity + 1,
                                          },
                                        },
                                        index
                                      )
                                    }
                                  >
                                    +
                                  </Button>
                                </Flex>
                              </Box>
                              <Box>
                                <Text className="mb-2 font-serif text-sm">
                                  Price:
                                </Text>
                                <span className="text-sm font-semibold">
                                  Rs. {item?.selectedQuantity * item.price}
                                </span>
                              </Box>
                            </Flex>
                          </Flex>
                        </Box>
                      ))}
                    </>
                  )}
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
                      <Text className="">Rs.{subtotal.toFixed(2)}</Text>
                    </Flex>
                  </Box>
                  <Box mb={4}>
                    <Flex direction="row" justifyContent="space-between">
                      <Text>Discount:</Text>
                      <Text className="">Rs.{discount.toFixed(2)}</Text>
                    </Flex>
                  </Box>
                  <Box mb={4}>
                    <Flex direction="row" justifyContent="space-between">
                      <Text fontWeight="bold">Total:</Text>
                      <Text fontWeight="bold" className="">
                        Rs.{grandTotal.toFixed(2)}
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
                      className="py-4"
                    />
                    <Box mt={5}>
                      <Button
                        size="sm"
                        borderRadius="0.5rem"
                        bg="white"
                        color="black"
                        _hover={{ bg: "black", color: "white" }}
                        className=""
                      >
                        Apply Voucher
                      </Button>
                    </Box>
                    <Box p={2}>
                      <button
                        className="px-6 py-2 rounded-md  font-semibold bg-[#3182ce] text-white md:ml-[-7.5px]"
                        onClick={handleCheckout}
                      >
                        Checkout now
                      </button>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </Flex>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default CartPageDesktop;
