import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAdminOrderStore } from "../store";
import Dashboard from "../../Dashboard";
import BreadCrumb from "./breadcrumb";
import UserDetails from "./user-details";
import ProductDetails from "./product-details";
import OrderSummary from "./order-summary";
import { IoIosCloseCircle } from "react-icons/io";

const OrderDetails = () => {
  const { id } = useParams();
  // stores
  const getOrder = useAdminOrderStore((state) => state.getOrderById);
  const { data: order } = useQuery(["get", "order", id], () => getOrder(id));

  const [isOpen, setIsOpen] = useState(false);
  const imgSrc = "https://blog.esewa.com.np/assets/upload/images/Final.png";

  return (
    <>
      <div className=" mb-5 relative ">
        <Dashboard />
        <BreadCrumb />
        <div className="px-4 @container">
          <UserDetails user={order?.shippingInfo} />
          <div className="flex flex-col mt-5 gap-y-3 gap-x-3 @[750px]:flex-row">
            <ProductDetails products={order?.orderItems} />
            <div className="flex flex-col gap-y-3">
              <OrderSummary data={order?.orderItems} />
              <div className="">
                <div className="flex justify-center">
                  <img src={imgSrc} alt="Esewa transaction" className="h-[20em] rounded cursor-pointer" onClick={() => setIsOpen(true)} />
                </div>

              </div>
            </div>
          </div >
        </div >
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="p-6 rounded shadow-lg">
              <button className="float-right text-lg font-bold" onClick={() => setIsOpen(false)}><IoIosCloseCircle size={25} /></button>
              <img className="mt-2 " src={imgSrc} alt="Esewa transaction" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
