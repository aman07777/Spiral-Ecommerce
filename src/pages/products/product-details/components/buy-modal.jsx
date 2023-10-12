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
import UseGetInnerWidth from "../../../Admin/hooks/get-inner-width";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAffiliatorProfileStore } from "../../../affiliator/components/user-details/store";
import { useState } from "react";
import { useOrderStore } from "../store";
import { handleToast } from "../../../../global/toast";
const BuyModal = ({ isOpen, onClose, data }) => {
  const toast = useToast();
  const client = useQueryClient();
  // hooks
  const innerWidth = UseGetInnerWidth();
  // stores
  const getMyDetails = useAffiliatorProfileStore((state) => state.getMyDetails);
  const makeOrder = useOrderStore((state) => state.makeOrder);
  // states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    mobileNumber: "",
    landMark: "",
    province: "",
    label: "",
  });

  // react query
  const { data: user, isError: isGetError } = useQuery(
    ["get", "my-details"],
    getMyDetails
  );
  const { isLoading, isError, mutate } = useMutation({
    mutationKey: ["make", "order"],
    mutationFn: makeOrder,
    onSuccess: (data) => {
      if (data === true) {
        client.invalidateQueries();
        handleToast(toast, "Success", "Order placed successfully", "success");
        setShippingInfo({
          fullName: "",
          email: "",
          address: "",
          mobileNumber: "",
          landMark: "",
          province: "",
          label: "",
        });
      }
    },
    onError: (error) => handleToast(toast, "Error", error.message, "error"),
  });
  isError && handleToast(toast, "Error", "Something went wrong", "error");
  const handleBuyClick = () => {
    const orderData = {
      orderItems: [data],
      shippingInfo,
    };
    mutate(orderData);
  };
  return (
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
            <p className="text-[#585858] capitalize">
              Dear {`${!isGetError && user?.firstName}`},
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="mb-1 text-[#585858] flex flex-col gap-y-2 md:px-4">
              <p>Please, fill in the shipping address</p>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="full-name">
                  Full name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-2 py-[.35rem] border border-gray-400 rounded-sm outline-none "
                  required
                  value={shippingInfo.fullName}
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      fullName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="email">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className="w-full px-2 py-[.35rem] border border-gray-400 rounded-sm outline-none "
                  required
                  value={shippingInfo.email}
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="address">
                  Full address<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-2 py-[.35rem] border border-gray-400 rounded-sm outline-none "
                  required
                  value={shippingInfo.address}
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      address: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="mobile-number">
                  Mobile number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-2 py-[.35rem] border border-gray-400 rounded-sm outline-none "
                  required
                  value={shippingInfo.mobileNumber}
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      mobileNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="land-mark">
                  Land Mark<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-2 py-[.35rem] border border-gray-400 rounded-sm outline-none "
                  required
                  value={shippingInfo.landMark}
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      landMark: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="land-mark">
                  Land Mark<span className="text-red-500">*</span>
                </label>
                <select
                  type="text"
                  className="w-full px-2 py-[.35rem] border border-gray-400 rounded-sm outline-none "
                  required
                  value={shippingInfo.province}
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      province: e.target.value,
                    })
                  }
                >
                  <option disabled value={""}>
                    Select Province
                  </option>
                  <option value="Bagmati">Bagmati</option>
                  <option value="Gandaki">Gandaki</option>
                  <option value="Karnali">Karnali</option>
                  <option value="Koshi">Koshi</option>
                  <option value="Lumbini">Lumbini</option>
                  <option value="Madhesh">Madhesh</option>
                  <option value="Sudurpaschim">Sudurpaschim</option>
                </select>
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="label">
                  Label<span className="text-red-500">*</span>
                </label>
                <select
                  type="text"
                  className="w-full px-2 py-[.35rem] border border-gray-400 rounded-sm outline-none "
                  required
                  value={shippingInfo.label}
                  onChange={(e) =>
                    setShippingInfo({
                      ...shippingInfo,
                      label: e.target.value,
                    })
                  }
                >
                  <option disabled value={""}>
                    Select Label
                  </option>
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="flex gap-x-3 ">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 rounded-sm bg-[#585858] hover:bg-slate-50 text-white hover:text-[#585858] w-[7em]"
            >
              Cancel
            </button>
            <button
              variant="outline"
              className="px-4 py-2 text-white border rounded-sm border-[teal]/60 hover:text-[teal] bg-[teal] hover:bg-rose-50 w-[7em]"
              onClick={(e) => handleBuyClick(e)}
            >
              {isLoading ? "Loading..." : "Order"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BuyModal;
