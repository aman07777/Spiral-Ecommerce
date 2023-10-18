import React, { useState } from "react";
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
import Dashboard from "../Dashboard";
import { useCustomerStore } from "./store";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import Navigation from "./components/navigation";
import BreadCrumb from "./components/bread-crumb";
import { handleToast } from "../../../global/toast";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteModal from "./components/delete-modal";
import TablePagination from "../../../components/table-pagination";
function AdminCustomer() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // stores
  const getCustomers = useCustomerStore((state) => state.getCustomers);
  const verify = useCustomerStore((state) => state.verifyUser);
  // states
  const [userDetails, setUserDetails] = useState({});
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const { mutate, isLoading: verifyLoading } = useMutation({
    mutationKey: ["verify", "user", userDetails._id],
    mutationFn: verify,
    onSuccess: (data) => {
      if (data) {
        setUserDetails({});
        queryClient.invalidateQueries(["get", "customers"]);
        handleToast(
          toast,
          "Success",
          "User verified status changed",
          "success"
        );
      }
    },
    onError: (error) => {
      handleToast(toast, "Error", error.message, "error");
    },
  });
  const {
    isLoading: getLoading,
    data: customers,
    error,
    isError,
  } = useQuery({
    queryKey: ["get", "customers"],
    queryFn: () => getCustomers(),
  });
  isError && handleToast(toast, "Error", error.message, "error");

  return (
    <>
      <Dashboard />
      <BreadCrumb />
      <Navigation />
      <div className="mt-3 md:px-4">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {getLoading ? (
              <Tr className="text-red-500 text-[.8rem] font-semibold">
                <Td colSpan={4} textAlign={"center"}>
                  <Spinner color="blue.300" />
                </Td>
              </Tr>
            ) : Array.isArray(customers) && customers?.length > 0 ? (
              customers?.slice(startIndex, endIndex)?.map((user) => (
                <Tr key={user._id}>
                  <Td className="capitalize">{`${user?.firstName} ${user?.lastName}`}</Td>
                  <Td>{user?.email}</Td>
                  <Td>
                    <span
                      className={`text-[#fff] text-[.8rem] px-[.25rem] rounded-full pb-[.15rem] ${
                        user?.isVerified ? "bg-green-500" : "bg-rose-500"
                      }`}
                    >
                      {user?.isVerified ? "verified" : "unverified"}
                    </span>
                  </Td>
                  <Td className="flex items-center gap-x-2">
                    <span
                      title={`Verify ${user?.firstName}`}
                      onClick={() => {
                        setUserDetails(user);
                        mutate(user._id);
                      }}
                    >
                      {user?.isVerified ? (
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
                      )}
                    </span>

                    <span
                      title={`Delete ${user?.firstName}`}
                      onClick={(e) => {
                        setUserDetails(user);
                        onOpen(e);
                      }}
                    >
                      <DeleteForeverIcon
                        className="text-rose-500 cursor-pointer text-[.9rem]"
                        onClick={() => setUserDetails(user)}
                      />
                    </span>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr className="text-red-500 text-[.8rem] font-semibold">
                <Td colSpan={4} textAlign={"center"}>
                  No any orders are available
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        {Array.isArray(customers) && customers?.length > 10 && (
          <TablePagination
            length={customers?.length}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
      {Object.keys(userDetails).length > 0 && (
        <DeleteModal isOpen={isOpen} onClose={onClose} data={userDetails} />
      )}
    </>
  );
}

export default AdminCustomer;
