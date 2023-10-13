import React from "react";
import { imageUrl } from "../../../../global/config";
import { useBuyStore } from "./store";
const ProductDetails = () => {
  const products = useBuyStore((state) => state.orderItems);
  return (
    <>
      <div className="flex-1 p-2 px-3 border rounded-sm border-l-[4px] shadow text-[#585858] h-[30em] overflow-y-scroll">
        <h3 className="font-semibold ">Product Details</h3>
        <div className="flex flex-col mt-5 gap-y-2">
          {Array.isArray(products) &&
            products.map((product) => (
              <div className="pb-2 border-b-[2px] border-gray-200 flex justify-between items-center px-2">
                <div className="flex gap-x-2">
                  <img
                    src={`${imageUrl}/${product?.image}`}
                    alt={product?.name}
                    className="h-[3em] w-[4em]"
                  />
                  <div className="">
                    <div className="">
                      <p className="flex justify-start gap-x-1">
                        <span>{product?.name}</span>
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
                  <p className="flex text-[.85rem] bg-slate-200 gap-x-1 px-1 rounded">
                    {product?.totalPrice > 0 && (
                      <span className="line-through">
                        Rs.{product?.totalPrice}
                      </span>
                    )}
                    {product?.product?.discount > 0 && (
                      <span>{product?.product?.discount}%</span>
                    )}
                  </p>
                  <p>Rs.{product?.purchasePrice}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
