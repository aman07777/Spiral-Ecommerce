import React from "react";

const OrderSummary = ({ data }) => {
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
      </div>
    </>
  );
};

export default OrderSummary;
