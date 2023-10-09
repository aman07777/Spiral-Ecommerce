import { Outlet } from "react-router-dom";
import { useGlobalStore } from "../global/store";
import Login from "../pages/Login";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
const CheckAuth = () => {
  const checkAuth = useGlobalStore((state) => state.checkAuth);
  const { data: auth, isFetching } = useQuery(["check", "auth"], checkAuth);
  return isFetching ? <Loader /> : !auth ? <Login /> : <Outlet />;
};

export default CheckAuth;
