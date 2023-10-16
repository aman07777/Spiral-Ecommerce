import React from "react";
import { imageUrl } from "../../../../global/config";
import { useBuyStore } from "./store";
import { getPurchasePrice } from "../helper";
import { useNavigate } from "react-router-dom";

import { useToast } from "@chakra-ui/react";
import { handleToast } from "../../../../global/toast";

const ProductDetails = () => {
  const navigate = useNavigate();
  const toast = useToast();
  // stores
  const products = useBuyStore((state) => state.orderItems);

  const replaceOrderItems = useBuyStore((state) => state.replaceOrderItems);
  // handlers
  const handleQuantityIncrease = (e, product) => {
    e.stopPropagation();
    let count = 0;
    Array.isArray(products) &&
      products.forEach((item) => {
        if (item.product === product.product) count += item.quantity;
      });
    if (count >= product.available) {
      handleToast(
        toast,
        "Error",
        "You can't add more than available quantity",
        "error"
      );
      return;
    }
    replaceOrderItems(
      Array.isArray(products) &&
        products.map((item) =>
          item.product === product.product &&
          product.color === item.color &&
          product.size === item.size
            ? {
                ...item,
                quantity:
                  item.quantity < item.available
                    ? item.quantity + 1
                    : item.quantity,
              }
            : item
        )
    );
  };
  const handleQuantityDecrease = (e, product) => {
    e.stopPropagation();
    replaceOrderItems(
      Array.isArray(products) &&
        products.map((item) =>
          item.product === product.product &&
          product.color === item.color &&
          product.size === item.size
            ? {
                ...item,
                quantity: item.quantity > 1 ? item.quantity - 1 : 1,
              }
            : item
        )
    );
  };
  return (
    <>
      <div className="flex-1 p-2 px-3 border rounded-sm border-l-[4px] shadow text-[#585858] h-[30em] overflow-y-scroll">
        <h3 className="font-semibold ">Product Details</h3>
        <div className="flex flex-col mt-5 gap-y-2">
          {Array.isArray(products) &&
            products.map((product) => (
              <div
                onClick={() => navigate(`/products/${product?.product}`)}
                key={`${product.product}-${product.color}-${product.size}`}
                className="pb-2 border-b-[2px] border-gray-200 flex justify-between items-center px-2"
              >
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
                <p className="flex items-center gap-x-1">
                  <span
                    className="w-[1.75em] pb-1 border cursor-pointer select-none text-center"
                    onClick={(e) => handleQuantityDecrease(e, product)}
                  >
                    -
                  </span>
                  {product?.quantity}
                  <span
                    className="w-[1.75em] pb-1 border cursor-pointer select-none text-center"
                    onClick={(e) => handleQuantityIncrease(e, product)}
                  >
                    +
                  </span>
                </p>
                <div className="flex items-center gap-x-2">
                  <p className="flex text-[.85rem] bg-slate-200 gap-x-1 px-1 rounded">
                    {product?.quantity > 0 && (
                      <span className="line-through">
                        Rs.{product?.quantity * product?.price}
                      </span>
                    )}
                    {product?.discount > 0 && <span>{product?.discount}%</span>}
                  </p>
                  <p>
                    Rs.
                    {getPurchasePrice(
                      product.price,
                      product.quantity,
                      product.discount
                    )}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
