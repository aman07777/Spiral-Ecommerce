import React from 'react'
import { AiOutlineClose } from "react-icons/ai";


const AddressForm = ({props}) => {
  return (
    <>
     <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[30rem]  pb-5">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <span className='font-bold'>Add your delivery and billing address</span>
                    <i className="p-1 ml-auto float-right" onClick={() => props(false)}>
                        <AiOutlineClose
                            size={30}
                            className="text-red-900 block cursor-pointer"
                        />
                    </i>
                </div>
                {/* body  */}
                {/*body*/}
                <div className="relative p-6 flex-auto break-words space-y-3 overflow-y-scroll">
                    {/* User personal detail Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                            <span className='text-sm font-semibold'>Full Name</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="border border-gray-400 rounded-md pl-3 py-2 w-72 md:w-96 text-sm"

                                />
                            </div>
                        </div>
                        <div>
                            <span className='text-sm font-semibold'>Phone Number</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter your phone number"
                                    className="border border-gray-400 rounded-md pl-3 py-2 w-72 md:w-96 text-sm"

                                />
                            </div>
                        </div>
                        <div>
                            <span className='text-sm font-semibold'>Birthday</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="1999-01-11"
                                    className="border border-gray-400 rounded-md pl-3 py-2 w-72 md:w-96 text-sm"

                                />
                            </div>
                        </div>
                        {/* <div className="w-full flex items-center justify-center">
                            <span
                                className="mt-4 px-8 py-2 rounded-md bg-[#008080] text-white cursor-pointer"

                            >
                                Save
                            </span>
                        </div> */}
                    </div>
                </div>
            </div>
    
    </>
  )
}

export default AddressForm