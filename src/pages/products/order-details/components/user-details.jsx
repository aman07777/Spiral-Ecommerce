import React, { useEffect } from "react";
import AddressModal from "./address-modal";
import { useBuyStore } from "./store.js";
const UserDetails = ({ user, isOpen, onOpen, onClose }) => {
  const shippingInfo = useBuyStore((state) => state.shippingInfo);
  const setShippingInfo = useBuyStore((state) => state.setShippingInfo);
  useEffect(() => {
    setShippingInfo({
      fullName: `${user?.firstName} ${user?.lastName}`,
      email: user?.email,
    });
  }, [user, setShippingInfo]);

  return (
    <>
      <div className="w-full p-2 px-3 mt-5 border rounded-sm border-l-[4px] shadow @container">
        <div className="flex gap-x-2 ">
          <h3 className="font-semibold text-[1.05rem] text-[#585858]">
            Customer Details
          </h3>
          <p
            className="cursor-pointer border text-[.8rem] px-1 h-fit rounded"
            onClick={() => onOpen()}
          >
            Edit
          </p>
        </div>
        <div className="flex w-full mt-2 gap-x-3 text-[.9rem] pl-2">
          <div className="grid @[20em]:grid-cols-2 gap-3 @[30em]:grid-cols-3 gap-y-[.2em] pb-2">
            <p className="capitalize">Name: {shippingInfo?.fullName || "NA"}</p>
            <p>Phone: {shippingInfo?.mobileNumber || "NA"}</p>
            <p>Email: {shippingInfo?.email || "NA"}</p>
            <p className="capitalize">
              Address: {shippingInfo?.address || "NA"}
            </p>
            <p className="capitalize">
              Delivery At: {shippingInfo?.label || "NA"}
            </p>
            <p className="capitalize">
              Land Mark: {shippingInfo?.landMark || "NA"}
            </p>
            <p className="capitalize">
              Province: {shippingInfo?.province || "NA"}
            </p>
          </div>
        </div>
      </div>
      <AddressModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default UserDetails;
