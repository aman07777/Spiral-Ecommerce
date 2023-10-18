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
import { BsStars } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePromoCodeStore } from "./store";
import { handleToast } from "../../../../global/toast";
const AddPromoCodeModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const client = useQueryClient();
  // stores
  const addPromoCode = usePromoCodeStore((state) => state.addPromoCode);
  // states
  // promo code
  const [promoCodeData, setPromoCodeData] = useState({
    promoCode: "",
    discountPercentage: "",
    expiresAt: "",
  });
  // handlers
  // generated a random promo code
  const generatePromoCode = () => {
    setPromoCodeData({
      ...promoCodeData,
      promoCode: Math.random().toString(36).substring(2, 8),
    });
  };
  const { mutate, isLoading } = useMutation({
    mutationKey: ["add", "promo", "code"],
    mutationFn: addPromoCode,
    onSuccess: (res) => {
      if (res?.data?.status === "success") {
        client.invalidateQueries(["get", "promo-codes"], { exact: true });
        handleToast(
          toast,
          "Success",
          "Promo code added successfully.",
          "success"
        );
        setPromoCodeData({
          promoCode: "",
          discountPercentage: "",
          expiresAt: "",
        });
        onClose();
      }
    },
    onError: (error) => {
      handleToast(toast, "Error", error.message, "error");
    },
  });

  // handles submit click
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(promoCodeData);
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
            <p className="text-[#585858]">Add a promo code</p>
          </ModalHeader>
          {/* modal heading fin */}
          <ModalCloseButton />
          <ModalBody>
            {/* form section -> helps to add a promo code */}
            {/* affiliator can also generate a random promo code by clicking a button next to the input field */}
            <div className="mb-1 text-[#585858]">
              {/* form section */}
              <form className="flex flex-col gap-y-3">
                <div className="">
                  <label htmlFor="promo-code">
                    Promo Code <span className="text-red-500">*</span>
                  </label>
                  <div className="flex px-3 py-2 mt-2 border rounded">
                    {/* the input field */}
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCodeData.promoCode}
                      onChange={(event) =>
                        setPromoCodeData({
                          ...promoCodeData,
                          promoCode: event.target.value,
                        })
                      }
                      required
                      className="flex-1 outline-transparent"
                    />
                    {/* generate promo code button */}
                    <div
                      className="flex items-center cursor-pointer select-none"
                      onClick={generatePromoCode}
                    >
                      <span>Generate</span>
                      <BsStars />
                    </div>
                    {/* button section fin here */}
                  </div>
                </div>
                <div className="">
                  <label htmlFor="promo-code">
                    Discount <span className="text-red-500">*</span>
                  </label>
                  <div className="flex px-3 py-2 mt-2 border rounded">
                    {/* the input field */}
                    <input
                      type="text"
                      placeholder="Enter discount @20"
                      value={promoCodeData.discountPercentage}
                      onChange={(event) =>
                        setPromoCodeData({
                          ...promoCodeData,
                          discountPercentage: event.target.value,
                        })
                      }
                      required
                      className="flex-1 outline-transparent"
                    />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="promo-code">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <div className="flex px-3 py-2 mt-2 border rounded">
                    {/* the input field */}
                    <input
                      type="date"
                      placeholder="Enter discount"
                      value={promoCodeData.expiresAt}
                      onChange={(event) =>
                        setPromoCodeData({
                          ...promoCodeData,
                          expiresAt: event.target.value,
                        })
                      }
                      required
                      className="flex-1 outline-transparent"
                    />
                  </div>
                </div>
              </form>
              {/* form section fin here */}
            </div>
          </ModalBody>

          {/* submit and cancel button section */}
          <ModalFooter className="flex gap-x-3 ">
            <button
              onClick={onClose}
              className="px-4 w-[6.5em] py-2 border border-gray-400 rounded-sm bg-[#585858] hover:bg-slate-50 text-white hover:text-[#585858]"
            >
              Cancel
            </button>
            {/* submit button -> adds the promo code to the database */}
            <button
              variant="outline"
              className="px-4 py-2 text-white border rounded-sm border-cyan-400/60 hover:text-sky-500 bg-sky-500 hover:bg-sky-50 w-[6.5em]"
              onClick={(e) => handleSubmit(e)}
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
            {/* submit button fin here */}
          </ModalFooter>
          {/* button section fin */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddPromoCodeModal;
