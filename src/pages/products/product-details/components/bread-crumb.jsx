import { Breadcrumb, BreadcrumbItem } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
const BreadCrumb = () => {
  return (
    <>
      <Breadcrumb
        spacing="5px"
        mt={3}
        className="text-[.9rem] font-semibold text-[#585858]"
      >
        <BreadcrumbItem>
          <NavLink
            to="/"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
          >
            Home
          </NavLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <NavLink
            to="/products"
            className="relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:bottom-0 before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200"
          >
            Products
          </NavLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <NavLink to="#">Details</NavLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};

export default BreadCrumb;
