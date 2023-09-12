import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import {
  Box,
  Flex,
  Checkbox,
  Text,
  Select,
  Grid,
  Image,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
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
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [productsPerPage, setProductsPerPage] = useState(16);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [priceRange, setPriceRange] = React.useState(5);
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
            <Flex
              direction={["column", "column", "row"]}
              justifyContent={"space-between"}
              columnGap={3}
              className="mt-3 text-[#585858] font-sans"
            >
              <Box className="w-full  lg:sticky top-[6em] max-h-screen">
                <Breadcrumb
                  spacing="5px"
                  className="text-[.9rem] font-semibold text-[#585858] "
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
                <div className="w-full border mt-2 px-5 h-[96dvh]">
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
                    <h2 className="text-[1.2rem] font-semibold">Price Range</h2>
                    <Slider
                      aria-label="slider-ex-4"
                      defaultValue={30}
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                      onChange={(e) => setPriceRange(e)}
                      min={500}
                      max={50000}
                      className="px-2"
                    >
                      <SliderMark
                        value={1000}
                        mt="1"
                        ml="-2.5"
                        fontSize="sm"
                        className="font-mono"
                      >
                        1000
                      </SliderMark>
                      <SliderMark
                        value={10000}
                        mt="1"
                        ml="-2.5"
                        fontSize="sm"
                        className="font-mono"
                      >
                        10k
                      </SliderMark>
                      <SliderMark
                        value={30000}
                        mt="1"
                        ml="-2.5"
                        fontSize="sm"
                        className="font-mono"
                      >
                        30k
                      </SliderMark>
                      <SliderMark
                        value={50000}
                        mt="1"
                        ml="-2.5"
                        fontSize="sm"
                        className="font-mono"
                      >
                        50k
                      </SliderMark>
                      <SliderTrack bg="linkedin.200">
                        <SliderFilledTrack bg="linkedin.500" />
                      </SliderTrack>
                      <Tooltip
                        hasArrow
                        bg="linkedin.500"
                        placement="top"
                        isOpen={showTooltip}
                        label={`${priceRange}`}
                      >
                        <SliderThumb boxSize={5}>
                          <Box color="linkedin.500" />
                        </SliderThumb>
                      </Tooltip>
                    </Slider>
                  </Box>
                </div>
              </Box>
              <Box w={["100%", "100%", "75%"]} className="pb-5">
                <Flex
                  direction="rows"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >
                  <Text className="font-semibold text-[.95rem]">
                    {totalProducts} products found in X category for X brand
                    from
                  </Text>
                  <Flex alignItems="center" className="">
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
                      cursor="pointer"
                      boxShadow="2xl"
                      position="relative"
                      transition="transform 0.2s ease-in-out"
                      _hover={{ transform: "scale(1.05)" }}
                      className="pb-3"
                    >
                      <Box
                        width="250px"
                        height="250px"
                        overflow="hidden"
                        position="relative"
                        mb={3}
                      >
                        <Image
                          src={`${imageUrl}/${product.image}`}
                          width="250px"
                          height="250px"
                          objectFit="center"
                          borderTopRadius="lg"
                        />
                        <Box
                          position="absolute"
                          top={2}
                          right={2}
                          bg="white"
                          p={1}
                          borderRadius="10px"
                          color="#0077B5"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate("/cart");
                          }}
                        >
                          <ShoppingCart />
                        </Box>
                      </Box>
                      <div className="px-3">
                        <Text className="text-[1.3rem] font-semibold">
                          {product.name}
                        </Text>
                        <Text className="mt-2 font-semibold text-[1.1rem] text-[#585858]/80">
                          {product.price -
                            (product.discount / 100) * product.price}{" "}
                          NPR
                        </Text>
                        {product.discount > 0 && (
                          <div className="font-medium text-[.8rem] flex gap-x-3">
                            <span className="line-through text-rose-400">
                              {product.price} NPR
                            </span>

                            <span className="text-green-400">
                              {product.discount}% off
                            </span>
                          </div>
                        )}
                      </div>
                    </Box>
                  ))}
                </Grid>
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalProducts / productsPerPage)}
                  onPageChange={handlePageChange}
                />
              </Box>
            </Flex>
          </Box>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ProductPage;
