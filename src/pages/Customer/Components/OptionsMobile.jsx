import React from "react";
import { BiLogOut, BiSolidCart } from "react-icons/bi";
import { FaAddressBook, FaUserCircle } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { frontend_url } from "../../../global/config";
import { useToast } from "@chakra-ui/react";
const OptionsMobile = ({ props }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const current_location = window.location.href;
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
        <span
          className={`${
            current_location === frontend_url + "/profile/customer"
              ? "flex"
              : "hidden"
          } px-4 w-[10rem] py-2 bg-[#008080] text-white rounded-md text-sm font-semibold tracking-wide cursor-pointer`}
          onClick={() => {
            props(true);
          }}
        >
          Edit Profile
        </span>
      </div>
    </>
  );
};

export default OptionsMobile;
