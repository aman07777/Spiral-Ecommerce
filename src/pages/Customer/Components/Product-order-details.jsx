import React from "react";
import { imageUrl } from "../../../global/config";


const ProductDetails = ({ products }) => {
    console.log(products)

    return (
        <>
            <div className="flex-1 p-2 px-3 border rounded-sm border-l-[4px] shadow text-[#585858] h-[30em] overflow-y-scroll">
                <h3 className="font-semibold ">Product Details</h3>
                <div className="mt-5">
                    <div
                        className="pb-2 border-b-[2px] border-gray-200 flex justify-between items-center px-2"
                        key={products._id}
                    >
                        <div className="flex gap-x-2 w-[15em]">
                            <img
                                src={`${imageUrl}/${products?.[0].product?.images?.[0]}`}
                                alt={products?.[0].products?.name}
                                className="h-[3em] w-[4em] "
                            />
                            <div className="">
                                <div className="">
                                    <p className="relative flex justify-start gap-x-1">
                                        <span className="">{products?.[0].product?.name}</span>
                                    </p>
                                </div>
                                <div className="flex gap-x-1 text-[.75rem]">
                                    <p>color: {products?.[0].color || "NA"}</p>
                                    <p>size: {products?.[0].size || "NA"}</p>
                                </div>
                            </div>
                        </div>
                        <p>Qty: {products?.[0].quantity}</p>
                        <div className="flex items-center gap-x-2">
                            <p>Rs. {Number(products?.[0].purchasePrice).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetails;
