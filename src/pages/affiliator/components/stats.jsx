import React from "react";

const Stats = () => {
  return (
    <>
      <div className="flex-1 text-[#585858] pt-5 px-4 @[1000px]:px-8">
        <h3 className="tracking-wide uppercase @[650px]:block hidden font-semibold font-mono text-[1.75rem]">
          aijo
        </h3>
        <div className="w-full @[650px]:mt-3 @container/stats">
          <h3 className="text-[1.2rem] font-semibold">Summary</h3>
          <div className="grid w-full @[40em]:grid-cols-2 gap-x-3   ">
            <div className="border w-full @[600px]:w-auto px-6 py-6 rounded-sm flex flex-col bg-slate-200 shadow-sm mt-3 @[30em]/stats:py-8">
              <h3 className="font-semibold text-[.9rem]">Total Revenue</h3>
              <p className="text-[1.4rem]">
                <strong>NRP 400.00</strong>
              </p>
              <p className="text-[.9rem]">From the last 30 days</p>
            </div>
            <div className="border w-full @[600px]:w-auto px-6 py-6 rounded-sm flex flex-col bg-slate-200 shadow-sm mt-3 @[30em]/stats:py-8">
              <h3 className="font-semibold text-[.9rem]">Total Revenue</h3>
              <p className="text-[1.4rem]">
                <strong>NRP 400.00</strong>
              </p>
              <p className="text-[.9rem]">From the last 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
