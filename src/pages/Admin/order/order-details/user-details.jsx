import React from "react";

const UserDetails = ({ user }) => {
  return (
    <>
      <div className="@container flex-1 mt-3">
        <h3 className="font-semibold text-[1.05rem] text-[#585858]">
          Customer Details
        </h3>
        <div className="flex w-full mt-2 gap-x-3 text-[.9rem] pl-2">
          <div className="grid @[20em]:grid-cols-2 gap-3 capitalize @[30em]:grid-cols-3 gap-y-[.2em] pb-2">
            <p>Name: {user?.fullName || "NA"}</p>
            <p>Phone: {user?.mobileNumber || "NA"}</p>
            <p>Email: {user?.email || "NA"}</p>
            <p>Address: {user?.address || "NA"}</p>
            <p>Delivery At: {user?.label || "NA"}</p>
            <p>Land Mark: {user?.landMark || "NA"}</p>
            <p>Province: {user?.province || "NA"}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
