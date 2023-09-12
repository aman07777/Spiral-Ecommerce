import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
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
  Breadcrumb,
  BreadcrumbItem,
} from "@chakra-ui/react";
import { ShoppingCart } from "@mui/icons-material";

import Pagination from "../components/Pagination";
import Loader from "../components/Loader";

import { getProducts } from "../services/ProductServices";
import { imageUrl } from "../global/config";

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlesortByPriceChange = (event) => {
    setsortByPrice(event.target.value);
  };

  const handleSelectedProduct = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <>
      {!isLoading ? (
        <div className="flex justify-center">
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
              <BreadcrumbItem isCurrentPage>
                <NavLink to="#">Products</NavLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Flex
              direction={["column", "column", "row"]}
              justifyContent={"space-between"}
              columnGap={3}
              className="mt-3 text-[#585858] font-sans"
            >
              <Box boxShadow="2xl" className="w-full px-5">
                <Box my={4}>
                  <h2 className="text-[1.3rem] font-semibold mb-2">
                    Categories
                  </h2>
                  <div className="flex flex-col">
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
                      Tradtional
                    </Checkbox>
                    <Checkbox
                      isChecked={selectedCategories.includes("Category A")}
                      onChange={handleCategoryChange}
                    >
                      Western
                    </Checkbox>
                    <Checkbox
                      isChecked={selectedCategories.includes("Category A")}
                      onChange={handleCategoryChange}
                    >
                      Accesories
                    </Checkbox>
                    <Checkbox
                      isChecked={selectedCategories.includes("Category B")}
                      onChange={handleCategoryChange}
                    >
                      Shoes
                    </Checkbox>
                  </div>
                </Box>
                <Box mb={4}>
                  <h2 className="text-[1.2rem] font-semibold mb-2">Brands</h2>
                  <div className="flex flex-col">
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
                      Nike
                    </Checkbox>
                    <Checkbox
                      isChecked={selectedBrands.includes("Brand A")}
                      onChange={handleBrandChange}
                    >
                      Armani
                    </Checkbox>
                    <Checkbox
                      isChecked={selectedBrands.includes("Brand A")}
                      onChange={handleBrandChange}
                    >
                      Varsachhi
                    </Checkbox>
                    <Checkbox
                      isChecked={selectedBrands.includes("Brand B")}
                      onChange={handleBrandChange}
                    >
                      Baanarasi
                    </Checkbox>
                  </div>
                </Box>
                <Box mb={4}>
                  <h2 className="text-[1.2rem] font-semibold mb-2">
                    Price Range
                  </h2>
                  <Flex direction="column"></Flex>
                </Box>
              </Box>
              <Box w={["100%", "100%", "75%"]}>
                <Flex
                  direction="rows"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >
                  <Text>
                    {totalProducts} products found in X category for X brand
                    from
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
                    // "repeat(4, 1fr)",
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
                          src={`${imageUrl}/${product.image}`}
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
          </Box>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ProductPage;
