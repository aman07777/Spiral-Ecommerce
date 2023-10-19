import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import ProductDetails from '../Components/Product-order-details'
import OrderSummary from '../Components/OrderSummary-details'
import UserDetails from '../../Admin/order/order-details/user-details'

const OrderDetailsCustomer = ({ props, details }) => {
    return (
        <>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[30rem]  pb-5">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <span className='font-bold'>OrderDetails</span>
                    <i className="p-1 ml-auto float-right" onClick={() => props(false)}>
                        <AiOutlineClose
                            size={30}
                            className="text-red-900 block cursor-pointer"
                        />
                    </i>
                </div>
                {/* body  */}
                {/*body*/}
                <div className="relative p-6 flex-auto break-words space-y-3 overflow-y-scroll md:w-[45rem]">
                    {/* body */}
                    <div className="flex flex-col mt-[-2rem] gap-y-3 gap-x-3 @[750px]:flex-row">
                        <UserDetails user={details?.shippingInfo} />
                        <ProductDetails products={details?.orderItems} />
                        <OrderSummary data={details?.orderItems[0]} />
                    </div >
                </div>
            </div>

        </>
    )
}

export default OrderDetailsCustomer