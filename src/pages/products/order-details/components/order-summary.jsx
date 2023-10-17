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
  const [discount, setDiscount] = React.useState(0);
  const [promoCode, setPromoCode] = React.useState("");
  const [promoCodeDetails, setPromoCodeDetails] = React.useState({});
  const [purchasePrice, setPurchasePrice] = React.useState(0);
  // react query
  const { data: codes } = useQuery(["get", "order"], getPromoCodes);
  const { isLoading, isError, mutate } = useMutation({
    mutationKey: ["make", "order"],
    mutationFn: makeOrder,
    onSuccess: (data) => {
      if (data === true) {
        client.invalidateQueries();
        setDiscount(0);
        handleToast(toast, "Success", "Order placed successfully", "success");
      }
    },
    onError: () =>
      handleToast(toast, "Error", "Unable to place order", "error"),
  });
  isError && handleToast(toast, "Error", "Something went wrong", "error");

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
        orderItems.map((item) => ({
          ...item,
          purchasePrice: getPurchasePrice(
            item.price,
            item.quantity,
            item.discount
          ),
          totalPrice: getTotalPrice(item.price, item.quantity),
        })),
      shippingInfo,
      promoCode:
        Object.keys(promoCodeDetails || {}).length > 0 && promoCodeDetails?._id,
      totalBillAmount: purchasePrice,
    };
    mutate(orderData);
  };
  // use effects
  // calculate total price, purchase price and discount of the items to be purchased
  React.useEffect(() => {
    let purchasePrice = 0;
    let totalPrice = 0;
    let discount = 0;
    Array.isArray(orderItems) &&
      orderItems?.forEach((item) => {
        purchasePrice += getPurchasePrice(
          item.price,
          item.quantity,
          item.discount
        );
        totalPrice += getTotalPrice(item.price, item.quantity);
        discount += getDiscountAmount(
          item.discount,
          getTotalPrice(item.price, item.quantity)
        );
        console.log(
          getDiscountAmount(
            item.discount,
            getTotalPrice(item.price, item.quantity)
          )
        );
      });
    setTotalPrice(totalPrice);
    setPurchasePrice(purchasePrice);
    setDiscount(discount);
  }, [orderItems, setTotalPrice, setPurchasePrice, setDiscount]);
  // calculate purchase price after applying promo code
  React.useEffect(() => {
    if (Object.keys(promoCodeDetails || {}).length > 0) {
      setPurchasePrice(
        (prev) =>
          prev - getDiscountAmount(promoCodeDetails?.discountPercentage, prev)
      );
    } else {
      let purchasePrice = 0;
      Array.isArray(orderItems) &&
        orderItems?.forEach((item) => {
          purchasePrice += getPurchasePrice(
            item.price,
            item.quantity,
            item.discount
          );
        });
      setPurchasePrice(purchasePrice);
    }
  }, [setPurchasePrice, promoCodeDetails, orderItems]);
  // calculate discount after applying promo code
  React.useEffect(() => {
    if (Object.keys(promoCodeDetails || {}).length > 0) {
      setDiscount(
        (prev) =>
          prev +
          getDiscountAmount(promoCodeDetails?.discountPercentage, purchasePrice)
      );
    } else {
      let discount = 0;
      Array.isArray(orderItems) &&
        orderItems?.forEach((item) => {
          discount += getDiscountAmount(
            item.discount,
            getTotalPrice(item.price, item.quantity)
          );
        });
      setDiscount(discount);
    }
  }, [setDiscount, promoCodeDetails, purchasePrice, orderItems]);
  // o7jjhn dbkt2u uv67og
  // finds the promo code details from the promo codes array that matches the promo code entered by the user
  React.useEffect(() => {
    Array.isArray(codes) &&
      codes.length > 0 &&
      setPromoCodeDetails(
        codes.find(
          (code) => code.promoCode?.toLowerCase() === promoCode.toLowerCase()
        )
      );
  }, [promoCode, codes]);


  return (
    <>
      <div className="w-full @[750px]:w-[20em] @[1000px]:w-[25em] px-4 pt-2 border rounded-sm border-l-[4px] shadow pb-5 h-fit">
        <h3 className="font-semibold text-[#585858]">Available Promo Codes</h3>
        <div className="my-3">
          <input
            type="text"
            name="promo-code"
            className="w-full py-2 pl-2 border focus:outline-none focus:border-[#585858]/50 rounded-sm"
            placeholder="Enter Promo Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={Array.isArray(orderItems) && orderItems.length <= 0}
          />
        </div>
        <p className="h-[2px] bg-gray-300 my-3" />
        <h3 className="font-semibold text-[#585858]">Order Summary</h3>
        <div className="flex justify-between w-full pr-4 mt-2">
          <div className="flex gap-y-[.2rem] flex-col">
            <p>Items Total:</p>
            <p>Delivery Fee:</p>
            <p>Discount:</p>
            <p>Total Payment:</p>
          </div>
          <div className="flex gap-y-[.2rem] flex-col items-end">
            <p>Rs. {Number(totalPrice).toFixed(2)}</p>
            <p>Rs. {Number(150).toFixed(2)}</p>
            <p>
              Rs.{" "}
              {Array.isArray(orderItems) && orderItems.length > 0
                ? Number(discount).toFixed(2)
                : "00.00"}
            </p>
            <p>
              Rs.{" "}
              {Array.isArray(orderItems) && orderItems.length > 0
                ? Number(purchasePrice + 150).toFixed(2)
                : "00.00"}
            </p>
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
