import React from "react";
import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
const UpdateProductBreadcrumb = () => {
  return (
    <>
      <Breadcrumb
        spacing="5px"
        className="text-[.9rem] font-semibold text-[#585858] px-4 @[767px]:px-0 mt-3"
      >
        <BreadcrumbItem>
          <NavLink
            to="/adminHome"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
          >
            Home
          </NavLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NavLink
            to="/adminProduct"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
          >
            Products
          </NavLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <NavLink to="#" className="cursor-default">
            Update
          </NavLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};

export default UpdateProductBreadcrumb;
