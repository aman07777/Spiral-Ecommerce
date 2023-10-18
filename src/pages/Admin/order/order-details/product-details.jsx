import React from "react";
import { imageUrl } from "../../../../global/config";

const ProductDetails = ({ products }) => {
  return (
    <>
      <div className="flex-1 p-2 px-3 border rounded-sm border-l-[4px] shadow text-[#585858] h-[30em] overflow-y-scroll">
        <h3 className="font-semibold ">Product Details</h3>
        <div className="mt-5">
          {Array.isArray(products) &&
            products.map((product) => (
              <div
                className="pb-2 border-b-[2px] border-gray-200 flex justify-between items-center px-2"
                key={product._id}
              >
                <div className="flex gap-x-2 w-[15em]">
                  <img
                    src={`${imageUrl}/${product?.product?.images?.[0]}`}
                    alt={product?.product?.name}
                    className="h-[3em] w-[4em] "
                  />
                  <div className="">
                    <div className="">
                      <p className="relative flex justify-start gap-x-1">
                        <span className="">{product?.product?.name}</span>
                      </p>
                    </div>
                    <div className="flex gap-x-1 text-[.75rem]">
                      <p>color: {product?.color || "NA"}</p>
                      <p>size: {product?.size || "NA"}</p>
                    </div>
                  </div>
                </div>
                <p>Qty: {product?.quantity}</p>
                <div className="flex items-center gap-x-2">
                  <p>Rs. {Number(product?.purchasePrice).toFixed(2)}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
