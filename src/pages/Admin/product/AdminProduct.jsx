import React, { lazy, useState } from "react";
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  // Checkbox,
  Image,
  Spinner,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useAdminProductStore } from "./store";
import { imageUrl } from "../../../global/config";
import { handleToast } from "../../../global/toast";
import DeleteModal from "./components/delete-modal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const Dashboard = lazy(() => import("../Dashboard"));
const Title = lazy(() => import("./components/title"));
const BreadCrumb = lazy(() => import("./components/bread-crumb"));
const TablePagination = lazy(() =>
  import("../../../components/table-pagination")
);
function AdminProduct() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // stores
  const getProducts = useAdminProductStore((state) => state.getProducts); // gets products from backend
  const setProducts = useAdminProductStore((state) => state.setProducts); // set products stored in the store

  // states
  const [product, setProduct] = useState({});
  // const [selectAllLocal, setSelectAllLocal] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleEdit = (product) => {
    // Set the form fields to the values of the selected product
    setProduct(product);
  };
  const handleDelete = (product) => {
    onOpen();
    setProduct(product);
    // Remove the selected product from the list of products
    setProducts(products.filter((p) => p.id !== product.id));
  };
  // const handleSelectAll = (checked) => {
  //   // Select or deselect all products
  //   setProducts(products.map((p) => ({ ...p, selected: checked })));
  //   setSelectAll(checked);
  // };

  // const handleSelect = (product, checked) => {
  //   // Select or deselect a single product
  //   setProducts(
  //     products.map((p) =>
  //       p.id === product.id ? { ...p, selected: checked } : p
  //     )
  //   );
  //   if (!checked) {
  //     setSelectAll(false);
  //   }
  // };

  // const handleSelectAllClick = (event) => {
  //   const { checked } = event.target;
  //   // setSelectAllLocal(checked);
  //   handleSelectAll(checked);
  //   setSelectAll(checked);
  //   setProducts(products.map((p) => ({ ...p, selected: checked })));
  // };

  // const handleSelectClick = (event, product) => {
  //   const { checked } = event.target;
  //   handleSelect(product, checked);
  // };

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
    isLoading,
    isError,
    error,
  } = useQuery(["get", "products"], getProducts);

  !isLoading &&
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
            {/* <Th>
              <Checkbox
                isChecked={
                  selectAll || products?.every((product) => product.selected)
                }
                onChange={handleSelectAllClick}
              />
            </Th> */}
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
          {isLoading ? (
            <Tr>
              <Td colSpan={10} textAlign={"center"}>
                <Spinner color="blue.300" />
              </Td>
            </Tr>
          ) : Array.isArray(products) && products?.length > 0 ? (
            products?.slice(startIndex, endIndex)?.map((product) => (
              <Tr key={product.id}>
                {/* <Td>
                  <Checkbox
                    isChecked={product.selected}
                    onChange={(event) => handleSelectClick(event, product)}
                  />
                </Td> */}
                <Td>{product.name}</Td>
                <Td>{product.price}</Td>
                <Td>{product.category}</Td>
                <Td>{product.brand}</Td>
                <Td>{product.color}</Td>
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
                <Td display="flex" gap="2px">
                  <Button
                    colorScheme="blue"
                    size="sm"
                    className="w-[5em]"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </Button>
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
      <TablePagination
        length={products?.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
      />
      {Object.keys(product).length > 0 && (
        <DeleteModal isOpen={isOpen} onClose={onClose} data={product} />
      )}
    </>
  );
}

export default AdminProduct;
