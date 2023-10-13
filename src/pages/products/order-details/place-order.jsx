import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import UserDetails from "./components/user-details";
import ProductDetails from "./components/product-details";
import OrderSummary from "./components/order-summary";
import { useAdminOrderStore } from "../../Admin/order/store";


const PlaceOrder = () => {
  const { id } = useParams();
  // stores
  const getOrder = useAdminOrderStore((state) => state.getOrderById);
  const { data: order } = useQuery(["get", "order", id], () => getOrder(id));
  return (
    <>
      <div className="px-4 @container">
        <UserDetails user={order?.shippingInfo} />
        <div className="flex flex-col mt-5 gap-y-3 gap-x-3 @[750px]:flex-row">
          <ProductDetails products={order?.orderItems} />
          <OrderSummary data={order?.orderItems} />
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
