import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Container,
  Text,
  Image,
  Flex,
  Button,
  Heading,
  Stack,
  List,
  ListItem,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReactImageMagnify from "react-image-magnify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getProduct } from "../services/ProductServices";
import { postCart } from "../services/CartServices";
import { useUserContext } from "../contexts/UserContext";
import { imageUrl } from "../global/config";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("null");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 767px)");

  const { id: productId } = useParams();
  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    getProduct(productId)
      .then((result) => {
        if (!result.product) {
          toast({
            title: "No products found",
            description: "Please try again with different keywords.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
        setProduct(result.product);
        setSelectedQuantity(+result.product.quantity);
        setImages(result.product.images);
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
  }, [productId, toast]);

  const handleQuantityChange = (e) => {
    setSelectedQuantity(+e.target.value);
  };

  const handleIncreaseQuantity = (e) => {
    if (selectedQuantity < product.quantity)
      setSelectedQuantity(selectedQuantity + 1);
  };

  const handleDecreaseQuantity = (e) => {
    if (selectedQuantity > 1) setSelectedQuantity(selectedQuantity - 1);
  };

  const handleAddtoCart = async () => {
    if (currentUser) {
      try {
        const response = await postCart(
          currentUser,
          product._id,
          selectedQuantity,
          selectedSize,
          selectedColor
        );
        if (response.status === 201) {
          toast({
            title: "Success",
            description: "Product added to cart.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });

          navigate("/cart");
        }
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
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <Navbar />
      {!isLoading ? (
        <Container
          maxW={"7xl"}
          py={12}
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="center"
        >
          <Box display="flex" flexDirection={{ base: "column", md: "row" }}>
            <Box
              display="flex"
              flexDirection="column"
              mb={{ base: "2rem", md: 0 }}
            >
              <Box
                display="flex"
                justifyContent="center"
                flexDirection="column"
                flex="1"
              >
                <ReactImageMagnify
                  imageAlt="Product image" // removed curly braces
                  dragToMove={false}
                  mouseActivation="hover"
                  cursorStyle="crosshair"
                  onError={() => console.log("Error loading image")}
                  className="product-image" // removed curly braces
                  style={{ zIndex: 1 }}
                  enlargedImageContainerDimensions={{
                    width: "80%",
                    height: "80%",
                  }}
                  {...{
                    largeImage: {
                      src: selectedImage
                        ? `${imageUrl}/${selectedImage}`
                        : `${imageUrl}/${images[0]}`,
                      width: 2200,
                      height: 1800,
                    },
                    smallImage: {
                      alt: "image",
                      src: selectedImage
                        ? `${imageUrl}/${selectedImage}`
                        : `${imageUrl}/${images[0]}`,
                      width: isMobile ? 305 : 600,
                      height: isMobile ? 300 : 600,
                    },
                  }}
                />
              </Box>
              <Box flex="1">
                <Flex gap={2} pt="1rem" overflowX="scroll">
                  {images.map((image, index) => (
                    <Image
                      key={index}
                      src={`${imageUrl}/${image}`}
                      boxSize={{ base: "40px", md: "50px" }}
                      objectFit="cover"
                      mb={2}
                      borderRadius="1rem"
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
                </Flex>
              </Box>

              {/* <VStack spacing={{ base: 4, sm: 6 }} textAlign="center"> */}
              <Text fontSize={"2xl"} fontWeight={"300"} maxWidth={"3xl"}>
                {product.description}
              </Text>
              {/* </VStack> */}
            </Box>
          </Box>
          {/* </Box> */}
          <Box maxWidth="800px">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              ml={{ base: 0, md: "2rem" }}
            >
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {product.name}
                </Heading>
                <Text fontWeight={300} fontSize={"2xl"}>
                  ${product.price} NPR
                </Text>
              </Box>

              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mt={5}
              >
                Product Details
              </Text>

              <List mt={5}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"} mt={1}>
                    Brand:
                  </Text>{" "}
                  {product.brand}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"} mt={1}>
                    Category:
                  </Text>{" "}
                  {product.category}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"} mt={1}>
                    Colors:
                  </Text>{" "}
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
                        border:
                          selectedColor === color ? "2px solid black" : "none",
                      }}
                    ></Box>
                  ))}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"} mt={1}>
                    Sizes:
                  </Text>{" "}
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
                </ListItem>
              </List>
              <Flex alignItems="center" mt={{ base: 2, md: 4 }}>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  fontWeight={"500"}
                  mt={4}
                >
                  Quantity:
                </Text>
                <Flex alignItems="center" ml={{ base: "1rem", md: "2rem" }}>
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
                  <input
                    type="number"
                    min="1"
                    max={`"${product.quantity}"`}
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                    style={{
                      width: "50px",
                      textAlign: "center",
                      borderRadius: "0.5rem",
                      appearance: "textfield",
                      MozAppearance: "textfield",
                      WebkitAppearance: "textfield",
                      mx: "2", // Add some horizontal spacing between the input and buttons
                      py: "2", // Add some vertical padding for better alignment
                    }}
                  />
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
                </Flex>
              </Flex>

              <Stack direction="row" mt={3}>
                <LocalShippingIcon />
                <Text>2-3 business days delivery</Text>
              </Stack>

              <Flex gap={5} mt={5}>
                <Button
                  size="lg"
                  py={7}
                  textTransform="uppercase"
                  colorScheme="linkedin"
                  onClick={handleAddtoCart}
                >
                  Add to cart
                </Button>

                <Button
                  size="lg"
                  py={7}
                  textTransform="uppercase"
                  colorScheme="linkedin"
                >
                  Buy now
                </Button>
              </Flex>
            </Box>
          </Box>
        </Container>
      ) : (
        <Loader />
      )}
      <Footer />
    </>
  );
}
