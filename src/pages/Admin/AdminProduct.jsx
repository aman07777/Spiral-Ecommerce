import React, { useEffect, useState } from 'react';
import { Flex, Box, Button, FormControl, FormLabel, Input, Textarea, Select, Table, Thead, Tbody, Tr, Th, Td, Checkbox, Image, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useToast } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight, ArrowForward } from '@mui/icons-material';
import AdminNavbar from './AdminNavbar';
import { createProduct, getProduct, getProducts } from '../../services/ProductServices';
import Pagination from '../../components/Pagination';

function ProductList({
  products,
  onEdit,
  onDelete,
  onSelectAll,
  onSelect,
  onDeleteAll,
  setSelectAll,
  currentPage,
  totalPages,
  onPageChange
}) {
  const [selectAll, setSelectAllLocal] = useState(false);

  const handleSelectAll = (event) => {
    const { checked } = event.target;
    setSelectAllLocal(checked);
    onSelectAll(checked);
    setSelectAll(checked);
  };

  const handleSelect = (event, product) => {
    const { checked } = event.target;
    onSelect(product, checked);
  };

  const handleDeleteAll = () => {
    const selectedProducts = products.filter((product) => product.selected);
    if (selectAll) {
      setSelectAll(false);
      setSelectAllLocal(false);
    }
    onDeleteAll(selectedProducts);
  };

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>
              <Checkbox
                isChecked={selectAll || products.every((product) => product.selected)}
                onChange={handleSelectAll}
              />
            </Th>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>Category</Th>
            <Th>Brand</Th>
            <Th>Discount</Th>
            <Th>Image</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <Td>
                <Checkbox
                  isChecked={product.selected}
                  onChange={(event) => handleSelect(event, product)}
                />
              </Td>
              <Td>{product.name}</Td>
              <Td>{product.price}</Td>
              <Td>{product.category}</Td>
              <Td>{product.brand}</Td>
              <Td>{product.discount}%</Td>
              <Td>
                {product.image && (
                  <Image
                    src={`http://localhost:8080/${product.image}`}
                    alt={product.name}
                    boxSize="50px"
                    objectFit="cover"
                    mr={2}
                  />
                )}
              </Td>
              <Td display="flex" gap="2px">
                <Button colorScheme="blue" size="sm" onClick={() => onEdit(product.id)}>
                  Edit
                </Button>
                <Button colorScheme="red" size="sm" onClick={() => onDelete(product.id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
        {selectAll && (
          <tfoot>
            <Tr>
              <Td colSpan={10}>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={handleDeleteAll}
                  disabled={!products.some((product) => product.selected)}
                >
                  Delete All
                </Button>
              </Td>
            </Tr>
          </tfoot>
        )}
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}

function AdminProduct() {

  const toast = useToast();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    colors: [],
    sizes: [],
    images: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);


  useEffect(() => {
    getProducts(currentPage)
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
  }, [currentPage, toast]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the new product to the list of products
    createProduct(product).then((result) => {
      toast({
        title: "Product added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setProducts([...products, result.product]);
    }).catch((error) => {
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

    // Clear the form fields
    setProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      brand: '',
      colors: [],
      sizes: [],
      images: [],
    });
  };

  const handleEdit = (productId) => {
    // Set the form fields to the values of the selected product
    getProduct(productId).then((result) => {
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

    }).catch((error) => {
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
  };

  const handleDelete = (product) => {
    // Remove the selected product from the list of products
    setProducts(products.filter((p) => p.id !== product.id));
  };

  const handleSelectAll = (checked) => {
    // Select or deselect all products
    setProducts(products.map((p) => ({ ...p, selected: checked })));
    setSelectAll(checked);
  };

  const handleSelect = (product, checked) => {
    // Select or deselect a single product
    setProducts(
      products.map((p) =>
        p.id === product.id ? { ...p, selected: checked } : p
      )
    );
    if (!checked) {
      setSelectAll(false);
    }
  };

  const handleDeleteAll = (selectedProducts) => {
    // Remove all selected products from the list of products
    setProducts(products.filter((product) => !selectedProducts.includes(product)));
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
    setSelectedImageIndex((selectedImageIndex - 1 + product.images.length) % product.images.length);
  };

  const handleNextClick = () => {
    setSelectedImageIndex((selectedImageIndex + 1) % product.images.length);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
      <AdminNavbar />
      <Flex direction={{ base: "column", md: "row" }} p={4}>
        <Flex direction="column" width={{ base: "100%", md: "40%" }} mr={4}>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4} height="90vh" mt={0} padding={{ base: 2, md: 6 }}>
            <Box p="6" mt={0}>

              <form onSubmit={handleSubmit}>
                <FormControl id="name" isRequired mb={2}>
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter product name"
                    size="sm"
                    value={product.name}
                    onChange={(event) =>
                      setProduct({ ...product, name: event.target.value })
                    }
                  />
                </FormControl>

                <Flex direction="row">
                  <FormControl id="price" mr={2} isRequired>
                    <FormLabel>Product Price</FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter product price"
                      size="sm"
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
                      size="sm"
                      value={product.category}
                      onChange={(event) =>
                        setProduct({ ...product, category: event.target.value })
                      }
                    >
                      <option value="Traditional">Traditional</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Home">Home</option>
                    </Select>
                  </FormControl>
                </Flex>
                <FormControl id="brand" mt={2} isRequired>
                  <FormLabel>Product Brand</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter product brand"
                    size="sm"
                    value={product.brand}
                    onChange={(event) =>
                      setProduct({ ...product, brand: event.target.value })
                    }
                  />
                </FormControl>
                <FormControl id="color" mt={2} isRequired>
                  <FormLabel>Product Color</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter product color"
                    size="sm"
                    value={product.colors}
                    onChange={(event) => {
                      const { value } = event.target;
                      const colors = value.split(',');
                      setProduct({ ...product, colors });
                    }}
                  />
                </FormControl>
                <FormControl id="sizes" mt={2} isRequired>
                  <FormLabel>Product Sizes</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter product sizes (comma-separated)"
                    size="sm"
                    value={product.sizes}
                    onChange={(event) => {
                      const { value } = event.target;
                      const sizes = value.split(',');
                      setProduct({ ...product, sizes });
                    }}
                  />
                </FormControl>
                <FormControl id="description" isRequired mb={2}>
                  <FormLabel>Product Description</FormLabel>
                  <Textarea
                    placeholder="Enter product description"
                    size="sm"
                    value={product.description}
                    onChange={(event) =>
                      setProduct({ ...product, description: event.target.value })
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
                  />
                </FormControl>
                {product.images.length > 0 && (
                  <Flex direction="row" alignItems="center" mt={2}>
                    <Image src={`http://localhost:8080/${product.images[0]}`} alt={product.name} boxSize="50px" objectFit="cover" mr={2} />
                    <IconButton
                      icon={<ArrowForward />}
                      aria-label="Preview Images"
                      size="sm"
                      onClick={handlePreviewClick}
                    />
                  </Flex>
                )}
                <Button type="submit" colorScheme="blue" mt={4} size="sm">
                  Add Product
                </Button>
              </form>

            </Box>
          </Box>
        </Flex>
        <Flex direction="column" width={{ base: "40%", md: "100%" }}>
          <ProductList
            currentPage={currentPage}
            totalPages={Math.ceil(totalProducts / productsPerPage)}
            onPageChange={handlePageChange}
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSelectAll={handleSelectAll}
            onSelect={handleSelect}
            onDeleteAll={handleDeleteAll}
            setSelectAll={setSelectAll}
          />
        </Flex>
      </Flex>

      <Modal isOpen={isPreviewModalOpen} onClose={handlePreviewModalClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Product Image ${selectedImageIndex + 1}`}</ModalHeader>
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
              <Image src={`http://localhost:8080/${product.images[selectedImageIndex]}`} alt={`Product Image ${selectedImageIndex + 1}`} height="30vh" width="30vw" />
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
            <Button colorScheme="blue" size="sm" onClick={handlePreviewModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  );
}

export default AdminProduct;