import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Box, Flex, Text, Select, useToast, Spinner } from "@chakra-ui/react";

import Pagination from "../../components/Pagination";

import { getProducts } from "../../services/ProductServices";
import ProductPageBreadcrumb from "./components/product-page-breadcrumb";
import ProductCard from "./components/product-card";
import PriceRange from "./components/price-range";
import Brands from "./components/brands";
import Category from "./components/categories";
import { useProductPageStore } from "./store";
const categories = [
  {
    id: "bf3d6387-0925-5f1a-8cb5-e92b88470b96",
    title: "Traditional",
    isChecked: false,
  },
  {
    id: "e08791f8-f5bc-51f1-99e9-0bf79c9bc081",
    title: "Western",
    isChecked: false,
  },
  {
    id: "ffa36331-1380-597e-a721-da5658491a2b",
    title: "Accessories",
    isChecked: false,
  },
  {
    id: "be63f690-e0ce-5958-b55f-23243a47b914",
    title: "Shoes",
    isChecked: false,
  },
];
const brands = [
  {
    id: "77b67283-4854-5471-810e-a9773b247852",
    title: "Nike",
    isChecked: false,
  },
  {
    id: "1387ebc8-35cc-5ef7-8111- bf1c21798063",
    title: "Armani",
    isChecked: false,
  },
  {
    id: "f28c2a79-7b5b-5e7b-b582-809bb7fab764",
    title: "Varsachhi",
    isChecked: false,
  },
  {
    id: "8ecddf43-9694-533e-909b-c822d0204918",
    title: "Baanarasi",
    isChecked: false,
  },
];
function ProductPage() {
  const toast = useToast();
  const { state } = useLocation();
  const keyWord = state?.keyWord;
  // stores
  const category = useProductPageStore((status) => status.category);
  // states
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([
    categories.find((c) => c.title === category),
  ]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortByPrice, setsortByPrice] = useState("best");
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(10);
  const maxPrice = 10000;
  const [productsPerPage, setProductsPerPage] = useState(16);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getProducts(
      currentPage,
      keyWord,
      minPrice,
      maxPrice,
      sortByPrice,
      selectedBrands,
      selectedCategories
    )
      .then((result) => {
        if (result?.products?.length === 0) {
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
  }, [
    currentPage,
    toast,
    keyWord,
    sortByPrice,
    minPrice,
    maxPrice,
    selectedCategories,
    selectedBrands,
  ]);

  const handleCategoryChange = (e, category) => {
    e.target.checked &&
      setSelectedCategories([...selectedCategories, category]);
    !e.target.checked &&
      setSelectedCategories(
        selectedCategories.filter((c) => c.id !== category.id)
      );
  };

  const handleBrandChange = (e, brand) => {
    e.target.checked && setSelectedBrands([...selectedBrands, brand]);
    !e.target.checked &&
      setSelectedBrands(selectedBrands.filter((b) => b.id !== brand.id));
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
              <Box className="lg:sticky top-[6em] @[767px]:max-h-screen @[767px]:w-[20em]">
                <ProductPageBreadcrumb />
                <div className="w-full border mt-2 px-5 @[767px]:h-[96dvh] mb-3 pb-2 ">
                  <div className="@[767px]:flex-col gap-y-3 flex @[767px]:items-start items-center gap-x-[5em] my-4">
                    <Category
                      categories={categories}
                      handleCategoryChange={handleCategoryChange}
                    />
                    <Brands
                      brands={brands}
                      handleBrandChange={handleBrandChange}
                    />
                  </div>
                  <PriceRange minPrice={minPrice} setMinPrice={setMinPrice} />
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
                      colorScheme="teal"
                    >
                      <option value="">Best</option>
                      <option value="-price">High to Low</option>
                      <option value="+price">Low to High</option>
                    </Select>
                  </Flex>
                </Flex>
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 ">
                  {/* 996 -1176 */}
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
