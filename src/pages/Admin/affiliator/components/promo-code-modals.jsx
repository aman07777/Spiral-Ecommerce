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
  Spinner,
} from "@chakra-ui/react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAffiliatorStore } from "../store";
import { handleToast } from "../../../../global/toast";
import { useEffect } from "react";
const PromoCodeModal = ({ isOpen, onClose, data }) => {
  const toast = useToast();
  const client = useQueryClient();
  // stores
  const active = useAffiliatorStore((state) => state.activatePromoCode);
  // states
  const [promoCode, setPromoCode] = useState({});
  const [status, setStatus] = useState("all");
  const [filteredData, setFilteredData] = useState([]);
  // react query
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["activate", "promoCode", data?._id],
    mutationFn: active,
    onSuccess: (res) => {
      if (res) {
        client.invalidateQueries(["get", "affiliators"], { exact: true });
        client.invalidateQueries(["get", "promo-codes"], { exact: true });
        handleToast(
          toast,
          "Success",
          "Promo code activated successfully!",
          "success"
        );
        onClose();
      }
    },
    onError: (error) => {
      handleToast(toast, "Error", error.message, "error");
    },
  });

  useEffect(() => {
    if (status === "all") setFilteredData(data?.promoCode);

    if (status === "active")
      setFilteredData(
        data?.promoCode?.filter((item) => item?.status === "active")
      );
    if (status === "inactive")
      setFilteredData(
        data?.promoCode?.filter((item) => item?.status === "inactive")
      );
  }, [status, data]);
  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose} size={"lg"}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>
            <p className="text-[#585858] capitalize">
              Promo Codes of {`${data.firstName} ${data?.lastName}`}
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="mb-1 text-[#585858] flex flex-col gap-y-1 max-h-[70dvh] overflow-y-scroll">
              <div className="flex items-center justify-between">
                <p>Promo Codes</p>
                <p className="flex text-[.8rem] gap-x-2">
                  <span
                    className="px-1 border rounded-sm cursor-pointer select-none"
                    onClick={() => setStatus("all")}
                  >
                    All
                  </span>
                  <span
                    className="px-1 border rounded-sm cursor-pointer select-none"
                    onClick={() => setStatus("active")}
                  >
                    Active
                  </span>
                  <span
                    className="px-1 border rounded-sm cursor-pointer select-none"
                    onClick={() => setStatus("inactive")}
                  >
                    Inactive
                  </span>
                </p>
              </div>
              <div className="mt-1">
                {Array.isArray(filteredData) &&
                  filteredData?.length > 0 &&
                  filteredData.map((code) => (
                    <div
                      className="flex items-center justify-between p-2 border-b"
                      key={code._id}
                    >
                      <p className="flex items-start gap-x-1">
                        <span>{code?.promoCode}</span>
                        <span
                          className={`text-[.6rem] border  pb-[.15em] px-1 rounded-full text-white ${
                            code?.status === "active" &&
                            "bg-green-400 border-green-400"
                          }  ${
                            code?.status === "inactive" &&
                            "bg-red-400 border-red-400"
                          }`}
                        >
                          {code?.status}
                        </span>
                      </p>
                      <p>{code?.discountPercentage}%</p>
                      <p>{code?.expiresAt?.split("T")?.[0]}</p>
                      <div
                        onClick={() => {
                          setPromoCode(code);
                          mutateAsync(code._id);
                        }}
                        title={`${
                          code?.status === "active" ? "Inactive" : "Active"
                        } promo code`}
                      >
                        {code?.status === "active" ? (
                          !isLoading ? (
                            <CloseIcon className="text-sky-500 cursor-pointer text-[.9rem] border bg-slate-100 rounded-md " />
                          ) : code?._id === promoCode._id ? (
                            <Spinner color="teal.300" />
                          ) : (
                            <CloseIcon className="text-sky-500 cursor-pointer text-[.9rem] border bg-slate-100 rounded-md" />
                          )
                        ) : !isLoading ? (
                          <DoneIcon className="text-green-500 cursor-pointer text-[.9rem] border bg-slate-100 rounded-md" />
                        ) : code?._id === promoCode._id ? (
                          <Spinner color="teal.300" />
                        ) : (
                          <DoneIcon className="text-green-500 cursor-pointer text-[.9rem] border bg-slate-100 rounded-md" />
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="flex gap-x-3 ">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-400 rounded-sm bg-[#585858] hover:bg-slate-50 text-white hover:text-[#585858]"
            >
              Close
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PromoCodeModal;
