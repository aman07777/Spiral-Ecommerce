import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useQuery } from "@tanstack/react-query";
import Heading from "./heading";
import { usePromoCodeStore } from "./store";
import { handleToast } from "../../../../global/toast";
import { useState } from "react";
import TablePagination from "../../../../components/table-pagination";
const PromoCodTable = () => {
  const toast = useToast();
  // stores
  const getPromoCode = usePromoCodeStore((state) => state.getPromoCode);
  // states
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const {
    data: codes,
    isLoading: getLoading,
    isError,
    error,
  } = useQuery(["get", "promo-codes"], getPromoCode);
  isError &&
    handleToast(toast, "Error fetching promo codes", error.message, "error");
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
                  <Td>{code?.status}</Td>
                  <Td className="flex items-center gap-x-2">
                    <span
                      title={`Verify ${code?.promoCode}`}
                      // onClick={() => {
                      //   setUserDetails(user);
                      //   mutate(user._id);
                      // }}
                    >
                      {/* {user?.isVerified ? (
                        !verifyLoading && user?._id !== userDetails._id ? (
                          <CloseIcon className="text-sky-500 cursor-pointer text-[.9rem] border bg-slate-100 rounded-md" />
                        ) : user?._id === userDetails._id ? (
                          <Spinner color="teal.300" />
                        ) : (
                          <CloseIcon className="text-sky-500 cursor-pointer text-[.9rem] border bg-slate-100 rounded-md" />
                        )
                      ) : !verifyLoading && user?._id !== userDetails._id ? (
                        <DoneIcon className="text-green-500 cursor-pointer text-[.9rem] border bg-slate-100 rounded-md" />
                      ) : user?._id === userDetails._id ? (
                        <Spinner color="teal.300" />
                      ) : (
                        <DoneIcon className="text-green-500 cursor-pointer text-[.9rem] border bg-slate-100 rounded-md" />
                      )} */}
                      <CloseIcon className="text-sky-500 cursor-pointer text-[.9rem] border bg-slate-100 rounded-md" />
                    </span>

                    <span
                      title={`Delete ${code?.promoCode}`}
                      onClick={(e) => {
                        // setUserDetails(user);
                        // onOpen(e);
                      }}
                    >
                      <DeleteForeverIcon
                        className="text-rose-500 cursor-pointer text-[.9rem]"
                        // onClick={() => setUserDetails(user)}
                      />
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
    </>
  );
};

export default PromoCodTable;
