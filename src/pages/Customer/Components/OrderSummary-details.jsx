import React from "react";

const OrderSummary = ({ data }) => {
    let purchasePrice = data?.purchasePrice + 150;
    let totalPrice = data?.totalPrice;
 
  return (
    <>
      <div className="w-full @[750px]:w-[20em] @[1000px]:w-[25em] px-4 pt-2 border rounded-sm border-l-[4px] shadow pb-5 h-[9.5em] ">
        <h3 className="font-semibold text-[#585858]">Order Summary</h3>
        <div className="flex justify-between w-full pr-4 mt-2">
          <div className="flex gap-y-[.2rem] flex-col">
            <p>Items Total:</p>
            <p>Delivery Fee:</p>
            <p>Total Payment with discount:</p>
          </div>
          <div className="flex gap-y-[.2rem] flex-col items-end">
            <p>Rs. {Number(totalPrice).toFixed(2)}</p>
            <p>Rs. {Number(150).toFixed(2)}</p>
            <p>Rs. {Number(purchasePrice).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
