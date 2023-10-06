import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const EditProfile = ({ props }) => {
  return (
    <>
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[30rem]  pb-5">
        {/*header*/}
        <div className="flex items-start justify-between p-5 border-b border-solid rounded-t border-slate-200">
          <span className="font-bold">Edit your profile</span>
          <i className="float-right p-1 ml-auto" onClick={() => props(false)}>
            <AiOutlineClose
              size={30}
              className="block text-red-900 cursor-pointer"
            />
          </i>
        </div>
        {/* body  */}
        {/*body*/}
        <div className="relative flex-auto p-6 space-y-3 overflow-y-scroll break-words">
          {/* User personal detail Section */}
          <div className="flex flex-col gap-3">
            <div>
              <span className="text-sm font-semibold">Full Name</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="John Doe"
                  className="py-2 pl-3 text-sm border border-gray-400 rounded-md w-72 md:w-96"
                />
              </div>
            </div>
            <div>
              <span className="text-sm font-semibold">Email</span>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="johnDoe@gmail.com"
                  className="py-2 pl-3 text-sm border border-gray-400 rounded-md w-72 md:w-96"
                />
              </div>
            </div>
            <div>
              <span className="text-sm font-semibold">Phone Number</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="980342423"
                  className="py-2 pl-3 text-sm border border-gray-400 rounded-md w-72 md:w-96"
                />
              </div>
            </div>
            <div>
              <span className="text-sm font-semibold">Birthday</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="1999-01-11"
                  className="py-2 pl-3 text-sm border border-gray-400 rounded-md w-72 md:w-96"
                />
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <span className="mt-4 px-8 py-2 rounded-md bg-[#008080] text-white cursor-pointer">
                Save
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
