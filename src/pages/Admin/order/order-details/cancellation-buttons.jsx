import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { useAdminOrderStore } from "../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { handleToast } from "../../../../global/toast";
import { useNavigate } from "react-router-dom";
const CancellationButtons = ({ id }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const client = useQueryClient();
  // stores
  const deleteOrder = useAdminOrderStore((state) => state.deleteOrder);
  // react query
  const { isLoading: deleteIsLoading, mutate: deleteMutate } = useMutation({
    mutationFn: deleteOrder,
    mutationKey: ["delete", "order", id],
    onSuccess: (data) => {
      if (data) {
        handleToast(
          toast,
          "Delete Success",
          "Order deleted successfully",
          "success"
        );
        client.invalidateQueries(["get", "orders"]);
        navigate("/adminOrder");
      }
    },
    onError: (_) => {
      handleToast(toast, "Delete Failed", "Order deletion failed", "error");
    },
  });

  return (
    <>
      <div className="flex gap-x-3 mt-3 min-[800px]:mt-0 mr-3 mb-2 min-[800px]:mb-0">
        <button
          className="flex items-center px-3 py-2 text-red-500 border border-red-500 rounded-sm hover:bg-red-500 hover:text-white transition-[background-color] duration-150"
          title="Cancel order"
        >
          <MdCancel className="text-[1.2em] mr-1" /> <span>Cancel</span>
        </button>
        <button
          className="flex items-center px-3 py-2 text-red-500 border border-red-500 rounded-sm hover:bg-red-500 hover:text-white transition-[background-color] duration-150"
          title="Delete order"
          onClick={() => deleteMutate(id)}
        >
          <MdDeleteForever className="text-[1.2em] mr-1" />
          <span>{deleteIsLoading ? "Deleting..." : "Delete"}</span>
        </button>
      </div>
    </>
  );
};

export default CancellationButtons;
