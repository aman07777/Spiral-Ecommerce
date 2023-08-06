import React, { useState } from 'react';
import { Flex, Box, Button,FormControl, FormLabel, Input, Textarea, Select, Table, Thead, Tbody, Tr, Th, Td, Checkbox, Image, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight, ArrowForward  } from '@mui/icons-material';
import Dashboard from './Dashboard';

function ProductList({
  products,
  onEdit,
  onDelete,
  onSelectAll,
  onSelect,
  onDeleteAll,
  setSelectAll,
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
          <Th>Color</Th>
          <Th>Sizes</Th>
          <Th>Description</Th>
          <Th>Images</Th>
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
            <Td>{product.color}</Td>
            <Td>{product.sizes.join(', ')}</Td>
            <Td>{product.description}</Td>
            <Td>
                {product.images.length > 0 && (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    boxSize="50px"
                    objectFit="cover"
                    mr={2}
                  />
                )}
              </Td>
            <Td display="flex" gap="2px">
              <Button colorScheme="blue" size="sm" onClick={() => onEdit(product)}>
                Edit
              </Button>
              <Button colorScheme="red" size="sm" onClick={() => onDelete(product)}>
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
  );
}

function AdminProduct() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    color: '',
    sizes: [],
    images: [],
  });

  const [products, setProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add the new product to the list of products
    setProducts([...products, { ...product, id: Date.now() }]);
    // Clear the form fields
    setProduct({
      name: '',
      description: '',
      price: '',
      category: '',
      brand: '',
      color: '',
      sizes: [],
      images: [],
    });
  };

  const handleSizeChange = (event) => {
    const { value } = event.target;
    const sizes = value.split(',');
    setProduct({ ...product, sizes });
  };

  const handleEdit = (product) => {
    // Set the form fields to the values of the selected product
    setProduct(product);
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


  return (
    <>
      <Dashboard />
      <Flex direction="row" p={4}>
        <Flex direction="column" width="40%" mr={4}>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={4} height="90vh" mt={0}>
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
                    value={product.color}
                    onChange={(event) =>
                      setProduct({ ...product, color: event.target.value })
                    }
                  />
                </FormControl>
                <FormControl id="sizes" mt={2} isRequired>
                  <FormLabel>Product Sizes</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter product sizes (comma-separated)"
                    size="sm"
                    value={product.sizes}
                    onChange={handleSizeChange}
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
                    <Image src={product.images[0]} alt={`Product Image 1`} boxSize="50px" objectFit="cover" mr={2} />
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
        <Flex direction="column" width="100%">
          <ProductList
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
              <Image src={product.images[selectedImageIndex]} alt={`Product Image ${selectedImageIndex + 1}`}  height="30vh"width="30vw"/>
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