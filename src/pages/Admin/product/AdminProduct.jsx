import React, { useState } from "react";
import {
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Image,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  Icon,
} from "@chakra-ui/react";
import { Add } from "@mui/icons-material";
import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Dashboard from "../Dashboard";
import { Link } from "react-router-dom";
function AdminProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    color: "",
    sizes: [],
    images: [],
  });
  const [selectAllLocal, setSelectAllLocal] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const handleEdit = (product) => {
    // Set the form fields to the values of the selected product
    setProduct(product);
  };

  const handleDelete = (product) => {
    // Remove the selected product from the list of products
    setProducts(products.filter((p) => p.id !== product.id));
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

  const handleSelectAllClick = (event) => {
    const { checked } = event.target;
    setSelectAllLocal(checked);
    handleSelectAll(checked);
    setSelectAll(checked);
  };

  const handleSelectClick = (event, product) => {
    const { checked } = event.target;
    handleSelect(product, checked);
  };

  const handleDeleteAll = (selectedProducts) => {
    // Remove all selected products from the list of products
    setProducts(
      products.filter((product) => !selectedProducts.includes(product))
    );
  };
  const handleDeleteAllClick = () => {
    const selectedProducts = products.filter((product) => product.selected);
    if (selectAll) {
      setSelectAll(false);
      setSelectAllLocal(false);
    }
    handleDeleteAll(selectedProducts);
  };

  return (
    <>
      <Dashboard />
      <div className="@container">
        <div className="px-4 mt-3 @[600px]:px-6">
          <Breadcrumb
            spacing="5px"
            className="text-[.9rem] font-semibold text-[#585858] px-4 @[767px]:px-0"
          >
            <BreadcrumbItem>
              <NavLink
                to="/adminHome"
                className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
              >
                Home
              </NavLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <NavLink to="#">Products</NavLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="flex justify-between px-4 mt-3 @[600px]:px-6">
          <p className="font-semibold text-[#585858] text-[1.2rem]">Products</p>
          <Box
            as={Link}
            title="Add new product"
            to="/admin-add-product"
            className="text-[#585858] hover:text-[#0077b5] transition-[color] relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:-bottom-[.1rem] before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 border hover:border-transparent p-1 rounded-sm before:left-0 @[600px]:px-3"
          >
            <Icon as={Add} />
          </Box>
        </div>
      </div>
      <Table variant="simple" className="mt-3">
        <Thead>
          <Tr>
            <Th>
              <Checkbox
                isChecked={
                  selectAll || products.every((product) => product.selected)
                }
                onChange={handleSelectAllClick}
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
                  onChange={(event) => handleSelectClick(event, product)}
                />
              </Td>
              <Td>{product.name}</Td>
              <Td>{product.price}</Td>
              <Td>{product.category}</Td>
              <Td>{product.brand}</Td>
              <Td>{product.color}</Td>
              <Td>{product.sizes.join(", ")}</Td>
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
                <Button
                  colorScheme="blue"
                  size="sm"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => handleDelete(product)}
                >
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
                  onClick={handleDeleteAllClick}
                  disabled={!products.some((product) => product.selected)}
                >
                  Delete All
                </Button>
              </Td>
            </Tr>
          </tfoot>
        )}
      </Table>
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
}

export default AdminProduct;
