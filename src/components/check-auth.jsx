import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useGlobalStore } from "../global/store";
import { useState } from "react";
import Login from "../pages/Login";

const CheckAuth = () => {
  const checkAuth = useGlobalStore((state) => state.checkAuth);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    checkAuth().then((data) => {
      if (data) {
        setIsAuth(true);
      }
    });
  }, [checkAuth]);
  return !isAuth ? <Login /> : <Outlet />;
};

export default CheckAuth;
