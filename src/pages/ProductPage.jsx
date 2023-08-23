import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Checkbox,
  Text,
  Select,
  Grid,
  Image,
  useToast,
} from "@chakra-ui/react";
import { ShoppingCart } from "@mui/icons-material";

import Pagination from "../components/Pagination";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

import { getProducts, getProduct } from "../services/ProductServices";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortByPrice, setsortByPrice] = useState("best");
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const [productsPerPage, setProductsPerPage] = useState(16);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const { state } = useLocation();
  const keyWord = state?.keyWord;

  useEffect(() => {
    getProducts(currentPage, keyWord, minPrice, maxPrice, sortByPrice)
      .then((result) => {
        if (result.products.length === 0) {
          toast({
            title: "No products found",
            description: "Please try again with different keywords.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
        }
        setProducts(result.products);
        setCurrentPage(result.currentPage);
        setProductsPerPage(result.productsPerPage);
        setTotalProducts(result.totalProducts);
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
  }, [currentPage, toast, keyWord, sortByPrice, minPrice, maxPrice]);

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleBrandChange = (event) => {
    const brand = event.target.value;
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(+e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(+e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlesortByPriceChange = (event) => {
    setsortByPrice(event.target.value);
  };

  const handleSelectedProduct = async (productId) => {
    try {
      const product = await getProduct(productId);
      navigate("/productDetails", { state: product });
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

  return (
    <>
      <Navbar />
      {!isLoading ? (
        <>
          <Flex direction={["column", "column", "row"]} p={4}>
            <Box w="25vh" mr="40px" pl="8px" pr="2px" boxShadow="2xl">
              <Box mb={4}>
                <Heading as="h2" size="md" mb={2}>
                  Categories
                </Heading>
                <Flex direction="column">
                  <Checkbox
                    isChecked={selectedCategories.length === 0}
                    onChange={() => setSelectedCategories([])}
                  >
                    All
                  </Checkbox>
                  <Checkbox
                    isChecked={selectedCategories.includes("Category A")}
                    onChange={handleCategoryChange}
                  >
                    Category A
                  </Checkbox>
                  <Checkbox
                    isChecked={selectedCategories.includes("Category B")}
                    onChange={handleCategoryChange}
                  >
                    Category B
                  </Checkbox>
                </Flex>
              </Box>
              <Box mb={4}>
                <Heading as="h2" size="md" mb={2}>
                  Brands
                </Heading>
                <Flex direction="column">
                  <Checkbox
                    isChecked={selectedBrands.length === 0}
                    onChange={() => setSelectedBrands([])}
                  >
                    All
                  </Checkbox>
                  <Checkbox
                    isChecked={selectedBrands.includes("Brand A")}
                    onChange={handleBrandChange}
                  >
                    Brand A
                  </Checkbox>
                  <Checkbox
                    isChecked={selectedBrands.includes("Brand B")}
                    onChange={handleBrandChange}
                  >
                    Brand B
                  </Checkbox>
                </Flex>
              </Box>
              <Box mb={4}>
                <Heading as="h2" size="md" mb={2}>
                  Price Range
                </Heading>
                <Flex direction="column">
                </Flex>
              </Box>
            </Box>
            <Box w={["100%", "100%", "75%"]}>
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
              >
                <Text>
                  {totalProducts} products found in X category for X brand from
                </Text>
                <Flex alignItems="center">
                  <Text mr={2}>Sort by</Text>
                  <Select
                    value={sortByPrice}
                    onChange={handlesortByPriceChange}
                    w={["100px", "100px", "auto"]}
                  >
                    <option value="">Best</option>
                    <option value="-price">Price High to Low</option>
                    <option value="+price">Price Low to High</option>
                  </Select>
                </Flex>
              </Flex>
              <Grid
                templateColumns={[
                  "repeat(1, 1fr)",
                  "repeat(2, 1fr)",
                  "repeat(3, 1fr)",
                  "repeat(4, 1fr)",
                ]}
                gap={4}
              >
                {products.map((product) => (
                  <Box
                    key={product.id}
                    onClick={() => handleSelectedProduct(product.id)}
                    borderRadius="lg"
                    bg="white"
                    width="250px"
                    height="375px"
                    cursor="pointer"
                    boxShadow="2xl"
                    position="relative"
                    transition="transform 0.2s ease-in-out"
                    _hover={{ transform: "scale(1.05)" }}
                  >
                    <Box
                      width="250px"
                      height="250px"
                      overflow="hidden"
                      position="relative"
                      mb={4}
                    >
                      <Image
                        src={`http://localhost:8080/${product.image}`}
                        width="250px"
                        height="250px"
                        objectFit="center"
                      />
                      <Box
                        position="absolute"
                        top={2}
                        right={2}
                        bg="white"
                        p={1}
                        borderRadius="10px"
                        color="#0077B5"
                      >
                        <ShoppingCart />
                      </Box>
                    </Box>
                    <Text fontWeight="bold" fontSize="lg" mb={2} ml={2}>
                      {product.name}
                    </Text>
                    <Text
                      fontSize="lg"
                      color="grey.100"
                      fontWeight="bold"
                      mb={2}
                      ml={2}
                    >
                      ${product.price}
                    </Text>
                    <Text
                      fontSize="lg"
                      color="#0077B5"
                      textDecoration="line-through"
                      ml={2}
                    >
                      ${product.discount}
                    </Text>
                  </Box>
                ))}
              </Grid>
            </Box>
          </Flex>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalProducts / productsPerPage)}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <Loader />
      )}
      <Footer />
    </>
  );
}

export default ProductPage;
