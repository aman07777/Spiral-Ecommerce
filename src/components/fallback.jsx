import React from "react";

const Fallback = ({ error, resetErrorBoundary }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="w-[20em]">
          <p className="text-[.8rem] text-[#585858] font-semibold">
            Something went wrong:
          </p>
          <pre className="text-red-500 font-semibold text-[1.5rem] leading-5">
            {error?.message || "An error has occurred."}
          </pre>
        </div>
        <div className="relative mt-5 group">
          <svg
            viewBox="0 0 1024 1024"
            fill="#585858"
            className="w-6 duration-200 icon hover:scale-125 hover:stroke-blue-500"
          >
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g>
              <path
                fill="#585858"
                d="M224 480h640a32 32 0 110 64H224a32 32 0 010-64z"
              ></path>
              <path
                fill="#585858"
                d="M237.248 512l265.408 265.344a32 32 0 01-45.312 45.312l-288-288a32 32 0 010-45.312l288-288a32 32 0 1145.312 45.312L237.248 512z"
              ></path>
            </g>
          </svg>
          <span
            className="absolute top-0 left-[50%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-2 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100 cursor-pointer"
            onClick={() => {
              resetErrorBoundary();
              window.history.back();
            }}
          >
            Back
          </span>
        </div>
      </div>
    </>
  );
};

export default Fallback;
