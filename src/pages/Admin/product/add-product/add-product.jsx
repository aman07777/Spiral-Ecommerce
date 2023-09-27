import React, { useState, useMemo } from "react";
import {
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Image,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  Breadcrumb,
  BreadcrumbItem,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, ArrowForward } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import Dashboard from "../../Dashboard";
import { AddProductClass } from "./helper";
import { useAddProductStore } from "./store";
const AddProduct = () => {
  const toast = useToast();

  // class
  const addProductClass = useMemo(() => new AddProductClass(), []);
  // stores
  const addProduct = useAddProductStore((state) => state.addProduct);

  //states
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    colors: [],
    sizes: [],
    images: [],
  });

  const [products, setProducts] = useState([]);
  //   const [selectAll, setSelectAll] = useState(false);
  const [loading, setLading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the new product to the list of products
    setProducts([...products, { ...product, id: Date.now() }]);

    addProductClass.addProduct(
      product,
      addProduct,
      toast,
      setLading,
      setProduct,
      setProduct
    );
    // Clear the form fields
    // setProduct({
    //   name: "",
    //   description: "",
    //   price: "",
    //   category: "",
    //   brand: "",
    //   color: "",
    //   sizes: [],
    //   images: [],
    // });
  };

  const handleSizeChange = (event) => {
    const { value } = event.target;
    const sizes = value.split(",");
    setProduct({ ...product, sizes });
  };

  const handleImageChangeMultiple = (event) => {
    const files = event.target.files;
    const images = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file && /\.(jpe?g|png)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          images.push(event.target.result);
          if (images.length === files.length) {
            setProduct({ ...product, images: [...product.images, ...images] });
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handlePreviewClick = () => {
    setIsPreviewModalOpen(true);
  };

  const handlePreviewModalClose = () => {
    setIsPreviewModalOpen(false);
    setSelectedImageIndex(0);
  };

  const handlePrevClick = () => {
    setSelectedImageIndex(
      (selectedImageIndex - 1 + product.images.length) % product.images.length
    );
  };

  const handleNextClick = () => {
    setSelectedImageIndex((selectedImageIndex + 1) % product.images.length);
  };

  return (
    <>
      <Dashboard />
      <Breadcrumb
        spacing="5px"
        className="text-[.9rem] font-semibold text-[#585858] px-4 @[767px]:px-0 mt-3"
      >
        <BreadcrumbItem>
          <NavLink
            to="/adminHome"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
          >
            Home
          </NavLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NavLink
            to="/adminProduct"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
          >
            Products
          </NavLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <NavLink to="#" className="cursor-default">
            Add
          </NavLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex direction={{ base: "column", md: "row" }} p={4}>
        <Flex direction="column" className="max-w-[550px] w-full">
          <Box
            borderWidth="1px"
            borderRadius="lg"
            mb={4}
            mt={0}
            padding={{ base: 2, md: 4 }}
            className="w-full"
          >
            <Box p="6" mt={0}>
              <form
                onSubmit={handleSubmit}
                className="text-[#585858] grid gap-y-2"
              >
                <FormControl id="name" isRequired mb={2}>
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter product name"
                    size="md"
                    value={product.name}
                    onChange={(event) =>
                      setProduct({ ...product, name: event.target.value })
                    }
                    className="rounded-sm focus:outline-transparent active:outline-transparent"
                  />
                </FormControl>

                <Flex direction="row">
                  <FormControl id="price" mr={2} isRequired>
                    <FormLabel>Product Price</FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter product price"
                      size="md"
                      value={product.price}
                      onChange={(event) =>
                        setProduct({ ...product, price: event.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl id="category" ml={2} isRequired>
                    <FormLabel>Product Category</FormLabel>
                    <Select
                      placeholder="Select category"
                      size="md"
                      value={product.category}
                      onChange={(event) =>
                        setProduct({ ...product, category: event.target.value })
                      }
                    >
                      <option value="clothing">Clothing</option>
                      <option value="electronics">Electronics</option>
                      <option value="home">Home</option>
                    </Select>
                  </FormControl>
                </Flex>
                <FormControl id="brand" mt={2} isRequired>
                  <FormLabel>Product Brand</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter product brand"
                    size="md"
                    value={product.brand}
                    onChange={(event) =>
                      setProduct({ ...product, brand: event.target.value })
                    }
                  />
                </FormControl>
                <FormControl id="brand" mt={2} isRequired>
                  <FormLabel>Product Color</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter product color (comma-separated)"
                    size="md"
                    value={product.colors}
                    onChange={(event) => {
                      setProduct({
                        ...product,
                        colors: event.target.value?.split(","),
                      });
                    }}
                  />
                </FormControl>
                {/* <FormControl id="category" mt={2} isRequired>
                  <FormLabel>Product Color</FormLabel>
                  <Select
                    placeholder="Select product color"
                    size="md"
                    value={product.color}
                    onChange={(event) =>
                      setProduct({ ...product, color: event.target.value })
                    }
                  >
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="red">Red</option>
                  </Select>
                </FormControl> */}
                <FormControl id="sizes" mt={2} isRequired>
                  <FormLabel>Product Sizes</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter product sizes (comma-separated)"
                    size="md"
                    value={product.sizes}
                    onChange={handleSizeChange}
                  />
                </FormControl>
                <FormControl id="description" isRequired mb={2}>
                  <FormLabel>Product Description</FormLabel>
                  <Textarea
                    placeholder="Enter product description"
                    size="md"
                    value={product.description}
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        description: event.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="image" mt={2} isRequired>
                  <FormLabel>Product Image</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangeMultiple}
                    multiple
                    size="md"
                  />
                </FormControl>
                {product.images.length > 0 && (
                  <Flex direction="row" alignItems="center" mt={2}>
                    <Image
                      src={product.images[0]}
                      alt={`Product Image 1`}
                      boxSize="50px"
                      objectFit="cover"
                      mr={2}
                    />
                    <IconButton
                      icon={<ArrowForward />}
                      aria-label="Preview Images"
                      size="md"
                      onClick={handlePreviewClick}
                    />
                  </Flex>
                )}
                <Button type="submit" colorScheme="blue" mt={4} size="md">
                  {loading ? "Adding..." : " Add Product"}
                </Button>
              </form>
            </Box>
          </Box>
        </Flex>
      </Flex>

      <Modal
        isOpen={isPreviewModalOpen}
        onClose={handlePreviewModalClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Product Images</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="row">
              <IconButton
                icon={<ChevronLeft />}
                aria-label="Previous Image"
                size="sm"
                onClick={handlePrevClick}
                mr={2}
              />
              <Image
                src={product.images[selectedImageIndex]}
                alt={`Product Image ${selectedImageIndex + 1}`}
                height="30vh"
                width="30vw"
                className="object-cover"
              />
              <IconButton
                icon={<ChevronRight />}
                aria-label="Next Image"
                size="sm"
                onClick={handleNextClick}
                ml={2}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              size="sm"
              onClick={handlePreviewModalClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddProduct;
