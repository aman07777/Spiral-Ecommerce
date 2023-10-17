import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Text,
  Flex,
  Button,
  Stack,
  List,
  ListItem,
  useToast,
} from "@chakra-ui/react";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useUserContext } from "../../../../contexts/UserContext";
import { handleToast } from "../../../../global/toast";
import { cartStore } from "../../../../services/CartStore";
import { useBuyStore } from "../../order-details/components/store";

const DetailsSection = ({ product }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { currentUser } = useUserContext();
  const { state } = useLocation();
  const colorCart = state?.product.color;
  const sizeCart = state?.product.size;
  const sQuantity = state?.product.sQuantity;
  // stores
  const setOrderItems = useBuyStore((state) => state.setOrderItems);
  const orderItems = useBuyStore((state) => state.orderItems);
  // states
  const [selectedSize, setSelectedSize] = useState(
    sizeCart || product?.sizes[0]
  );
  const [selectedColor, setSelectedColor] = useState(
    colorCart || product?.colors[0]
  );
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const handleQuantityChange = (event) => {
    let newQuantity = parseInt(event.target.value);
    console.log(typeof newQuantity);
    const maxQuantity = sQuantity
      ? product?.quantity - sQuantity
      : product.quantity;

    if (newQuantity > maxQuantity) {
      newQuantity = maxQuantity;
    } else if (newQuantity < 1) {
      newQuantity = 1;
    }

    setSelectedQuantity(newQuantity); // Update the state with the new quantity
  };

  const addProductTocart = cartStore((state) => state.addToCart);

  const handleIncreaseQuantity = () => {
    const maxQuantity = sQuantity
      ? product?.quantity - sQuantity
      : product.quantity;
    if (selectedQuantity < maxQuantity) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!currentUser) return navigate("/login");
    try {
      const data = {
        productId: product._id,
        quantity: selectedQuantity,
        color: selectedColor,
        size: selectedSize,
      };
      if (sQuantity && product?.quantity - (sQuantity + selectedQuantity) < 0) {
        handleToast(toast, "Error", "product is out of stocks", "error");
      } else {
        const res = await addProductTocart(data);
        if (res.status === "success") {
          handleToast(toast, "Success", "Product added to cart.", "success");
        } else {
          handleToast(toast, "Error", "product is out of stocks", "error");
        }
      }
    } catch (error) {
      handleToast(
        toast,
        "Error",
        error.res?.data?.message || "An error occurred.",
        "error"
      );
    }
  };
  // handles excess quantity -> if the user want to buy the same product with same color and size
  // and the quantity is more than the available quantity then it will show error
  const handleExcessBuyQuantity = () => {
    let count = 0;
    Array.isArray(orderItems) &&
      orderItems.forEach((item) => {
        if (item.product === product._id) count += item.quantity;
      });
    if (count >= product.quantity) {
      handleToast(
        toast,
        "Error",
        "You can't add more than available quantity",
        "error"
      );
      return false;
    }
    return true;
  };
  // handles buy now click -> if the user want to buy the same product with same color and size the quantity is increased by the selected quantity else it will add the product(another variant) to the orderItems
  const handleBuyClick = (e) => {
    e.preventDefault();
    if (!handleExcessBuyQuantity()) return;
    const data = {
      product: product._id,
      quantity: selectedQuantity,
      purchasePrice: 0,
      totalPrice: 0,
      size: selectedSize,
      color: selectedColor,
      image: product?.images[0],
      name: product?.name,
      discount: product?.discount,
      price: product?.price,
      available: product?.quantity,
    };
    if (
      Array.isArray(orderItems) &&
      orderItems.some(
        (item) => item.size === selectedSize && item.color === selectedColor
      )
    )
      if (
        orderItems.find((item) => item.product === data.product).quantity +
          selectedQuantity >
        product.quantity
      )
        orderItems.find((item) => item.product === data.product).quantity =
          product.quantity;
      else
        orderItems.find((item) => item.product === data.product).quantity +=
          selectedQuantity;
    else setOrderItems(data);
    navigate(`/place/order`);
  };

  return (
    <>
      <Box maxWidth="800px" className="flex-1 text-gray-600">
        <Box
          className="flex flex-col justify-between"
          ml={{ base: 0, md: "2rem" }}
        >
          <Box as={"header"}>
            <h1 className="font-semibold text-[1.75rem]">{product.name}</h1>
            <Text className="text-[.9rem] font-semibold">
              {product.description}
            </Text>
            <Text className="mt-2 font-semibold text-[1.3rem]">
              {product.price - (product.discount / 100) * product.price} NPR
            </Text>
            <div className="mt-1 font-medium text-[.9rem] flex gap-x-3">
              <span className="text-red-500 line-through">
                {product.price} NPR
              </span>
              <span className="text-green-500">{product.discount}% off</span>
            </div>
          </Box>

          <Text
            fontSize={{ base: "16px", lg: "18px" }}
            fontWeight={"500"}
            textTransform={"uppercase"}
            mt={4}
          >
            Product Details
          </Text>

          <List mt={3} className="flex gap-x-[3em]">
            <ListItem className="flex flex-col gap-y-2">
              <Text fontWeight={"bold"}>Brand:</Text>
              <Text fontWeight={"bold"}>Category:</Text>
              <Text fontWeight={"bold"}>Colors:</Text>
              <Text fontWeight={"bold"}>Sizes:</Text>
            </ListItem>
            <ListItem className="flex flex-col gap-y-2">
              <Text>{product.category}</Text>
              <Text>{product.brand}</Text>
              <div className="flex gap-x-2">
                {product.colors.map((color, index) => (
                  <Box
                    key={index}
                    display="inline-block"
                    w="20px"
                    h="20px"
                    borderRadius="50%"
                    bg={color}
                    mx="2px"
                    onClick={() => {
                      setSelectedColor(color);
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                    className={`${
                      selectedColor === color &&
                      "relative before:h-full before:w-full before:absolute before:inset-0 before:content-[''] before:scale-[1.25] before:bg-transparent before:border before:border-[#585858] before:z-[-1] isolate before:rounded-full"
                    }`}
                  ></Box>
                ))}
              </div>
              <div className="">
                {product.sizes.map((size, index) => (
                  <Box
                    key={index}
                    display="inline-block"
                    bg={selectedSize === size ? "gray.500" : "gray.200"}
                    color={selectedSize === size ? "white" : "black"}
                    px={2}
                    py={1}
                    borderRadius="0.5rem"
                    mx="2px"
                    onClick={() => setSelectedSize(size)}
                    style={{ cursor: "pointer" }}
                  >
                    {size}
                  </Box>
                ))}
              </div>
            </ListItem>
          </List>
          <div className="flex gap-x-[3em] mt-5 items-center">
            <Text fontWeight={"bold"}>Quantity:</Text>
            <div className="flex items-center gap-x-2">
              <Button
                size="sm"
                rounded="full"
                onClick={handleDecreaseQuantity}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                -
              </Button>
              {product && (
                <input
                  type="number"
                  min="1"
                  max={
                    sQuantity ? product?.quantity - sQuantity : product.quantity
                  }
                  value={selectedQuantity}
                  onChange={(e) => handleQuantityChange(e)}
                  disabled
                  style={{
                    width: "50px",
                    textAlign: "center",
                    borderRadius: "0.5rem",
                  }}
                  className=""
                />
              )}
              <Button
                size="sm"
                rounded="full"
                onClick={handleIncreaseQuantity}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
              >
                +
              </Button>
            </div>
          </div>
          <span className="text-xs text-red-500">
            {(sQuantity
              ? product?.quantity - (sQuantity + selectedQuantity)
              : product?.quantity - selectedQuantity) <= 0
              ? "No quantity left"
              : `${
                  sQuantity
                    ? product?.quantity - (sQuantity + selectedQuantity)
                    : product?.quantity - selectedQuantity
                } quantity left`}
          </span>

          <Stack direction="row" mt={3} className="text-green-700">
            <LocalShippingIcon />
            <Text>2-3 business days delivery</Text>
          </Stack>

          <Flex gap={5} mt={5}>
            <Button
              colorScheme="linkedin"
              onClick={handleAddToCart}
              className="w-[10em] h-[1.5em] uppercase"
            >
              Add to cart
            </Button>
            <Button
              colorScheme="linkedin"
              className="w-[10em] py-4 uppercase"
              onClick={(e) => handleBuyClick(e)}
            >
              Buy now
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default DetailsSection;
