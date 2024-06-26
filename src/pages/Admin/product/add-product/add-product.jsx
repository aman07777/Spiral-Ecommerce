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
    quantity: "",
    discount: 0,
    colors: [],
    sizes: [],
    images: [],
    previewImages: [],
  });

  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the new product to the list of products
    setProducts([...products, { ...product, id: Date.now() }]);
    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("brand", product.brand);
    formData.append("quantity", product.quantity);
    formData.append("discount", product.discount);
    for (let i = 0; i < product.colors?.length; i++) {
      formData.append("colors", product.colors[i]?.trim());
    }
    product?.sizes.forEach((size) => {
      formData.append("sizes", size?.trim());
    });
    for (let i = 0; i < images?.length; i++) {
      formData.append("productImage", images[i]);
    }
    addProductClass.addProduct(
      formData,
      addProduct,
      toast,
      setLoading,
      setProduct
    );
  };

  const handleSizeChange = (event) => {
    const { value } = event.target;
    const sizes = value.split(",");
    setProduct({ ...product, sizes });
  };

  const handleImageChangeMultiple = (event) => {
    const files = event.target.files;
    const images = [];
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      if (file && /\.(jpe?g|png)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          images.push(event.target.result);
          if (images?.length === files?.length) {
            setProduct({
              ...product,
              previewImages: [...product.previewImages, ...images],
            });
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
      (selectedImageIndex - 1 + product.previewImages?.length) %
        product.previewImages?.length
    );
  };

  const handleNextClick = () => {
    setSelectedImageIndex(
      (selectedImageIndex + 1) % product.previewImages?.length
    );
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
                <FormControl id="discount" mt={2} isRequired>
                  <FormLabel>Discount</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter product brand"
                    size="md"
                    value={product.discount}
                    onChange={(event) =>
                      setProduct({ ...product, discount: event.target.value })
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
                <FormControl id="quantity" mt={2} isRequired>
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter quantity"
                    size="md"
                    value={product.quantity}
                    onChange={(e) => {
                      setProduct({ ...product, quantity: e.target.value });
                    }}
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
                    onChange={(e) => {
                      handleImageChangeMultiple(e);

                      setImages(e.target.files);
                    }}
                    multiple
                    size="md"
                  />
                </FormControl>
                {product.previewImages?.length > 0 && (
                  <Flex direction="row" alignItems="center" mt={2}>
                    <Image
                      src={product.previewImages?.[0]}
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
                src={product.previewImages[selectedImageIndex]}
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
