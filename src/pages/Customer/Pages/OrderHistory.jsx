import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

const OrderHistory = ({ val }) => {
  return (
    <>
      <div className="p-5 bg-gray-100 rounded-md cursor-pointer">
        <div className="w-[100%] flex items-end justify-end">
          <span>
            <AiOutlineCloseCircle
              size={20}
              className="text-orange-700 cursor-pointer"
            />
          </span>
        </div>
        {/* one item  */}
        <div className="flex min-[320px]:flex-col md:flex-row ">
          <div className="w-full md:w-[60%] flex">
            <img
              src={val.image}
              className="w-[5rem] object-cover"
              alt={val.name}
            />
            <div className="flex flex-col px-3 gap-y-2">
              <span className="text-sm font-semibold">{val.name}</span>
              <span className="text-xs">Color: {val.color}</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 w-full md:w-[20%] ">
            <div className="mt-4 md:mt-0">
              <span
                className={`text-xs px-2 pb-[1px] text-[#008080] rounded-l-full rounded-r-full tracking-wide ${
                  val.status === "Not_processed" &&
                  "text-blue-700 bg-blue-200 border-2 border-blue-500"
                }
                            ${
                              val.status === "Processing" &&
                              "text-yellow-700 bg-yellow-200 border-2 border-yellow-500"
                            }
                            ${
                              val.status === "Shipped" &&
                              "text-gray-700 bg-gray-200 border-2 border-gray-500"
                            }
                            ${
                              val.status === "Cancelled" &&
                              "text-red-700 bg-red-200 border-2 border-red-500"
                            } ${
                  val.status === "Delivered" &&
                  "text-green-700 bg-green-300 border-2 border-green-500"
                }`}
              >
                {val.status}
              </span>
            </div>
          </div>
          <div className="w-full md:w-[20%] flex flex-col items-end  md:items-center justify-center gap-y-3">
            <span className="cursor-pointer text-[#008080]">
              Rs.{val.price || 0}
            </span>
          </div>
        </div>
        {/* one item end  */}
      </div>
    </>
  );
};

export default OrderHistory;
