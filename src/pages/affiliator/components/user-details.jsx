import { Avatar } from "@chakra-ui/react";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlinePhone } from "react-icons/hi";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
const UserDetails = ({ user }) => {
  return (
    <>
      <div className="flex flex-col min-w-[350px] @[850px]:min-w-[500px] text-[#585858] relative @[650px]:border-l-[.15rem] border-b-[.15rem] pb-5 rounded">
        <h3 className="tracking-wide uppercase px-4 @[650px]:hidden block font-semibold font-mono text-[1.5rem] absolute mt-3 top-0 left-0">
          aijo
        </h3>
        <div className="flex flex-col items-center justify-center mt-5">
          <Avatar
            size="xl"
            name={`${user?.firstName} ${user?.lastName}`}
            src={user?.image}
          />
          <div className="flex items-center gap-x-2">
            <p className="font-semibold  mt-1 text-[1.2rem]">{`${user?.firstName} ${user?.lastName}`}</p>
            <BiSolidMessageSquareEdit
              className="text-[1.2rem] cursor-pointer"
              title="update profile"
            />
          </div>
          <p className="font-semibold text-[1.1rem]">{user?.address}</p>
          <div className="w-full mt-1 px-[2em]">
            <p className=" font-semibold text-[1.1rem]">Contacts</p>
            <div className="flex flex-col mt-1 gap-x-3">
              <div className="flex items-center gap-x-2">
                <AiOutlineMail className="text-[1.2rem]" />
                <p className="font-semibold text-[1rem]">{user?.email}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <HiOutlinePhone className="text-[1.2rem]" />
                <p className="font-semibold text-[1rem]">{user?.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
