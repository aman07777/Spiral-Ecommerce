import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { useAdminOrderStore } from "../store";
import Dashboard from "../../Dashboard";
import BreadCrumb from "./breadcrumb";
import UserDetails from "./user-details";
import ProductDetails from "./product-details";
import OrderSummary from "./order-summary";
const OrderDetails = () => {
  const { id } = useParams();
  // stores
  const getOrder = useAdminOrderStore((state) => state.getOrderById);
  const { data: order } = useQuery(["get", "order", id], () => getOrder(id));
  return (
    <>
      <Dashboard />
      <BreadCrumb />
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

export default OrderDetails;
