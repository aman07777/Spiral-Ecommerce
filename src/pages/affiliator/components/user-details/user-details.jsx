import { Avatar, useDisclosure } from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlinePhone } from "react-icons/hi";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import UpdateUserDetailsModal from "./update-user-details-modal";
import { useGlobalStore } from "../../../../global/store";
import { useAffiliatorProfileStore } from "./store";
import { useQuery } from "@tanstack/react-query";
const UserDetails = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // stores
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  // stores
  const getMyDetails = useAffiliatorProfileStore((state) => state.getMyDetails);

  const { data, isFetching } = useQuery(["get", "my-details"], getMyDetails);
  !isFetching && (data ?? setUser(data));

  return (
    <>
      <div className="flex flex-col min-w-[350px] @[850px]:min-w-[500px] text-[#585858] relative @[650px]:border-l-[.15rem] border-b-[.15rem] pb-5 rounded justify-center bg-slate-50">
        {/* heading section -> logo of AIJO -> its for small devices -> upto 650px */}
        <h3 className="tracking-wide uppercase px-4 @[650px]:hidden block font-semibold font-mono text-[1.5rem] absolute mt-3 top-0 left-0">
          aijo
        </h3>
        {/* user details section */}
        <div className="flex flex-col items-center justify-center mt-5">
          {/* avatar of user -> image is shown here */}
          <Avatar
            size="xl"
            name={`${user?.firstName} ${user?.lastName}`}
            src={"https://cdn-icons-png.flaticon.com/512/21/21104.png"}
          />
          {/* name section -> address is also shown here */}
          <div className="flex items-center gap-x-2">
            <p className="font-semibold  mt-1 text-[1.2rem] capitalize">{`${user?.firstName} ${user?.lastName}`}</p>
            {/* edit icon -> helps to update the user's details via a form */}
            <BiSolidMessageSquareEdit
              className="text-[1.2rem] cursor-pointer"
              title="update profile"
              onClick={onOpen}
            />
          </div>
          <p className="font-semibold text-[1.1rem]">
            {user?.fullAddress || (
              <span
                className="text-[.8rem] cursor-pointer border px-1 rounded-sm hover:border-[#585858]/60 transition-[border]"
                onClick={onOpen}
                title="add address"
              >
                Add
              </span>
            )}
          </p>
          {/* name and address section fin */}
          <div className="w-full mt-1 px-[2em]">
            {/* contact section -> email and phone */}
            <p className=" font-semibold text-[1.1rem]">Contacts</p>
            <div className="flex flex-col mt-1 gap-x-3">
              <div className="flex items-center gap-x-2">
                <AiOutlineMail className="text-[1.2rem]" />
                <p className="font-semibold text-[1rem]">{user?.email}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <HiOutlinePhone className="text-[1.2rem]" />
                <p className="font-semibold text-[1rem]">
                  {user?.phoneNumber || (
                    <span
                      className="text-[.8rem] cursor-pointer border px-1 rounded-sm hover:border-[#585858]/60 transition-[border]"
                      title="add phone number"
                      onClick={onOpen}
                    >
                      Add
                    </span>
                  )}
                </p>
              </div>
            </div>
            {/* contact section fin */}
          </div>
        </div>
        {/* user detail section fin */}
      </div>
      {/* update modal -> updates the affiliator details */}
      {Object.keys(user).length > 0 && (
        <UpdateUserDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          userData={user}
        />
      )}
    </>
  );
};

export default UserDetails;
