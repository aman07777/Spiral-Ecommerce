import React, { useState, useEffect } from "react";
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

  
  const handleQuantityChange = (e) => {
    setSelectedQuantity(+e.target.value);
  };
  const addProductTocart = cartStore((state) => state.addToCart);

  const handleIncreaseQuantity = (e) => {
    if (selectedQuantity < product.quantity)
      setSelectedQuantity(selectedQuantity + 1);
  };

  const handleDecreaseQuantity = (e) => {
    if (selectedQuantity > 1) setSelectedQuantity(selectedQuantity - 1);
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
      console.log(data);
      const res = await addProductTocart(data);
      if (res.status === "success") {
        handleToast(toast, "Success", "Product added to cart.", "success");
      } else {
        handleToast(toast, "Error", "product is out of stocks", "error");
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

  const handleBuyClick = (e) => {
    e.preventDefault();
    const data = {
      product: product._id,
      quantity: selectedQuantity,
      purchasePrice: getPurchasePrice(
        product?.price,
        selectedQuantity,
        product?.discount
      ),
      totalPrice: getTotalPrice(product.price, selectedQuantity),
      size: selectedSize,
      color: selectedColor,
      image: product?.images[0],
      name: product?.name,
    };
    if (
      Array.isArray(orderItems) &&
      orderItems.some(
        (item) => item.size === selectedSize && item.color === selectedColor
      )
    ) {
      orderItems.find((item) => item.product === data.product).quantity +=
        selectedQuantity;
    } else {
      setOrderItems(data);
    }
    navigate(`/place/order`);
  };
  useEffect(() => {
    setSelectedQuantity(+product.quantity);
  }, [product]);

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
                  max={product.quantity}
                  value={selectedQuantity}
                  onChange={handleQuantityChange}
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
