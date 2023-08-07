import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
  Select,
  Button,
  Grid,
  GridItem,
  Image,
  
} from '@chakra-ui/react';
import { ArrowDownward, ArrowUpward, FilterList,ShoppingCart } from '@mui/icons-material';
import Pagination from '../components/Pagination';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import ProductDetails from './ProductDetails';

const products = [
  {
    id: 1,
    name: 'Product 1',
    brand: 'Brand A',
    category: 'Category A',
    price: 10,
    image: "https://www.thespruce.com/thmb/I-Q7vHSennsvdAHWbpjxOR5DYEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/get-a-flawless-paint-job-with-tack-cloth-1822686-06-81df672f15de4dc98b085e01dcf8bc06.jpg"
  },
  {
    id: 2,
    name: 'Product 2',
    brand: 'Brand B',
    category: 'Category A',
    price: 20,
    image: "https://www.thespruce.com/thmb/I-Q7vHSennsvdAHWbpjxOR5DYEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/get-a-flawless-paint-job-with-tack-cloth-1822686-06-81df672f15de4dc98b085e01dcf8bc06.jpg"
  },
  {
    id: 3,
    name: 'Product 3',
    brand: 'Brand A',
    category: 'Category B',
    price: 30,
    image: "https://www.thespruce.com/thmb/I-Q7vHSennsvdAHWbpjxOR5DYEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/get-a-flawless-paint-job-with-tack-cloth-1822686-06-81df672f15de4dc98b085e01dcf8bc06.jpg"
  },
  {
    id: 4,
    name: 'Product 4',
    brand: 'Brand B',
    category: 'Category B',
    price: 40,
    image: "https://www.thespruce.com/thmb/I-Q7vHSennsvdAHWbpjxOR5DYEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/get-a-flawless-paint-job-with-tack-cloth-1822686-06-81df672f15de4dc98b085e01dcf8bc06.jpg"
  },
  {
    id: 1,
    name: 'Product 1',
    brand: 'Brand A',
    category: 'Category A',
    price: 10,
    image: "https://www.thespruce.com/thmb/I-Q7vHSennsvdAHWbpjxOR5DYEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/get-a-flawless-paint-job-with-tack-cloth-1822686-06-81df672f15de4dc98b085e01dcf8bc06.jpg"
  },
  {
    id: 2,
    name: 'Product 2',
    brand: 'Brand B',
    category: 'Category A',
    price: 20,
    image: "https://www.thespruce.com/thmb/I-Q7vHSennsvdAHWbpjxOR5DYEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/get-a-flawless-paint-job-with-tack-cloth-1822686-06-81df672f15de4dc98b085e01dcf8bc06.jpg"
  },
  {
    id: 1,
    name: 'Product 1',
    brand: 'Brand A',
    category: 'Category A',
    price: 10,
    image: "https://www.thespruce.com/thmb/I-Q7vHSennsvdAHWbpjxOR5DYEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/get-a-flawless-paint-job-with-tack-cloth-1822686-06-81df672f15de4dc98b085e01dcf8bc06.jpg"
  },
  {
    id: 2,
    name: 'Product 2',
    brand: 'Brand B',
    category: 'Category A',
    price: 20,
    image: "https://www.thespruce.com/thmb/I-Q7vHSennsvdAHWbpjxOR5DYEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/get-a-flawless-paint-job-with-tack-cloth-1822686-06-81df672f15de4dc98b085e01dcf8bc06.jpg"
  },
  {
    id: 1,
    name: 'Product 1',
    brand: 'Brand A',
    category: 'Category A',
    price: 10,
    image: "https://www.thespruce.com/thmb/I-Q7vHSennsvdAHWbpjxOR5DYEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/get-a-flawless-paint-job-with-tack-cloth-1822686-06-81df672f15de4dc98b085e01dcf8bc06.jpg"
  },
  {
    id: 2,
    name: 'Product 2',
    brand: 'Brand B',
    category: 'Category A',
    price: 20,
    image: "https://www.thespruce.com/thmb/I-Q7vHSennsvdAHWbpjxOR5DYEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/get-a-flawless-paint-job-with-tack-cloth-1822686-06-81df672f15de4dc98b085e01dcf8bc06.jpg"
  },
  {
    id: 1,
    name: 'Product 1',
    brand: 'Brand A',
    category: 'Category A',
    price: 10,
    image: "https://www.thespruce.com/thmb/I-Q7vHSennsvdAHWbpjxOR5DYEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/get-a-flawless-paint-job-with-tack-cloth-1822686-06-81df672f15de4dc98b085e01dcf8bc06.jpg"
  },
  {
    id: 2,
    name: 'Product 2',
    brand: 'Brand B',
    category: 'Category A',
    price: 20,
    image: "https://www.thespruce.com/thmb/I-Q7vHSennsvdAHWbpjxOR5DYEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/get-a-flawless-paint-job-with-tack-cloth-1822686-06-81df672f15de4dc98b085e01dcf8bc06.jpg"
  },
  {
    id: 1,
    name: 'Product 1',
    brand: 'Brand A',
    category: 'Category A',
    price: 10,
    image: "https://www.thespruce.com/thmb/I-Q7vHSennsvdAHWbpjxOR5DYEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/get-a-flawless-paint-job-with-tack-cloth-1822686-06-81df672f15de4dc98b085e01dcf8bc06.jpg"
  },
  {
    id: 2,
    name: 'Product 2',
    brand: 'Brand B',
    category: 'Category A',
    price: 20,
    image: "https://www.thespruce.com/thmb/I-Q7vHSennsvdAHWbpjxOR5DYEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/get-a-flawless-paint-job-with-tack-cloth-1822686-06-81df672f15de4dc98b085e01dcf8bc06.jpg"
  },
];

