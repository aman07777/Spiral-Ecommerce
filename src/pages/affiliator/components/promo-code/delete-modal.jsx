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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleToast } from "../../../../global/toast";
import { usePromoCodeStore } from "./store";
const DeleteModal = ({ isOpen, onClose, data }) => {
  const toast = useToast();
  // stores
  const deletePromoCode = usePromoCodeStore((state) => state.deletePromoCode);
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["delete", "user", data?._id],
    mutationFn: deletePromoCode,
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries(["get", "promo-codes"], { exact: true });
        handleToast(toast, "Success", "User deleted successfully!", "success");
        onClose();
      }
    },
    onError: (error) => {
      handleToast(toast, "Error", error.message, "error");
    },
  });
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>
            <p className="text-[#585858] capitalize">
              Delete {`${data?.promoCode}`}
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="mb-1 text-[#585858]">
              <p>
                <span className="font-semibold capitalize">
                  {`${data?.promoCode}`}
                </span>{" "}
                will be deleted permanently!
              </p>
              <p>
                Are you sure you want to delete{" "}
                <span className="font-semibold capitalize">
                  {`${data?.promoCode}`}
                </span>
                ?
              </p>
            </div>
          </ModalBody>

          <ModalFooter className="flex gap-x-3 ">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 rounded-sm bg-[#585858] hover:bg-slate-50 text-white hover:text-[#585858]"
            >
              Cancel
            </button>
            <button
              variant="outline"
              className="px-4 py-2 text-white border rounded-sm border-red-400/60 hover:text-rose-500 bg-rose-500 hover:bg-rose-50"
              onClick={() => mutateAsync(data?._id)}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;
