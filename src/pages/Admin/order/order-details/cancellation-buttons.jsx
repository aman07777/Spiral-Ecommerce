import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { useAdminOrderStore } from "../store";
import useMutate from "../../hooks/useMutate";
const CancellationButtons = ({ id }) => {
  // stores
  const deleteOrder = useAdminOrderStore((state) => state.deleteOrder);
  // react query
  const { isLoading: deleteIsLoading, mutate: deleteMutate } = useMutate(
    ["delete", "order", id],
    deleteOrder,
    ["get", "orders"],
    "Delete Success",
    "Order deleted successfully",
    "Delete Failed",
    "Order deletion failed",
    "/adminOrder"
  );

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
