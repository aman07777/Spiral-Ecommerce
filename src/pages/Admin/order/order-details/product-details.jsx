import React from "react";
import { imageUrl } from "../../../../global/config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { handleToast } from "../../../../global/toast";
import { useAdminOrderStore } from "../store";

const ProductDetails = ({ products, id: orderId }) => {
  const toast = useToast();
  const client = useQueryClient();

  //stores
  const updateProductStatus = useAdminOrderStore(
    (state) => state.updateProductStatus
  );
  // updating the status of the ordered product
  const { mutate, isLoading } = useMutation({
    mutationKey: ["update", "order", "product", "status", orderId],
    mutationFn: updateProductStatus,
    onSuccess: () => {
      client.invalidateQueries(["get", "order", orderId]);
      handleToast(
        toast,
        "Status changed",
        "Status updated successfully",
        "success"
      );
    },
    onError: () => {
      handleToast(
        toast,
        "Error",
        "Something went wrong while updating the status",
        "error"
      );
    },
  });
  // handles the status change of the ordered product
  const handleStatusChange = (e, orderedProductId, status) => {
    e.preventDefault();
    // const status = e.target.textContent.toLowerCase();
    mutate({ orderId, orderedProductId, status });
  };

  return (
    <>
      <div className="flex-1 p-2 px-3 border rounded-sm border-l-[4px] shadow text-[#585858] h-[30em] overflow-y-scroll">
        <h3 className="font-semibold ">Product Details</h3>
        <div className="mt-5 min-h-[10em]">
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
                      <p className="relative flex justify-start">
                        <span className="mr-1">{product?.product?.name}</span>(
                        <span>{product?.quantity}</span>)
                      </p>
                    </div>
                    <div className="flex gap-x-1 text-[.75rem]">
                      <p>color: {product?.color || "NA"}</p>
                      <p>size: {product?.size || "NA"}</p>
                    </div>
                  </div>
                </div>
                <div className="text-[.6rem] border rounded-full px-2 pb-[.1rem] relative">
                  <span className="cursor-pointer peer w-[8em]">
                    {isLoading ? "Loading..." : product?.status}
                  </span>
                  <div className="absolute top-3 left-0 text-[.7rem] text-[#585858] border-x peer-hover:block hover:block hidden z-10">
                    <div className="flex flex-col gap-y-[.1rem] backdrop-blur px-2 mt-2 w-[8em]">
                      {product?.status !== "Not_processed" && (
                        <p
                          className="cursor-pointer hover:scale-[1.03] transition-[scale] duration-300"
                          onClick={(e) =>
                            handleStatusChange(e, product._id, "Not_processed")
                          }
                        >
                          Not_processed
                        </p>
                      )}

                      {product?.status !== "Processing" && (
                        <p
                          className="cursor-pointer hover:scale-[1.03] transition-[scale] duration-300"
                          onClick={(e) =>
                            handleStatusChange(e, product._id, "Processing")
                          }
                        >
                          Processing
                        </p>
                      )}
                      {product?.status !== "Shipped" && (
                        <p
                          className="cursor-pointer hover:scale-[1.03] transition-[scale] duration-300"
                          onClick={(e) =>
                            handleStatusChange(e, product._id, "Shipped")
                          }
                        >
                          Shipped
                        </p>
                      )}
                      {product?.status !== "Delivered" && (
                        <p
                          className="cursor-pointer hover:scale-[1.03] transition-[scale] duration-300"
                          onClick={(e) =>
                            handleStatusChange(e, product._id, "Delivered")
                          }
                        >
                          Delivered
                        </p>
                      )}
                      {/* {product?.status !== "Cancelled" && (
                        <p
                          className="cursor-pointer hover:scale-[1.03] transition-[scale] duration-300"
                          onClick={(e) =>
                            handleStatusChange(e, product._id, "Cancelled")
                          }
                        >
                          Cancelled
                        </p>
                      )} */}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-2 text-[.8rem]">
                  <p className="flex items-center gap-x-1">
                    <span>Rs.</span>
                    <span>{Number(product?.purchasePrice).toFixed(2)}</span>
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
