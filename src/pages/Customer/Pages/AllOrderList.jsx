import React, { useState } from "react";
import { imageUrl } from "../../../global/config";
import { BsFillInfoSquareFill } from "react-icons/bs";
import OrderDetailsCustomer from "./OrderDetailsCustomer";

const AllOrderList = ({ val }) => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  function handleOpenDetials(newValue) {
    setIsOpenDetails(newValue);
  }
  return (
    <>
      {Array.isArray(val?.orderItems) &&
        val?.orderItems.length > 0 &&
        val?.orderItems.map((item) => (
          <div className="p-5 bg-gray-100 rounded-md cursor-pointer" key={item._id} >
            <div className="w-[100%] flex items-end justify-end">
              <span>
                <BsFillInfoSquareFill
                  size={20}
                  className="text-[#585858] cursor-pointer"
                  title="More Info"
                  onClick={() => handleOpenDetials(true)}
                />
              </span>
            </div>
            <div className="flex max-[1099px]:flex-col" key={item?._id}>
              <div className="w-full min-[1099px]:w-[60%] flex">
                <img
                  src={`${imageUrl}/${item?.product.images[0]}`}
                  className="w-[5rem] h-[5rem] object-cover"
                  alt="img-"
                />
                <div className="flex flex-col px-3 gap-y-2">
                  <span className="text-sm font-semibold line-clamp-1">
                    {item.product.name}
                  </span>
                  <span className="text-xs">Color family: {item?.color}</span>
                </div>
              </div>
              <div className="flex flex-col gap-y-2 w-full min-[1099px]:w-[20%] ">
                <div className="mt-4 min-[1099px]:mt-0">
                  <span
                    className={`text-xs px-2 pb-[1px] text-[#008080] rounded-l-full rounded-r-full tracking-wide ${
                      item.status === "Not_processed" &&
                      "text-blue-700 bg-blue-200 border-2 border-blue-500"
                    }
                            ${
                              item.status === "Processing" &&
                              "text-yellow-700 bg-yellow-200 border-2 border-yellow-500"
                            }
                            ${
                              item.status === "Shipped" &&
                              "text-gray-700 bg-gray-200 border-2 border-gray-500"
                            }
                            ${
                              item.status === "Cancelled" &&
                              "text-red-700 bg-red-200 border-2 border-red-500"
                            } ${
                      item.status === "Delivered" &&
                      "text-green-700 bg-green-300 border-2 border-green-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
              <div className="w-full min-[1099px]:w-[20%] flex flex-col items-end min-[1099px]:items-center justify-center gap-y-3">
                <span className="cursor-pointer text-[#008080]">
                  Rs.
                  {(item.purchasePrice + Number(150)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      {isOpenDetails && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto shadow-2xl outline-none focus:outline-none">
            <div className="relative w-auto max-w-3xl mx-auto my-6">
              <OrderDetailsCustomer props={handleOpenDetials} details={val} />
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
        </>
      )}
    </>
  );
};

export default AllOrderList;
