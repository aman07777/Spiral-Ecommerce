import React, { lazy } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";

const Heading = lazy(() => import("./heading"));
const PromoCodTable = () => {
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
              <Th>SN</Th>
              <Th>Codes</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {false ? (
              // showing a spinner if the data is being fetched
              <Tr className="text-red-500 text-[.8rem] font-semibold">
                <Td colSpan={4} textAlign={"center"}>
                  <Spinner color="blue.300" />
                </Td>
              </Tr>
            ) : Array.isArray([]) && []?.length > 0 ? (
              [].map((order) => (
                <Tr key={order._id}>
                  <Td>{order?.shippingInfo?.fullName}</Td>
                  <Td>{order?.productName || "unknown"}</Td>
                  <Td>{order?.quantity || 0}</Td>
                  <Td>Rs. {order?.price || 0}</Td>
                </Tr>
              ))
            ) : (
              // showing a message if there is no any promo codes
              <Tr className="text-red-500 text-[.8rem] font-semibold">
                <Td colSpan={4} textAlign={"center"}>
                  No any codes are available
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        {/* table section fin here */}
      </div>
    </>
  );
};

export default PromoCodTable;