function ProductPage() {
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [sortBy, setSortBy] = useState('best');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

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

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const handlePriceRangeIncrease = () => {
    setPriceRange([priceRange[0], priceRange[1] + 1]);
  };

  const handlePriceRangeDecrease = () => {
    setPriceRange([priceRange[0], priceRange[1] - 1]);
  };

 

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      (selectedBrands.length === 0 || selectedBrands.includes(product.brand)) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  if (sortBy === 'price-high-to-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'price-low-to-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  }


   // Get current products based on current page
   const indexOfLastProduct = currentPage * productsPerPage;
   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
 
   // Change current page
   const handlePageChange = (pageNumber) => {
     setCurrentPage(pageNumber);
   };
 
   // Change sort option
   const handleSortByChange = (event) => {
     setSortBy(event.target.value);
   };
  return (
    <>
    <Navbar/>
    <Flex direction={['column', 'column', 'row']} p={4}>
      <Box w="25vh" mr="40px" pl="8px" pr="2px" boxShadow="2xl" >
        <Box mb={4}>
          <Heading as="h2" size="md" mb={2}>
            Categories
          </Heading>
          <Flex direction="column">
            <Checkbox isChecked={selectedCategories.length === 0} onChange={() => setSelectedCategories([])}>
              All
            </Checkbox>
            <Checkbox isChecked={selectedCategories.includes('Category A')} onChange={handleCategoryChange}>
              Category A
            </Checkbox>
            <Checkbox isChecked={selectedCategories.includes('Category B')} onChange={handleCategoryChange}>
              Category B
            </Checkbox>
          </Flex>
        </Box>
        <Box mb={4}>
          <Heading as="h2" size="md" mb={2}>
            Brands
          </Heading>
          <Flex direction="column">
            <Checkbox isChecked={selectedBrands.length === 0} onChange={() => setSelectedBrands([])}>
              All
            </Checkbox>
            <Checkbox isChecked={selectedBrands.includes('Brand A')} onChange={handleBrandChange}>
              Brand A
            </Checkbox>
            <Checkbox isChecked={selectedBrands.includes('Brand B')} onChange={handleBrandChange}>
              Brand B
            </Checkbox>
          </Flex>
        </Box>
        <Box mb={4}>
          <Heading as="h2" size="md" mb={2}>
            Price Range
          </Heading>
          <Flex direction="column">
            <Flex direction="row" alignItems="center" mb={2}>
              <Text fontSize="sm" mr={2}>
                ${priceRange[0]}
              </Text>
              <ArrowDownward onClick={handlePriceRangeDecrease} />
              <Slider
                min={0}
                max={100}
                step={1}
                value={priceRange}
                onChange={handlePriceRangeChange}
                colorScheme="blue"
                ml={2}
                mr={2}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <ArrowUpward onClick={handlePriceRangeIncrease} />
              <Text fontSize="sm" ml={2}>
                ${priceRange[1]}
              </Text>
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Box w={['100%', '100%', '75%']}>
<Flex direction="row" justifyContent="space-between" alignItems="center" mb={4}>
        <Text>
            X products found in X category for X brand from ${priceRange[0]} to ${priceRange[1]}
        </Text>
        <Flex alignItems="center">
            <Text mr={2}>Sort by</Text>
            <Select value={sortBy} onChange={handleSortByChange} w={['100px', '100px', 'auto']}>
            <option value="best">Best</option>
            <option value="price-high-to-low">Price High to Low</option>
            <option value="price-low-to-high">Price Low to High</option>
            </Select>
        </Flex>
        </Flex>
        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)','repeat(4, 1fr)']} gap={4}>
          {currentProducts.map((product) => (
             <Box
             key={product.id}
             borderRadius="lg"
             bg="white"
             width="250px"
             height="375px"
             cursor="pointer"
             boxShadow="2xl"
             position="relative"
             transition="transform 0.2s ease-in-out"
             _hover={{ transform: 'scale(1.05)' }}
           >
             <Box
               width="250px"
               height="250px"
               overflow="hidden"
               position="relative"
               mb={4}
             >
               <Image
                 src={product.image}
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
             <Text fontSize="lg" color="grey.100" fontWeight="bold" mb={2} ml={2}>
               ${product.price}
             </Text>
             <Text fontSize="lg" color="#0077B5" textDecoration="line-through" ml={2}>
               ${product.discount}
             </Text>
           </Box>          ))}
        </Grid>
      </Box> 
    </Flex>
    <Pagination
        currentPage={currentPage}
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        onPageChange={handlePageChange}
      />
      <Footer/>
    </>
  );
}

export default ProductPage;