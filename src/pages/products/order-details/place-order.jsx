import { useQuery } from "@tanstack/react-query";
import React from "react";
import UserDetails from "./components/user-details";
import ProductDetails from "./components/product-details";
import OrderSummary from "./components/order-summary";
import { useAffiliatorProfileStore } from "../../affiliator/components/user-details/store";

const PlaceOrder = () => {
  const getMyDetails = useAffiliatorProfileStore((state) => state.getMyDetails);
  // react query
  const { data: user } = useQuery(["get", "my-details"], getMyDetails);
  return (
    <>
      <div className="px-4 @container">
        <UserDetails user={user} />
        <div className="flex flex-col mt-5 gap-y-3 gap-x-3 @[750px]:flex-row">
          <ProductDetails />
          <OrderSummary />
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
