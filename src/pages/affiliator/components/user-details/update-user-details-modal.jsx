import React, { lazy, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
const InputField = lazy(() => import("./input-field"));
const UpdateUserDetailsModal = ({ isOpen, onClose, userData }) => {
  // states
  // user details state
  const [userDetails, setUserDetails] = useState({ ...userData });
  // handlers
  // on change handler
  const handleChange = (e) => {
    setUserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={"md"}>
        {/* overlay add a blurry effect in the background */}
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          {/* heading of the modal */}
          <ModalHeader>
            <div className="leading-6">
              <p className="text-[#585858] text-[1.3rem]">
                Hello, {userData?.firstName}
              </p>
              <p className="text-[#585858] text-[1rem]">Update your details here</p>
            </div>
          </ModalHeader>
          {/* modal heading fin */}
          <ModalCloseButton />
          <ModalBody>
            {/* form section */}
            <div className="mb-1 text-[#585858] grid gap-y-2">
              <InputField
                label="First Name"
                type="text"
                name="firstName"
                placeholder="Enter first name @Ram"
                value={userDetails?.firstName}
                onChange={handleChange}
              />
              <InputField
                label="Last Name"
                type="text"
                name="lastName"
                placeholder="Enter last name @Pokhrel"
                value={userDetails?.lastName}
                onChange={handleChange}
              />
              <InputField
                label="Email"
                type="email"
                name="email"
                placeholder="Enter email @example@gmail.com"
                value={userDetails?.email}
                onChange={handleChange}
              />
              <InputField
                label="Phone Number"
                type="text"
                name="phone"
                placeholder="Enter phone @98XXXXXXXX"
                value={userDetails?.phone}
                onChange={handleChange}
              />
              <InputField
                label="Address"
                type="text"
                name="address"
                placeholder="Enter address @Itahari-5"
                value={userDetails?.address}
                onChange={handleChange}
              />
            </div>
            {/* form section fin here */}
          </ModalBody>

          {/* submit and cancel button section */}
          <ModalFooter className="flex gap-x-3 ">
            <button
              onClick={onClose}
              className="px-4 w-[5.5em] py-2 border border-gray-400 rounded-sm bg-[#585858] hover:bg-slate-50 text-white hover:text-[#585858]"
            >
              Cancel
            </button>
            {/* submit button -> adds the promo code to the database */}
            <button
              variant="outline"
              className="px-4 py-2 text-white border rounded-sm border-cyan-400/60 hover:text-sky-500 bg-sky-500 hover:bg-sky-50 w-[5.5em]"
              // onClick={handleUpdateClick}
            >
              {false ? "Updating..." : "Update"}
            </button>
            {/* submit button fin here */}
          </ModalFooter>
          {/* button section fin */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateUserDetailsModal;
