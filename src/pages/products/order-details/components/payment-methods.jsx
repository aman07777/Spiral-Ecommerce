import React from "react";
import PaymentMethodModal from "./payment-method-modal";
import { useDisclosure } from "@chakra-ui/react";
import { useBuyStore } from "./store";

const PaymentMethod = ({
  openAddressModal,
  promoCodeDetails,
  purchasePrice,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const setData = useBuyStore((state) => state.setPaymentDetails);
  const paymentDetails = useBuyStore((state) => state.paymentDetails);
  return (
    <>
      <div className="pt-2">
        <p className="font-semibold text-[#585858]">Payment</p>
        <div className="flex mt-3 justify-evenly ">
          <p
            className={`px-3 py-[.4em] font-semibold border cursor-pointer select-none @[750px]:w-fit @[400px]:w-[6em] text-center @[400px]:py-2 @[750px]:py-[.4em] rounded-sm hover:text-[teal]/70 hover:border-[teal]/70 transition-[color] duration-300 ${
              paymentDetails?.method === "COD"
                ? "border-[teal]/70 text-[teal]/70 "
                : "border-[#585858]/70 text-[#585858]/70 "
            }`}
            title="cash on delivery"
            onClick={() => setData({ method: "COD" })}
          >
            COD
          </p>
          <p
            className={`px-3 py-[.4em] font-semibold border cursor-pointer select-none @[750px]:w-fit @[400px]:w-[6em] text-center @[400px]:py-2 @[750px]:py-[.4em] rounded-sm hover:text-[teal]/70 hover:border-[teal]/70 transition-[color] duration-300 ${
              paymentDetails?.method === "ESEWA"
                ? "border-[teal]/70 text-[teal]/70 "
                : "border-[#585858]/70 text-[#585858]/70 "
            }`}
            title="esewa"
            onClick={() => {
              setData({ method: "ESEWA", accountNumber: "9838495274" });
              onOpen();
            }}
          >
            ESewa
          </p>
          <p
            className={`px-3 py-[.4em] font-semibold border cursor-pointer select-none @[750px]:w-fit @[400px]:w-[6em] text-center @[400px]:py-2 @[750px]:py-[.4em] rounded-sm hover:text-[teal]/70 hover:border-[teal]/70 transition-[color] duration-300 ${
              paymentDetails?.method === "BANK"
                ? "border-[teal]/70 text-[teal]/70 "
                : "border-[#585858]/70 text-[#585858]/70 "
            }`}
            title="bank transfer"
            onClick={() => {
              setData({ method: "BANK", accountNumber: "9043904390890423924" });
              onOpen();
            }}
          >
            Bank
          </p>
        </div>
      </div>
      <PaymentMethodModal
        isOpen={isOpen}
        onClose={onClose}
        openAddressModal={openAddressModal}
        promoCodeDetails={promoCodeDetails}
        purchasePrice={purchasePrice}
      />
    </>
  );
};

export default PaymentMethod;
