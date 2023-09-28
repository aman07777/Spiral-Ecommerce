import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import { FaAddressBook, FaThList } from "react-icons/fa";
import { MdOutlinePayment, MdPreview } from "react-icons/md";
import { BiSolidCart, BiLogOut } from "react-icons/bi";
import EditProfile from "./EditProfile";
import ChangePasswordModal from "./ChangePasswordModal";
import { FaUserCircle } from "react-icons/fa";
import LeftSide from "./LeftSide";

const CustomerProfile = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [birthday, setBirthday] = useState("1990-01-01");
  const [password, setPassword] = useState("");
  const [bonus, setBonus] = useState(100);
  const [image, setImage] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  // const handlePasswordChange = () => {
  //   // TODO: Implement password change logic
  // };

  // const handleImageUpload = () => {
  //   // TODO: Implement image upload logic
  // };

  const handleLogout = () => {
    // TODO: Implement logout logic
  };

  const handleEditProfile = (newValue) => {
    setIsDrawerOpen(false);
    // TODO: Implement edit profile logic
    setEditProfile(newValue);
  };

  function handleChangePassword(newValue) {
    setChangePassword(newValue);
  }

  return (
    <div className="w-[100%] flex items-center justify-center my-8">
      <div className="w-[100%] md:w-[80%]">
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          className="p-5"
        >
          <Flex alignItems="center" bg="gray.50" p={4}>
            <Avatar size="lg" name={`${firstName} ${lastName}`} src={image} />
            <Box ml={4}>
              <Text fontWeight="bold">{`${firstName} ${lastName}`}</Text>
              <Text fontSize="sm" className="font-roboto">
                {email}
              </Text>
              <Text fontSize="sm">
                Bonus: <span className="font-roboto">{bonus}</span>
              </Text>
            </Box>
            <Box ml="auto" display={{ base: "none", md: "block" }}>
              <IconButton
                aria-label="Edit Profile"
                icon={<EditIcon />}
                onClick={handleEditProfile}
              />
            </Box>
            <Box display={{ base: "block", md: "none" }} ml={{ base: "auto" }}>
              <IconButton
                aria-label="Open Sidebar"
                icon={<MenuIcon />}
                onClick={() => setIsDrawerOpen(true)}
              />
            </Box>
          </Flex>
          {editProfile && (
            <>
              <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto shadow-2xl outline-none focus:outline-none">
                <div className="relative w-auto max-w-3xl mx-auto my-6">
                  <EditProfile props={handleEditProfile} />
                </div>
              </div>
              <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
            </>
          )}
          <Flex className="">
            <Box
              w={{ base: "100%", md: "35%" }}
              bg="gray.50"
              p={4}
              display={{ base: "none", md: "block" }}
            >
              <Heading size="md" mb={8}>
                My Account
              </Heading>
              <LeftSide />
            </Box>

            <div className="flex flex-col gap-y-8 w-[100%] pt-2 pl-3">
              <div className="grid xl:grid-cols-3 md:grid-cols-2 @[922px]:grid-cols-2 sm:grid-cols-2 gap-y-6  select-none w-[75%] items-center ">
                <div className="flex flex-col gap-y-2">
                  <span className="font-semibold">Full name</span>
                  <span className="text-sm tracking-wide font-roboto">{`${firstName} ${lastName}`}</span>
                </div>
                <div className="flex flex-col gap-y-2">
                  <span className="font-semibold">Email</span>
                  <span className="text-sm tracking-wide font-roboto">
                    {email}
                  </span>
                </div>
                <div className="flex flex-col gap-y-2">
                  <span className="font-semibold">Mobile Number</span>
                  <span className="text-sm tracking-wide font-roboto">
                    9803234232
                  </span>
                </div>
                <div className="flex flex-col gap-y-2">
                  <span className="font-semibold">Birthday</span>
                  <div>
                    <span className="text-sm tracking-wide font-roboto">
                      {birthday}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <span className="font-semibold">Gender</span>
                  <span className="text-sm tracking-wide font-roboto">
                    Male
                  </span>
                </div>
              </div>
              <span
                className="px-4 w-[10rem] py-2 bg-[#008080] text-white rounded-md text-sm font-semibold tracking-wide cursor-pointer"
                onClick={handleChangePassword}
              >
                Change Password
              </span>
            </div>
            {changePassword && (
              <>
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto shadow-2xl outline-none focus:outline-none">
                  <div className="relative w-auto max-w-3xl mx-auto my-6">
                    <ChangePasswordModal props={handleChangePassword} />
                  </div>
                </div>
                <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
              </>
            )}
          </Flex>
          <Drawer
            placement="left"
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                <div className="">
                  <Avatar
                    size="lg"
                    name={`${firstName} ${lastName}`}
                    src={image}
                    className="mb-3"
                  />
                  <Box>
                    <Text fontWeight="bold">{`${firstName} ${lastName}`}</Text>
                    <Text fontSize="sm">{email}</Text>
                    <Text fontSize="sm">{`Bonus: ${bonus}`}</Text>
                  </Box>
                </div>
              </DrawerHeader>
              <DrawerBody>
                <div className="flex flex-col gap-y-6">
                  <div className="flex gap-x-2 items-center cursor-pointer " onClick={() => {
                    navigate('/profile/customer')
                  }}>
                    <i><FaUserCircle size={20} className="text-[#008080]" /></i>
                    <span className="text-sm  font-semibold hover:text-[#008080]">My Profile</span>
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
                    onClick={() => {
                      navigate("/profile/whishlist");
                    }}
                  >
                    <i>
                      <FaThList size={20} className="text-[#008080]" />
                    </i>
                    <span className="text-sm  font-semibold hover:text-[#008080]">
                      My Whishlist
                    </span>
                  </div>
                  <div
                    className="flex items-center cursor-pointer gap-x-2 "
                    onClick={() => {
                      navigate("/profile/myreview");
                    }}
                  >
                    <i>
                      <MdPreview size={20} className="text-[#008080]" />
                    </i>
                    <span className="text-sm  font-semibold hover:text-[#008080]">
                      My Review
                    </span>
                  </div>
                  <div className="flex items-center cursor-pointer gap-x-2 ">
                    <i>
                      <BiLogOut size={20} className="text-[#008080]" />
                    </i>
                    <span className="text-sm  font-semibold hover:text-[#008080]">
                      Log Out
                    </span>
                  </div>
                  <span
                    className="px-4 w-[10rem] py-2 bg-[#008080] text-white rounded-md text-sm font-semibold tracking-wide cursor-pointer"
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </span>
                </div>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </div>
    </div>
  );
};

export default CustomerProfile;
