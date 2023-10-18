import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Spinner } from "@chakra-ui/react";
const PromoCodeUserTable = () => {
  return (
    <>
      <div className="flex-1 border rounded bg-slate-50">
        <p className="p-4 text-[1.1rem] font-semibold">Promo code users</p>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>SN</Th>
              <Th>Name</Th>
              <Th>Count</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {false ? (
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
              <Tr className="text-red-500 text-[.8rem] font-semibold">
                <Td colSpan={4} textAlign={"center"}>
                  No one has used your codes
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </div>
    </>
  );
};

export default PromoCodeUserTable;
