import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
const OrderTable = ({ data }) => {
  return (
    <>
      <div className="md:px-4 class">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Customer Name</Th>
              <Th>Product Name</Th>
              <Th>Quantity</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(data) && data?.length > 0 ? (
              data.map((order) => (
                <Tr key={order._id}>
                  <Td>{order?.shippingInfo?.fullName}</Td>
                  <Td>{order.productName || "unknown"}</Td>
                  <Td>{order.quantity || 0}</Td>
                  <Td>Rs. {order.price || 0}</Td>
                </Tr>
              ))
            ) : (
              <Tr className="text-red-500 text-[.8rem] font-semibold">
                <Td colSpan={4} className="text-center" c>
                  No any orders are available
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </div>
    </>
  );
};

export default OrderTable;
