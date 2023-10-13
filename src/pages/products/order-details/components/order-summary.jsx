import React from "react";
// import { useAdminOrderStore } from "../store";
// import { useQuery } from "@tanstack/react-query";

const OrderSummary = ({ data }) => {
  console.log("🚀 ~ file: order-summary.jsx:6 ~ OrderSummary ~ data:", data);
  // stores
  //   const getPromoCodes = useAdminOrderStore((state) => state.getPromoCodes);
  //   const { data: codes } = useQuery(["get", "order"], getPromoCodes);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [purchasePrice, setPurchasePrice] = React.useState(0);
  React.useEffect(() => {
    let purchasePrice = 0;
    let totalPrice = 0;
    Array.isArray(data) &&
      data?.forEach((item) => {
        purchasePrice += item?.purchasePrice;
        totalPrice += item?.totalPrice;
      });

    setTotalPrice(totalPrice);
    setPurchasePrice(purchasePrice);
  }, [data]);
  return (
    <>
      <div className="w-full @[750px]:w-[20em] @[1000px]:w-[25em] px-4 pt-2 border rounded-sm border-l-[4px] shadow pb-5 h-[8.5em] ">
        {/* <h3 className="font-semibold text-[#585858]">Available Promo Codes</h3>
        <div className="my-3">
          <select
            name=""
            id=""
            className="w-full py-[.4em] border outline-transparent pl-2"
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
        <p className="h-[2px] bg-gray-300 my-3" /> */}
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
        {/* <button className="w-full py-2 mt-5 capitalize bg-[teal] border border-[teal] text-white hover:bg-[teal]/80 hover:border-[teal]/80 rounded-sm">
          place order
        </button> */}
      </div>
    </>
  );
};

export default OrderSummary;
