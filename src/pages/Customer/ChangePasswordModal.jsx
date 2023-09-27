import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


const ChangePasswordModal = ({ props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);


  return (
    <>
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none pb-5">
        {/*header*/}
        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
          <span className='font-bold'>Change your password</span>
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
          <div className="flex flex-col gap-3">
            <div>
              <span className='text-sm font-semibold'>Old password</span>
              <div className="flex items-center gap-2">
                {/* for password  */}
                <div className="w-full relative flex items-center justify-between">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter old password"
                    className="border border-gray-400 rounded-md pl-3 py-2 w-72 md:w-96 text-sm"
                  // onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                  >
                    {showPassword ? (
                      <AiFillEye className="h-5 w-5" />
                    ) : (
                      <AiFillEyeInvisible className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <span className='text-sm font-semibold'>New Password</span>
              <div className="flex items-center gap-2">
                <div className="w-full relative flex items-center justify-between">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="border border-gray-400 rounded-md pl-3 py-2 w-72 md:w-96 text-sm"
                  // onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                  >
                    {showPassword ? (
                      <AiFillEye className="h-5 w-5" />
                    ) : (
                      <AiFillEyeInvisible className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center justify-center">
              <span
                className="mt-4 px-8 py-2 rounded-md bg-[#008080] text-white cursor-pointer"

              >
                Save
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChangePasswordModal