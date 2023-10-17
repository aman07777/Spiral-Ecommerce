import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import UseGetInnerWidth from "../../../Admin/hooks/get-inner-width";
import { useQuery } from "@tanstack/react-query";
import { useAffiliatorProfileStore } from "../../../affiliator/components/user-details/store";

import { useBuyStore } from "./store";
const AddressModal = ({ isOpen, onClose }) => {
  // hooks
  const innerWidth = UseGetInnerWidth();
  // stores
  const getMyDetails = useAffiliatorProfileStore((state) => state.getMyDetails);
  const setShippingInfo = useBuyStore((state) => state.setShippingInfo);

  const [data, setData] = React.useState({
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

  const handleBuyClick = () => {
    setShippingInfo(data);
    onClose();
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
                  value={data.fullName}
                  onChange={(e) =>
                    setData({
                      ...data,
                      fullName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="w-full px-2 py-[.35rem] border border-gray-400 rounded-sm outline-none "
                  value={data.email}
                  onChange={(e) =>
                    setData({
                      ...data,
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
                  value={data.address}
                  onChange={(e) =>
                    setData({
                      ...data,
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
                  value={data.mobileNumber}
                  onChange={(e) =>
                    setData({
                      ...data,
                      mobileNumber: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="land-mark">Land Mark</label>
                <input
                  type="text"
                  className="w-full px-2 py-[.35rem] border border-gray-400 rounded-sm outline-none "
                  value={data.landMark}
                  onChange={(e) =>
                    setData({
                      ...data,
                      landMark: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="land-mark">
                  Province<span className="text-red-500">*</span>
                </label>
                <select
                  type="text"
                  className="w-full px-2 py-[.35rem] border border-gray-400 rounded-sm outline-none "
                  required
                  value={data.province}
                  onChange={(e) =>
                    setData({
                      ...data,
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
                  value={data.label}
                  onChange={(e) =>
                    setData({
                      ...data,
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
              onClick={() => handleBuyClick()}
            >
              Update
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddressModal;
