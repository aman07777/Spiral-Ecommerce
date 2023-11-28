import React from "react";
import { imageUrl } from "../../../../global/config";
import { useAdminOrderStore } from "../store";
import { MdDeleteForever } from "react-icons/md";
import useMutate from "../../hooks/useMutate";

const ProductDetails = ({ products, id: orderId }) => {
  //stores
  const updateProductStatus = useAdminOrderStore(
    (state) => state.updateProductStatus
  );
  const { mutate: changeStatusMutate, isLoading: changeStatusIsLoading } =
    useMutate(
      ["update", "order", "product", "status", orderId],
      updateProductStatus,
      ["get", "order", orderId],
      "Status changed",
      "Status updated successfully",
      "Error",
      "Something went wrong while cancelling the order"
    );
  const {} = useMutate(["cancel", "order", "product", orderId]);
  // handles the status change of the ordered product
  const handleStatusChange = (e, orderedProductId, status) => {
    e.preventDefault();
    // const status = e.target.textContent.toLowerCase();
    changeStatusMutate({ orderId, orderedProductId, status });
  };

  return (
    <>
      <div className="flex-1 p-2 px-3 border rounded-sm border-l-[4px] shadow text-[#585858] h-[30em] overflow-y-scroll">
        <h3 className="font-semibold ">Product Details</h3>
        <div className="mt-5 min-h-[10em]">
          {Array.isArray(products) &&
            products.map((product) => (
              <div
                className="flex items-center justify-between px-2 mb-2 rounded-sm shadow shadow-gray-200 bg-slate-100 @container relative py-[.75em]"
                key={product._id}
              >
                <button
                  title={`Delete ${product?.product?.name}`}
                  className="absolute text-red-500 border border-red-500 rounded-sm right-1 top-1 @[30em]:hidden"
                >
                  <MdDeleteForever className="text-[1em]" />
                </button>
                <div className="flex gap-x-2 w-[15em] items-center">
                  <img
                    src={`${imageUrl}/${product?.product?.images?.[0]}`}
                    alt={product?.product?.name}
                    className="h-[3em] w-[4em]"
                  />
                  <div className="">
                    <div className="">
                      <p className="relative flex items-end justify-start ">
                        <span className="text-[.85rem] min-[600px]:text-[.9rem] ">
                          {product?.product?.name}
                        </span>
                        <span className="text-[.85rem]">
                          ({product?.quantity})
                        </span>
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
                    {changeStatusIsLoading ? "Loading..." : product?.status}
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
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-x-2 text-[.8rem] min-[1300px]:text-[.95rem]">
                  <p className="flex items-center gap-x-1">
                    <span>Rs.</span>
                    <span>{Number(product?.purchasePrice).toFixed(2)}</span>
                  </p>
                  <button
                    title={`Delete ${product?.product?.name}`}
                    className="@[30em]:block hidden text-red-500 border border-red-500 rounded-sm  "
                  >
                    <MdDeleteForever className="text-[1.5em]" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
