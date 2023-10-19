import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { BiSolidCart, BiLogOut } from "react-icons/bi";
import { useToast } from "@chakra-ui/react";

const LeftSide = () => {
  const toast = useToast();
  const navigate = useNavigate();
  // handlers
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.replace("/");
    toast({
      title: "Logout Successful",
      description: "You have been logged out successfully.",
      status: "success",
      duration: 2500,
      isClosable: true,
    });
  };
  return (
    <>
      <div className="flex flex-col gap-y-6">
        <div
          className="flex items-center cursor-pointer gap-x-2 "
          onClick={() => {
            navigate("/profile/customer");
          }}
        >
          <i>
            <FaUserCircle size={20} className="text-[#008080]" />
          </i>
          <span className="text-sm  font-semibold hover:text-[#008080]">
            My Profile
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer gap-x-2 "
          onClick={() => {
            navigate("/profile/addressbook");
          }}
        >
          <i>
            <FaAddressBook size={20} className="text-[#008080]" />
          </i>
          <span className="text-sm  font-semibold hover:text-[#008080]">
            Address Book
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer gap-x-2 "
          onClick={() => {
            navigate("/profile/paymentoption");
          }}
        >
          <i>
            <MdOutlinePayment size={20} className="text-[#008080]" />
          </i>
          <span className="text-sm  font-semibold hover:text-[#008080]">
            Payment Options
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer gap-x-2 "
          onClick={() => {
            navigate("/profile/myorders");
          }}
        >
          <i>
            <BiSolidCart size={20} className="text-[#008080]" />
          </i>
          <span className="text-sm  font-semibold hover:text-[#008080]">
            My Orders
          </span>
        </div>
        <div
          className="flex items-center cursor-pointer gap-x-2 "
          onClick={() => handleLogout()}
        >
          <i>
            <BiLogOut size={20} className="text-[#008080]" />
          </i>
          <span className="text-sm  font-semibold hover:text-[#008080]">
            Log Out
          </span>
        </div>
      </div>
    </>
  );
};

export default LeftSide;
