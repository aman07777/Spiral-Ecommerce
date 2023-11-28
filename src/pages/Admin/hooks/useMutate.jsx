import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleToast } from "../../../global/toast";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const useMutate = (
  mutationKey,
  mutationFn,
  validateKey,
  successTitle,
  successMessage,
  errorTitle,
  errorMessage,
  navigateTo
) => {
  const toast = useToast();
  const client = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationKey,
    mutationFn,
    onSuccess: () => {
      client.invalidateQueries([...validateKey]);
      handleToast(toast, successTitle, successMessage, "success");
      if (navigateTo) navigate(navigateTo);
    },
    onError: () => {
      handleToast(toast, errorTitle, errorMessage, "error");
    },
  });
};

export default useMutate;
