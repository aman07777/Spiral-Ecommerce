import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { FaAddressBook, FaThList } from "react-icons/fa";
import { MdOutlinePayment, MdPreview } from "react-icons/md";
import { BiSolidCart, BiLogOut } from "react-icons/bi";

const LeftSide = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col gap-y-6">
        <div className="flex gap-x-2 items-center cursor-pointer " onClick={() => {
          navigate('/profile/customer')
        }}>
          <i><FaUserCircle size={20} className="text-[#008080]" /></i>
          <span className="text-sm  font-semibold hover:text-[#008080]">My Profile</span>
        </div>
        <div className="flex gap-x-2 items-center cursor-pointer " onClick={() => {
          navigate("/profile/addressbook")
        }}>
          <i><FaAddressBook size={20} className="text-[#008080]" /></i>
          <span className="text-sm  font-semibold hover:text-[#008080]">Address Book</span>
        </div>
        <div className="flex gap-x-2 items-center cursor-pointer " onClick={() => {
          navigate('/profile/paymentoption')
        }}>

          <i><MdOutlinePayment size={20} className="text-[#008080]" /></i>
          <span className="text-sm  font-semibold hover:text-[#008080]">Payment Options</span>
        </div>
        <div className="flex gap-x-2 items-center cursor-pointer " onClick={() => {
          navigate("/profile/myorders")
        }}>

          <i><BiSolidCart size={20} className="text-[#008080]" /></i>
          <span className="text-sm  font-semibold hover:text-[#008080]">My Orders</span>
        </div>
        <div className="flex gap-x-2 items-center cursor-pointer " onClick={() => {
          navigate("/profile/whishlist")
        }}>

          <i><FaThList size={20} className="text-[#008080]" /></i>
          <span className="text-sm  font-semibold hover:text-[#008080]">My Whishlist</span>
        </div>
        <div className="flex gap-x-2 items-center cursor-pointer " onClick={() => {
          navigate('/profile/myreview')
        }}>

          <i><MdPreview size={20} className="text-[#008080]" /></i>
          <span className="text-sm  font-semibold hover:text-[#008080]">My Review</span>
        </div>
        <div className="flex gap-x-2 items-center cursor-pointer ">
          <i><BiLogOut size={20} className="text-[#008080]" /></i>
          <span className="text-sm  font-semibold hover:text-[#008080]">Log Out</span>
        </div>
      </div>
    </>
  )
}

export default LeftSide