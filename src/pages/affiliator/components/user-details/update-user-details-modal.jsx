import React, { useState } from "react";
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
import { useAffiliatorProfileStore } from "./store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleToast } from "../../../../global/toast";
const UpdateUserDetailsModal = ({ isOpen, onClose, userData }) => {
  const client = useQueryClient();
  const toast = useToast();
  // stores
  const update = useAffiliatorProfileStore((state) => state.updateDetails);
  // states
  // user details state
  const [userDetails, setUserDetails] = useState({
    ...userData,
    phoneNumber: "",
    fullAddress: "",
    birthDate: "",
  });
  // handlers
  // on change handler

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["update", "user", "details"],
    mutationFn: update,
    onSuccess: async (data) => {
      if (data) {
        client.invalidateQueries(["get", "my-details"], { exact: true });
        handleToast(
          toast,
          "Success",
          "Details updated successfully",
          "success"
        );
        onClose();
      }
    },
    onError: (error) => {
      handleToast(toast, "Error", error.message, "error");
    },
  });
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
              <p className="text-[#585858] text-[1rem]">
                Update your details here
              </p>
            </div>
          </ModalHeader>
          {/* modal heading fin */}
          <ModalCloseButton />
          <ModalBody>
            {/* form section */}
            <div className="mb-1 text-[#585858] grid gap-y-2">
              <div className="">
                {/* label */}
                <label htmlFor="First Name">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="flex px-[.6em] py-2 mt-2 border">
                  {/* the input field */}
                  <input
                    type="text"
                    placeholder="Enter first name @Ram"
                    value={userDetails?.firstName}
                    onChange={(e) => {
                      setUserDetails((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }));
                    }}
                    required
                    className="flex-1 outline-transparent"
                  />
                </div>
              </div>
              <div className="">
                {/* label */}
                <label htmlFor="Last Name">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="flex px-[.6em] py-2 mt-2 border">
                  {/* the input field */}
                  <input
                    type="text"
                    placeholder="Enter last name @Pokhrel"
                    value={userDetails?.lastName}
                    onChange={(e) => {
                      setUserDetails((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }));
                    }}
                    required
                    className="flex-1 outline-transparent"
                  />
                </div>
              </div>

              <div className="">
                {/* label */}
                <label htmlFor="Phone Number">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex px-[.6em] py-2 mt-2 border">
                  {/* the input field */}
                  <input
                    type="text"
                    placeholder="Enter phone @98XXXXXXXX"
                    value={userDetails?.phoneNumber}
                    onChange={(e) => {
                      setUserDetails((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }));
                    }}
                    required
                    className="flex-1 outline-transparent"
                  />
                </div>
              </div>
              <div className="">
                {/* label */}
                <label htmlFor="Full Address">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <div className="flex px-[.6em] py-2 mt-2 border">
                  {/* the input field */}
                  <input
                    type="text"
                    placeholder="Enter phone @Itahari-5"
                    value={userDetails?.fullAddress}
                    onChange={(e) => {
                      setUserDetails((prev) => ({
                        ...prev,
                        fullAddress: e.target.value,
                      }));
                    }}
                    required
                    className="flex-1 outline-transparent"
                  />
                </div>
              </div>
              <div className="">
                {/* label */}
                <label htmlFor="Date of Birth">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="flex px-[.6em] py-2 mt-2 border">
                  {/* the input field */}
                  <input
                    type="date"
                    value={userDetails?.birthDate}
                    onChange={(e) => {
                      setUserDetails((prev) => ({
                        ...prev,
                        birthDate: e.target.value,
                      }));
                    }}
                    required
                    className="flex-1 outline-transparent"
                  />
                </div>
              </div>
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
              onClick={(e) => {
                e.preventDefault();
                mutateAsync(userDetails);
              }}
            >
              {isLoading ? "Updating..." : "Update"}
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
