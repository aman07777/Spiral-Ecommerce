import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useQuery } from "@tanstack/react-query";
import Heading from "./heading";
import { usePromoCodeStore } from "./store";
import { handleToast } from "../../../../global/toast";
import { useState } from "react";
import TablePagination from "../../../../components/table-pagination";
import DeleteModal from "./delete-modal";
const PromoCodTable = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  // stores
  const getPromoCode = usePromoCodeStore((state) => state.getPromoCode);

  // states
  // delete
  const [promoCodeDetails, setPromoCodeDetails] = useState({});
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // react query
  // getting the promo codes from the database
  const {
    data: codes,
    isLoading: getLoading,
    isError: getIsError,
    error: getError,
  } = useQuery(["get", "promo-codes"], getPromoCode);
  // deleting the promo code
  getIsError &&
    handleToast(toast, "Error fetching promo codes", getError.message, "error");
  return (
    <>
      <div className="flex-1 border rounded bg-slate-50">
        {/* table's heading section -> contains title of the tale and a button that lets the affiliator to create a promo code */}
        {/* it has a modal that allows an affiliator to add a promo code */}
        <Heading />
        {/* heading section fin */}
        {/* table section starts */}
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Codes</Th>
              <Th>Discount</Th>
              <Th>Expiry Date</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getLoading ? (
              // showing a spinner if the data is being fetched
              <Tr className="text-red-500 text-[.8rem] font-semibold">
                <Td colSpan={4} textAlign={"center"}>
                  <Spinner color="blue.300" />
                </Td>
              </Tr>
            ) : Array.isArray(codes) && codes?.length > 0 ? (
              codes?.slice(startIndex, endIndex)?.map((code) => (
                <Tr key={code._id}>
                  <Td>{code?.promoCode}</Td>
                  <Td>{code?.discountPercentage}</Td>
                  <Td>{code?.expiresAt?.split("T")[0]}</Td>
                  <Td>
                    <span
                      className={`border text-[.8rem] ${
                        code?.status === "active" && "bg-green-400"
                      } ${
                        code?.status === "inactive" && "bg-rose-400"
                      } px-2 text-white pb-[.2rem] rounded-full select-none`}
                    >
                      {code?.status}
                    </span>
                  </Td>
                  <Td className="flex items-center gap-x-2">
                    <span
                      title={`Delete ${code?.promoCode}`}
                      onClick={(e) => {
                        setPromoCodeDetails(code);
                        onOpen(e);
                      }}
                    >
                      <DeleteForeverIcon className="text-rose-500 cursor-pointer text-[.9rem]" />
                    </span>
                  </Td>
                </Tr>
              ))
            ) : (
              // showing a message if there is no any promo codes
              <Tr className="text-red-500 text-[.8rem] font-semibold">
                <Td colSpan={5} textAlign={"center"}>
                  No any codes are available
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        {/* table section fin here */}
        {Array.isArray(codes) && codes?.length > 10 && (
          <TablePagination
            length={codes?.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
      {Object.keys(promoCodeDetails).length > 0 && (
        <DeleteModal
          isOpen={isOpen}
          onClose={onClose}
          data={promoCodeDetails}
        />
      )}
    </>
  );
};

export default PromoCodTable;
