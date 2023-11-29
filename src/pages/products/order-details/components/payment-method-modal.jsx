import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import UseGetInnerWidth from "../../../../hooks/get-inner-width";
import { useBuyStore } from "./store";
import { useOrderStore } from "../../product-details/store";
import { checkShippingInfo, getPurchasePrice, getTotalPrice } from "../helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleToast } from "../../../../global/toast";
import { useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../../../global/store";
import useMutate from "../../../../hooks/useMutate";
const PaymentMethodModal = ({
  isOpen,
  onClose,
  openAddressModal,
  promoCodeDetails,
  purchasePrice,
}) => {
  const client = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();
  // hooks
  const innerWidth = UseGetInnerWidth();

  // stores
  const user = useGlobalStore((state) => state.user);
  const makeOrder = useOrderStore((state) => state.makeOrder);
  const setPaymentDetails = useBuyStore((state) => state.setPaymentDetails);
  const shippingInfo = useBuyStore((state) => state.shippingInfo);
  const orderItems = useBuyStore((state) => state.orderItems);
  const paymentDetails = useBuyStore((state) => state.paymentDetails);
  const replaceOrderItems = useBuyStore((state) => state.replaceOrderItems);
  // const { isLoading, mutate } = useMutation({
  //   mutationKey: ["make", "order"],
  //   mutationFn: makeOrder,
  //   onSuccess: (data) => {
  //     if (data === true) {
  //       client.invalidateQueries(["get", "orders"], { exact: true });
  //       replaceOrderItems([]);
  //       setPaymentDetails({ description: "" });
  //       onClose();
  //       handleToast(toast, "Success", "Order placed successfully", "success");
  //       // if (!!user) navigate("/profile/myorders");
  //     }
  //   },
  //   onError: () =>
  //     handleToast(toast, "Error", "Unable to place order", "error"),
  // });
  const { isLoading, mutate } = useMutate(
    ["make", "order"],
    makeOrder,
    ["get", "orders"],
    "Success",
    "Order placed successfully",
    "Error",
    "Unable to place order"
    // !user && "/profile/myorders",
    // { fn: setPaymentDetails, args: [{ description: "" }] },
    // { fn: replaceOrderItems, args: [[]] }
  );
  // handlers
  const handlePlaceOrderClick = () => {
    if (!checkShippingInfo(shippingInfo)) {
      handleToast(
        toast,
        "Error",
        "Please fill all the required shipping information",
        "error"
      );
      openAddressModal();
      return;
    }
    const orderData = {
      orderItems:
        Array.isArray(orderItems) &&
        orderItems.map((item) => ({
          ...item,
          purchasePrice: getPurchasePrice(
            item.price,
            item.quantity,
            item.discount
          ),
          totalPrice: getTotalPrice(item.price, item.quantity),
        })),
      shippingInfo,
      promoCode:
        Object.keys(promoCodeDetails || {}).length > 0 && promoCodeDetails?._id,
      totalBillAmount: purchasePrice,
      paymentDetails,
    };
    // const formData = new FormData();
    // formData.append("orderItems", JSON.stringify(orderData.orderItems));
    // formData.append("shippingInfo", JSON.stringify(orderData.shippingInfo));
    // formData.append("promoCode", orderData.promoCode);
    // formData.append("totalBillAmount", orderData.totalBillAmount);
    // // formData.append("paymentDetails", orderData.paymentDetails);
    // formData.append("paymentDetails[image]", paymentDetails?.image);
    // formData.append("paymentDetails[method]", paymentDetails?.method);
    // formData.append(
    //   "paymentDetails[accountNumber]",
    //   paymentDetails?.accountNumber
    // );
    // formData.append("paymentDetails[accountName]", paymentDetails?.accountName);
    // formData.append("paymentDetails[description]", paymentDetails?.description);
    mutate(orderData);
  };
  return (
    <>
      <div>
        <Modal
          isCentered
          isOpen={isOpen}
          onClose={onClose}
          size={innerWidth > 768 ? "xl" : "md"}
        >
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <ModalContent>
            <ModalHeader>
              <p className="text-[#585858] capitalize">Fill in the details</p>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody className="-mt-4">
              <div className="mb-1 text-[#585858] flex flex-col gap-y-2">
                <p>Please, fill in the payment details</p>
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="remarks">Remarks</label>
                  <input
                    type="text"
                    className="w-full px-2 py-[.35rem] border border-gray-400 rounded-sm outline-none"
                    value={paymentDetails.description}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="address">
                    Image<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    className="w-full px-2 py-[.35rem] border border-gray-400 rounded-sm outline-none "
                    accept="image/*"
                    required
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        image: e.target.files?.[0] || null,
                      })
                    }
                  />
                  <span className="text-[.7rem] text-red-500">
                    Note: please upload the payment receipt here
                  </span>
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="flex gap-x-3 ">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-400 rounded-sm bg-[#585858] hover:bg-slate-50 text-white hover:text-[#585858] w-[8em]"
              >
                Cancel
              </button>
              <button
                variant="outline"
                className="px-4 py-2 text-white border rounded-sm border-[teal]/60 hover:text-[teal] bg-[teal] hover:bg-rose-50 w-[8em]"
                onClick={() => handlePlaceOrderClick()}
              >
                {isLoading ? "Loading..." : "Place Order"}
              </button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default PaymentMethodModal;
