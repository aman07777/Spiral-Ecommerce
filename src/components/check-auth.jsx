import { Outlet } from "react-router-dom";
import { useGlobalStore } from "../global/store";
import Login from "../pages/Login";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import { handleToast } from "../global/toast";
import { useToast } from "@chakra-ui/react";
const CheckAuth = () => {
  const toast = useToast();
  const checkAuth = useGlobalStore((state) => state.checkAuth);
  const {
    data: auth,
    isLoading: loading,
    isError,
    error,
  } = useQuery(["checkAuth"], checkAuth);
  isError &&
    handleToast(toast, "Error checking authentication", error.message, "error");
  return loading ? <Loader /> : !auth ? <Login /> : <Outlet />;
};

export default CheckAuth;
