import React, { useState } from "react";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Spinner,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { BiSolidMessageSquareEdit } from "react-icons/bi";

import { useAdminProductStore } from "./store";
import { imageUrl } from "../../../global/config";
import { handleToast } from "../../../global/toast";
import DeleteModal from "./components/delete-modal";
import Dashboard from "../Dashboard";
import Title from "./components/title";
import BreadCrumb from "./components/bread-crumb";
import TablePagination from "../../../components/table-pagination";
import { useNavigate } from "react-router-dom";
function AdminProduct() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  // stores
  const getProducts = useAdminProductStore((state) => state.getProducts); // gets products from backend
  const setProducts = useAdminProductStore((state) => state.setProducts); // set products stored in the store

  // states
  const [product, setProduct] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleEdit = (product) => {
    // Set the form fields to the values of the selected product
    setProduct(product);
    navigate(`/admin-update-product/${product._id}`);
  };
  const handleDelete = (product) => {
    onOpen();
    setProduct(product);
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
      // setSelectAllLocal(false);
    }
    handleDeleteAll(selectedProducts);
  };

  // fetching the products from backend
  const {
    data: products,
    isFetching,
    isError,
    error,
  } = useQuery(["get", "products"], getProducts);
  !isFetching &&
    !isError &&
    Array.isArray(products) &&
    products?.length > 0 &&
    setProducts(products);
  isError && handleToast(toast, "Error", error.message, "error");
  return (
    <>
      <Dashboard />
      <div className="@container">
        <div className="px-4 mt-3 @[600px]:px-6">
          {/* breadcrumb section starts here */}
          <BreadCrumb />
          {/* breadcrumb section fin here */}
        </div>
        {/* the title and navigation to add product page */}
        <Title />
        {/* title and navigation fin here */}
      </div>
      {/*  table states here */}
      <Table variant="simple" className="mt-3">
        <Thead>
          <Tr>
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
          {isFetching ? (
            <Tr>
              <Td colSpan={10} textAlign={"center"}>
                <Spinner color="blue.300" />
              </Td>
            </Tr>
          ) : Array.isArray(products) && products?.length > 0 ? (
            products?.slice(startIndex, endIndex)?.map((product, index) => (
              <Tr key={product._id}>
                <Td>{product.name}</Td>
                <Td>{product.price}</Td>
                <Td>{product.category}</Td>
                <Td>{product.brand}</Td>
                <Td>{product.colors?.join(",")}</Td>
                <Td>{product.sizes?.join(",")}</Td>
                <Td>{product.description}</Td>
                <Td>
                  <Image
                    src={`${imageUrl}/${product.image}`}
                    alt={product.name}
                    boxSize="50px"
                    objectFit="cover"
                    mr={2}
                  />
                </Td>
                <Td gap="2px" className="flex items-center">
                  <span
                    title={`Update details of ${product?.name}`}
                    onClick={() => handleEdit(product)}
                  >
                    <BiSolidMessageSquareEdit className="text-gray-500 cursor-pointer text-[1.3rem]" />
                  </span>
                  <span
                    title={`Delete ${product?.name}`}
                    onClick={() => handleDelete(product)}
                  >
                    <DeleteForeverIcon className="text-rose-500 cursor-pointer text-[.9rem]" />
                  </span>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={10} textAlign={"center"} className="text-rose-500">
                No products found
              </Td>
            </Tr>
          )}
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
      {Array.isArray(products) && products?.length > 10 && (
        <TablePagination
          length={products?.length}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      )}
      <DeleteModal isOpen={isOpen} onClose={onClose} data={product} />
    </>
  );
}

export default AdminProduct;
