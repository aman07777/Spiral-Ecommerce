import React from "react";
import { useOrderStore } from "../../product-details/store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { handleToast } from "../../../../global/toast";
import { useBuyStore } from "./store";
import {
  getDiscountAmount,
  checkShippingInfo,
  getPurchasePrice,
  getTotalPrice,
} from "../helper";
const OrderSummary = ({ onOpen }) => {
  const toast = useToast();
  const client = useQueryClient();
  // stores
  const getPromoCodes = useOrderStore((state) => state.getPromoCodes);
  const makeOrder = useOrderStore((state) => state.makeOrder);
  const shippingInfo = useBuyStore((state) => state.shippingInfo);
  const orderItems = useBuyStore((state) => state.orderItems);
  // states
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [selectedPromoCode, setSelectedPromoCode] = React.useState(null);
  const [selectedPromoCodeDiscount, setSelectedPromoCodeDiscount] =
    React.useState(0);
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
    onError: () =>
      handleToast(toast, "Error", "Unable to place order", "error"),
  });
  isError && handleToast(toast, "Error", "Something went wrong", "error");
  // use effects
  React.useEffect(() => {
    let purchasePrice = 0;
    let totalPrice = 0;
    Array.isArray(orderItems) &&
      orderItems?.forEach((item) => {
        purchasePrice += getPurchasePrice(
          item.price,
          item.quantity,
          item.discount
        );
        totalPrice += getTotalPrice(item.price, item.quantity);
      });
    setTotalPrice(totalPrice);
    setPurchasePrice(purchasePrice);
  }, [orderItems]);
  React.useEffect(() => {
    if (selectedPromoCode) {
      const discountAmount = getDiscountAmount(
        selectedPromoCodeDiscount,
        purchasePrice
      );
      setPurchasePrice(purchasePrice - discountAmount);
    }
  }, [selectedPromoCodeDiscount]);

  // handlers
  const handlePlaceOrderClick = () => {
    if (!checkShippingInfo(shippingInfo)) {
      handleToast(
        toast,
        "Error",
        "Please fill all the required shipping information",
        "error"
      );
      onOpen();
      return;
    }
    const orderData = {
      orderItems:
        Array.isArray(orderItems) &&
        orderItems.map((item) => {
          item.purchasePrice = getPurchasePrice(
            item.price,
            item.quantity,
            item.discount
          );
          item.totalPrice = getTotalPrice(item.price, item.quantity);
        }),
      shippingInfo,
      promoCode: selectedPromoCode,
      purchasePrice,
    };
    mutate(orderData);
  };
  const handleSelectChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const id = selectedOption.dataset.id;
    const discount = selectedOption.dataset.discount;
    setSelectedPromoCode(id);
    setSelectedPromoCodeDiscount(discount);
  };

  return (
    <>
      <div className="w-full @[750px]:w-[20em] @[1000px]:w-[25em] px-4 pt-2 border rounded-sm border-l-[4px] shadow pb-5 h-fit">
        <h3 className="font-semibold text-[#585858]">Available Promo Codes</h3>
        <div className="my-3">
          <select
            className="w-full py-[.4em] border outline-transparent pl-2 focus:border"
            onChange={handleSelectChange}
          >
            <option value={0} data-id={null} data-discount={0}>
              Select Promo Code
            </option>
            {Array.isArray(codes) &&
              codes.map(
                (code) =>
                  code.status === "active" && (
                    <option
                      key={code._id}
                      data-id={code._id}
                      data-discount={code.discountPercentage}
                    >
                      {code.promoCode}
                    </option>
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
            <p>Rs. {Number(totalPrice).toFixed(2)}</p>
            <p>Rs. {Number(150).toFixed(2)}</p>
            <p>Rs. {Number(purchasePrice + 150).toFixed(2)}</p>
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
