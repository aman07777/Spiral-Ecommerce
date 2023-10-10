import React from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";


const OrderHistory = ({val}) => {
    return (
        <>
        <div className="p-5 bg-gray-100 cursor-pointer rounded-md">
                <div className="w-[100%] flex items-end justify-end">
                    <span><AiOutlineCloseCircle size={20} className="cursor-pointer text-orange-700" /></span>
                </div>
                {/* one item  */}
                <div className="flex min-[320px]:flex-col md:flex-row ">
                    <div className="w-full md:w-[60%] flex">
                        <img src={val.image} className="w-[5rem] object-cover" />
                        <div className="px-3 flex flex-col gap-y-2">
                            <span className="text-sm font-semibold">{val.name}</span>
                            <span className="text-xs">Color family: {val.color}</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-2 w-full md:w-[20%] ">
                        <div className='mt-4 md:mt-0'>
                            <span className={`text-xs px-2 pb-[1px] text-[#008080] rounded-l-full rounded-r-full tracking-wide ${val.status === "pending" && "text-yellow-700 bg-yellow-200 border-2 border-yellow-500"} ${val.status === "canceled" && "text-red-700 bg-red-200 border-2 border-red-500"} ${val.status === "sold" && "text-green-700 bg-green-300 border-2 border-green-500"}`}> {val.status}</span>
                        </div>
                    </div>
                    <div className="w-full md:w-[20%] flex flex-col items-end  md:items-center justify-center gap-y-3">
                        <span className="cursor-pointer text-[#008080]">Rs.{val.price}</span>
                    </div>
                </div>
                {/* one item end  */}
            </div>
        </>
    )
}

export default OrderHistory