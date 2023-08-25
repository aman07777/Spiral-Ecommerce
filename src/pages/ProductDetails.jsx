import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
} from "@chakra-ui/react";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReactImageMagnify from "react-image-magnify";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { postCart } from "../services/CartServices";
import { useUserContext } from "../contexts/UserContext";

export default function ProductDetails() {
  const { state } = useLocation();
  const { product } = state;

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState(+product.quantity);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 767px)");


  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    setSelectedQuantity(+product.quantity);
    setImages(product.images);
    setIsLoading(false);
  }, [product.quantity, product.images]);

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
          selectedQuantity
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
        <Container maxW={"7xl"} py={12} display="flex" flexDirection={{base: "column", md: "row"}}  justifyContent="center">
          <Box display="flex" flexDirection={{base: "column", md: "row"}}>
            <Box display="flex" flexDirection="column" mb={{base: "2rem", md: 0}}>
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
                        ? `http://localhost:8080/${selectedImage}`
                        : `http://localhost:8080/${images[0]}`,
                      width: 2200,
                      height: 1800,
                    },
                    smallImage: {
                      alt: "image",
                      src: selectedImage
                        ? `http://localhost:8080/${selectedImage}`
                        : `http://localhost:8080/${images[0]}`,
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
                      src={`http://localhost:8080/${image}`}
                      boxSize={{base: "40px", md: "50px"}}                      objectFit="cover"
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
          <Box display="flex" flexDirection="column" justifyContent="space-between" ml={{base: 0, md: "2rem"}}>
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
                mb={"1"}
              >
                Product Details
              </Text>

              <List>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Brand:
                  </Text>{" "}
                  {product.brand}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Category:
                  </Text>{" "}
                  {product.category}
                </ListItem>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
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
                    ></Box>
                  ))}
                </ListItem>
              </List>
              <Flex alignItems="center" mt={{ base: 2, md: 4 }}>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  fontWeight={"500"}
                >
                  Quantity:
                </Text>
                <Flex alignItems="center" ml={{base: "1rem", md: "2rem"}}>
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

              <Stack direction="row">
                <LocalShippingIcon />
                <Text>2-3 business days delivery</Text>
              </Stack>

              <Flex gap={5} mt={4}>
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
        </Container>
      ) : (
        <Loader />
      )}
      <Footer />
    </>
  );
}
