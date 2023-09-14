import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Container,
  Text,
  Image,
  Flex,
  Button,
  Stack,
  List,
  ListItem,
  useToast,
  // useMediaQuery,
  Breadcrumb,
  BreadcrumbItem,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import ReactImageMagnify from "react-image-magnify";

import Loader from "../components/Loader";
import { getProduct } from "../services/ProductServices";
import { postCart } from "../services/CartServices";
import { useUserContext } from "../contexts/UserContext";
import { imageUrl } from "../global/config";
import ImageMagnifier from "./image-magnifier";

export default function ProductDetails() {
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("null");
  const [isLoading, setIsLoading] = useState(true);
  // const [isMobile] = useMediaQuery("(max-width: 767px)");

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
        setSelectedImage(result.product.images?.[0]);
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
  }, [productId, toast, selectedImage]);

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

          navigate("/protect/cart");
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
      {!isLoading ? (
        <div className="flex justify-center w-full">
          <Box width={{ base: "100%", md: "95%", lg: "75%" }}>
            <Breadcrumb
              spacing="5px"
              mt={3}
              className="text-[.9rem] font-semibold text-[#585858]"
            >
              <BreadcrumbItem>
                <NavLink
                  to="/"
                  className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
                >
                  Home
                </NavLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <NavLink
                  to="/products"
                  className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
                >
                  Products
                </NavLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <NavLink to="#">Details</NavLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Container
              maxW={"7xl"}
              mt={5}
              mb={10}
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              justifyContent="center"
            >
              <Box
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                className="flex-1"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  mb={{ base: "2rem", md: 0 }}
                  className="w-full"
                >
                  {/* <Box
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
              </Box> */}
                  {/* image magnifier section starts */}
                  <ImageMagnifier image={selectedImage} />
                  {/* image magnifier section ends */}
                  {/* more image section start*/}
                  <Box flex="1">
                    <Flex gap={2} pt="1rem">
                      {images.map((image, index) => (
                        <Image
                          key={index}
                          src={`${imageUrl}/${image}`}
                          boxSize={{ base: "50px", md: "50px" }}
                          objectFit="cover"
                          mb={2}
                          borderRadius=".3rem"
                          onClick={() => setSelectedImage(image)}
                        />
                      ))}
                    </Flex>
                  </Box>
                  {/* more image section end */}
                </Box>
              </Box>
              {/* </Box> */}
              <Box maxWidth="800px" className="flex-1 text-gray-600">
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  ml={{ base: 0, md: "2rem" }}
                >
                  <Box as={"header"}>
                    <h1 className="font-semibold text-[1.75rem]">
                      {product.name}
                    </h1>
                    <Text className="text-[.9rem] font-semibold">
                      {product.description} Lorem ipsum, dolor sit amet
                      consectetur adipisicing elit. Maiores, error!
                    </Text>
                    <Text className="mt-2 font-semibold text-[1.3rem]">
                      {product.price - (product.discount / 100) * product.price}{" "}
                      NPR
                    </Text>
                    <div className="mt-1 font-medium text-[.9rem] flex gap-x-3">
                      <span className="text-red-500 line-through">
                        {product.price} NPR
                      </span>
                      <span className="text-green-500">
                        {product.discount}% off
                      </span>
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
                      <input
                        type="number"
                        min="1"
                        max={`"${product.quantity}"`}
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
                      py={7}
                      textTransform="uppercase"
                      colorScheme="linkedin"
                      onClick={handleAddtoCart}
                      h={"2em"}
                      className="w-[10em]"
                    >
                      Add to cart
                    </Button>
                    <Button
                      py={7}
                      textTransform="uppercase"
                      colorScheme="linkedin"
                      h={"2em"}
                      className="w-[10em]"
                    >
                      Buy now
                    </Button>
                  </Flex>
                </Box>
              </Box>
            </Container>
          </Box>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
