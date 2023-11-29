import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAdminOrderStore } from "../store";
import { IoIosCloseCircle } from "react-icons/io";
import Dashboard from "../../Dashboard";
import BreadCrumb from "./breadcrumb";
import UserDetails from "./user-details";
import ProductDetails from "./product-details";
import OrderSummary from "./order-summary";
import CancellationButtons from "./cancellation-buttons";
import { imageUrl } from "../../../../global/config";

const OrderDetails = () => {
  const { id } = useParams();
  // stores
  const getOrder = useAdminOrderStore((state) => state.getOrderById);
  const { data: order } = useQuery(["get", "order", id], () => getOrder(id));

  const [isOpen, setIsOpen] = useState(false);
  // const imgSrc = "https://blog.esewa.com.np/assets/upload/images/Final.png";

  return (
    <>
      <div className="relative mb-5 ">
        <Dashboard />
        <BreadCrumb />
        <div className="px-4 @container">
          <div className="w-full p-2 px-3 mt-5 border rounded-sm border-l-[4px] shadow flex flex-col min-[800px]:flex-row min-[800px]:justify-between min-[800px]:items-center">
            <UserDetails user={order?.shippingInfo} />
            <CancellationButtons id={id} />
          </div>
          <div className="flex flex-col mt-5 gap-y-3 gap-x-3 @[750px]:flex-row">
            <ProductDetails products={order?.orderItems} id={id} />
            <div className="flex flex-col gap-y-3">
              <OrderSummary data={order?.orderItems} />
              <div className=" @[750px]:w-[20em] @[1000px]:w-[25em]">
                <div className="flex justify-center">
                  <img
                    src={`${imageUrl}/${order?.paymentMethod?.image}`}
                    alt={`${order?.paymentMethod?.method} payment method`}
                    className="max-h-[20em] rounded cursor-pointer w-full"
                    onClick={() => setIsOpen(true)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="p-6 rounded shadow-lg">
              <button
                className="float-right text-lg font-bold"
                onClick={() => setIsOpen(false)}
              >
                <IoIosCloseCircle size={25} />
              </button>
              <img
                className="mt-2 "
                src={`${imageUrl}/${order?.paymentMethod?.image}`}
                alt={`${order?.paymentMethod?.method} payment method`}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OrderDetails;
