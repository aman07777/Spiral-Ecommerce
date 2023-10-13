import React from "react";
import { useOrderStore } from "../../product-details/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { handleToast } from "../../../../global/toast";
import { useBuyStore } from "./store";
const OrderSummary = ({ data }) => {
  const toast = useToast();
  const client = useQueryClient();
  // stores
  const getPromoCodes = useOrderStore((state) => state.getPromoCodes);
  const makeOrder = useOrderStore((state) => state.makeOrder);
  const shippingInfo = useBuyStore((state) => state.shippingInfo);
  const orderItems = useBuyStore((state) => state.orderItems);
  // states
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [purchasePrice, setPurchasePrice] = React.useState(0);
  // react query
  const { data: codes } = useQuery(["get", "order"], getPromoCodes);
  const { isLoading, isError, mutate } = useMutation({
    mutationKey: ["make", "order"],
    mutationFn: makeOrder,
    onSuccess: (data) => {
      if (data === true) {
        client.invalidateQueries();
        handleToast(toast, "Success", "Order placed successfully", "success");
      }
    },
    onError: (error) => handleToast(toast, "Error", error.message, "error"),
  });
  isError && handleToast(toast, "Error", "Something went wrong", "error");
  // use effects
  React.useEffect(() => {
    let purchasePrice = 0;
    let totalPrice = 0;
    Array.isArray(orderItems) &&
      orderItems?.forEach((item) => {
        purchasePrice += item?.purchasePrice;
        totalPrice += item?.totalPrice;
      });

    setTotalPrice(totalPrice);
    setPurchasePrice(purchasePrice);
  }, [orderItems]);
  // handlers
  const handlePlaceOrderClick = () => {
    const orderData = {
      orderItems,
      shippingInfo,
    };
    mutate(orderData);
  };
  return (
    <>
      <div className="w-full @[750px]:w-[20em] @[1000px]:w-[25em] px-4 pt-2 border rounded-sm border-l-[4px] shadow pb-5 h-fit">
        <h3 className="font-semibold text-[#585858]">Available Promo Codes</h3>
        <div className="my-3">
          <select
            name=""
            id=""
            className="w-full py-[.4em] border outline-transparent pl-2 focus:border"
          >
            <option value="">Select Promo Code</option>
            {Array.isArray(codes) &&
              codes.map(
                (code) =>
                  code.status === "active" && (
                    <option value={code._id}>{code.promoCode}</option>
                  )
              )}
          </select>
        </div>
        <p className="h-[2px] bg-gray-300 my-3" />
        <h3 className="font-semibold text-[#585858]">Order Summary</h3>
        <div className="flex justify-between w-full pr-4 mt-2">
          <div className="flex gap-y-[.2rem] flex-col">
            <p>Items Total:</p>
            <p>Delivery Fee:</p>
            <p>Total Payment:</p>
          </div>
          <div className="flex gap-y-[.2rem] flex-col items-end">
            <p>Rs. {totalPrice}</p>
            <p>Rs. 115</p>
            <p>Rs. {purchasePrice}</p>
          </div>
        </div>
        <button
          className="w-full py-2 mt-5 capitalize bg-[teal] border border-[teal] text-white hover:bg-[teal]/80 hover:border-[teal]/80 rounded-sm"
          onClick={() => handlePlaceOrderClick()}
        >
          {isLoading ? "Ordering..." : "place order"}
        </button>
      </div>
    </>
  );
};

export default OrderSummary;
