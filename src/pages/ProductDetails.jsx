import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ProductDetails() {
  const product = {
    name: 'Dummy Product',
    price: 100,
    discount: 80,
    description: 'This is a dummy product description.',
    brand: 'Dummy Brand',
    category: 'Dummy Category',
    sku: '123456',
    availability: 'In Stock',
    img: "https://www.thespruce.com/thmb/I-Q7vHSennsvdAHWbpjxOR5DYEU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/get-a-flawless-paint-job-with-tack-cloth-1822686-06-81df672f15de4dc98b085e01dcf8bc06.jpg"
  };

  const [zoomLevel, setZoomLevel] = useState(1);
  const [showZoomedIn, setShowZoomedIn] = useState(false);
  const [zoomedInPosition, setZoomedInPosition] = useState({ x: 0, y: 0 });

  // Handle zoom in and zoom out buttons
  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 0.1);
  };

  // Handle mouse move event on the image
  const handleMouseMove = (event) => {
    const { left, top, width, height } = event.target.getBoundingClientRect();
    const x = ((event.clientX - left) / width) * 100;
    const y = ((event.clientY - top) / height) * 100;
    setZoomedInPosition({ x, y });
  };

  // Handle mouse enter event on the image
  const handleMouseEnter = () => {
    setShowZoomedIn(true);
  };

  // Handle mouse leave event on the image
  const handleMouseLeave = () => {
    setShowZoomedIn(false);
  };

  return (
    <>
      <Navbar />
      <Flex direction={['column', 'column', 'row']} alignItems={['center', 'center', 'flex-start']} mt={8}>
        <Box width={['100%', '100%', '50%']} mr={[0, 0, 8]}>
          <Box
            width="100%"
            height="500px"
            position="relative"
            overflow="hidden"
            borderRadius="lg"
            boxShadow="2xl"
            mb={4}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Box
              as={Image}
              src={product.img}
              width="100%"
              height="100%"
              objectFit="contain"
              transform={`scale(${zoomLevel})`}
              transition="transform 0.2s ease-in-out"
              _hover={{ transform: 'scale(1.2)', cursor: 'zoom-in' }}
              onClick={handleZoomIn}
            />
            {showZoomedIn && (
              <Box
                position="absolute"
                top="0"
                left="100%"
                width="300px"
                height="300px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="2xl"
                zIndex="999"
              >
                <Box
                  as={Image}
                  src={product.img}
                  width="100%"
                  height="100%"
                  objectFit="contain"
                  transform={`scale(${zoomLevel + 0.5})`}
                  transformOrigin={`${zoomedInPosition.x}% ${zoomedInPosition.y}%`}
                />
              </Box>
            )}
            <Box
              position="absolute"
              bottom={2}
              right={2}
              bg="white"
              p={1}
              borderRadius="10px"
              color="#0077B5"
              cursor="zoom-in"
              onClick={handleZoomIn}
              _hover={{ bg: 'gray.100' }}
            >
              <ZoomInIcon />
            </Box>
          </Box>
          <Flex direction={['column', 'column', 'row']} alignItems={['center', 'center', 'flex-start']}>
            <Box>
              <Text fontWeight="bold" fontSize="2xl" mb={2}>
                {product.name}
              </Text>
              <Text fontSize="lg" color="grey.100" fontWeight="bold" mb={2}>
                ${product.price}
              </Text>
              <Text fontSize="lg" color="#0077B5" textDecoration="line-through" mb={2}>
                ${product.discount}
              </Text>
              <Text fontSize="lg" mb={4}>
                {product.description}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box width={['100%', '100%', '50%']}>
          <Text fontWeight="bold" fontSize="xl" mb={2}>
            Product Details
          </Text>
          <Box mb={4}>
            <Text fontWeight="bold" mb={2}>
              Brand:
            </Text>
            <Text>{product.brand}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold" mb={2}>
              Category:
            </Text>
            <Text>{product.category}</Text>
          </Box>
          <Box mb={4}>
            <Text fontWeight="bold" mb={2}>
              Availability:
            </Text>
            <Text>{product.availability}</Text>
          </Box>
        </Box>
      </Flex>
      <Footer />
    </>
  );
}

export default ProductDetails;