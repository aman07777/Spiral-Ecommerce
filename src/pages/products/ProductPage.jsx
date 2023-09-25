import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Checkbox,
  Text,
  Select,
  useToast,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";

import Pagination from "../../components/Pagination";

import { getProducts } from "../../services/ProductServices";
import ProductPageBreadcrumb from "./components/product-page-breadcrumb";
import ProductCard from "./components/product-card";

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

  return (
    <>
      {!isLoading ? (
        <div className="flex justify-center">
          <Box width={{ base: "100%", lg: "75%" }}>
            <Flex
              direction={["column", "column", "row"]}
              justifyContent={"space-between"}
              columnGap={3}
              className="mt-3 text-[#585858] font-sans @container"
            >
              <Box className="w-full lg:sticky top-[6em] @[767px]:max-h-screen @[767px]:w-[20em]">
                <ProductPageBreadcrumb />
                <div className="w-full border mt-2 px-5 @[767px]:h-[96dvh] mb-3 pb-2">
                  <div className="@[767px]:flex-col gap-y-3 flex @[767px]:items-start items-center gap-x-[5em] my-4">
                    <Box>
                      <h2 className="text-[1.2rem] font-semibold mb-2">
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
                          // isChecked={selectedCategories.includes("Category A")}
                          onChange={handleCategoryChange}
                        >
                          Traditional
                        </Checkbox>
                        <Checkbox
                          // isChecked={selectedCategories.includes("Category A")}
                          onChange={handleCategoryChange}
                        >
                          Western
                        </Checkbox>
                        <Checkbox
                          // isChecked={selectedCategories.includes("Category A")}
                          onChange={handleCategoryChange}
                        >
                          Accesories
                        </Checkbox>
                        <Checkbox
                          // isChecked={selectedCategories.includes("Category B")}
                          onChange={handleCategoryChange}
                        >
                          Shoes
                        </Checkbox>
                      </div>
                    </Box>
                    <Box>
                      <h2 className="text-[1.2rem] font-semibold mb-2">
                        Brands
                      </h2>
                      <div className="flex flex-col">
                        <Checkbox
                          isChecked={selectedBrands.length === 0}
                          onChange={() => setSelectedBrands([])}
                        >
                          All
                        </Checkbox>
                        <Checkbox
                          // isChecked={selectedBrands.includes("Brand A")}
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
                  </div>
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
                        1k
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
              <Box className="pb-5 px-4 mt-3 @container flex-1">
                <Flex
                  direction="rows"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                >
                  <Text className="font-semibold text-[.95rem] max-w-[60%]">
                    {totalProducts} products found in X category for X brand
                    from
                  </Text>
                  <Flex alignItems="center" className="">
                    <h3 className="text-[.9rem] min-w-[3.5em]">Sort by</h3>
                    <Select
                      value={sortByPrice}
                      onChange={handlesortByPriceChange}
                      w={["100px", "100px", "auto"]}
                      className="flex-1"
                    >
                      <option value="">Best</option>
                      <option value="-price">High to Low</option>
                      <option value="+price">Low to High</option>
                    </Select>
                  </Flex>
                </Flex>
                <div className="grid gap-5 @[520px]:grid-cols-2 @[750px]:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard data={product} key={product?.id} />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  product
                  totalPages={Math.ceil(totalProducts / productsPerPage)}
                  onPageChange={handlePageChange}
                />
              </Box>
            </Flex>
          </Box>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default ProductPage;
