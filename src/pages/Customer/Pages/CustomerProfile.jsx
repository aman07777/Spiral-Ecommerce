import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  IconButton,
  Drawer,
  Spinner,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import EditProfile from "../Components/EditProfile";
import ChangePasswordModal from "../Components/ChangePasswordModal";
import LeftSide from "../Components/LeftSide";
import OptionsMobile from "../Components/OptionsMobile";
import { customerProfileStore } from "../helper/store";
import { FaUserCircle } from "react-icons/fa";


const CustomerProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const getUserDetails = customerProfileStore((state) => state.getCustomerDetails);

  useEffect(() => {
    // get user details 
    getUserDetails().then((data) => {
      setUserDetails(data)
      setIsLoading(false)
    })
  }, [getUserDetails]);

  const handleLogout = () => {
    // TODO: Implement logout logic
  };

  const handleEditProfile = (newValue) => {
    setIsDrawerOpen(false)
    setEditProfile(newValue)
  };

  function updateUserDetails(newValue) {
    setUserDetails(newValue)
  }

  function handleChangePassword(newValue) {
    setChangePassword(newValue)
  }

  // converting backend date 
  function convertBackendDate(inputDateString) {
    const date = new Date(inputDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <>
      {
        isLoading ? (
         
            <div className="flex items-center justify-center h-screen">
              <div className="loader"></div>
            </div>
        ) : (
          <div className="w-[100%] flex items-center justify-center my-8">
            <div className="w-[100%] md:w-[80%]">
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden" className="p-5">
                <Flex alignItems="center" bg="gray.50" p={4}>
                  {
                    isLoading ? (
                      <Spinner color="blue.300" />
                    ) : (
                      <>
                        <Avatar size="lg" name={`${userDetails?.firstName} ${userDetails?.lastName}`} src={""} />
                        <Box ml={4}>
                          <Text fontWeight="bold">{`${userDetails?.firstName} ${userDetails?.lastName}`}</Text>
                          <Text fontSize="sm" className="font-roboto">{userDetails?.email}</Text>
                        </Box>

                      </>
                    )
                  }
                  <div className="w-[100%] items-center justify-center mb-4 hidden md:flex">
                    <div className="flex gap-x-2 items-center justify-center">
                      <span className="text-lg font-bold ml-5">My Profile</span>
                      <i><FaUserCircle className="text-[#008080]" size={20} /></i>
                    </div>
                  </div>
                  <Box ml="auto" display={{ base: "none", md: "block" }} >
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
                <div className="w-[100%] flex items-center justify-start mb-4 mt-3 md:hidden">
                  <span className="text-sm font-semibold">My Address Book</span>
                </div>
                {
                  editProfile && (
                    <>
                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                          <EditProfile props={handleEditProfile} userProfile={userDetails}
                            updateUserDetail={updateUserDetails}
                          />
                        </div>
                      </div>
                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                  )
                }
                <Flex>
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

                  <div className="flex flex-col gap-y-8 w-[100%] ">
                    <div className="grid xl:grid-cols-3 md:grid-cols-2 @[922px]:grid-cols-2 sm:grid-cols-2 gap-y-6  select-none w-[75%] items-center ">
                      <div className="flex flex-col gap-y-2">
                        <span className="font-semibold">Full name</span>
                        <span className="font-roboto text-sm tracking-wide">{`${userDetails?.firstName} ${userDetails?.lastName}`}</span>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <span className="font-semibold">Email</span>
                        <span className="font-roboto text-sm tracking-wide">{userDetails?.email}</span>
                      </div>
                      <div className="flex flex-col gap-y-2 xl:ml-6">
                        <span className="font-semibold">Mobile Number</span>
                        <span className="font-roboto text-sm tracking-wide">{userDetails?.phoneNumber || ""}</span>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <span className="font-semibold">Birthday</span>
                        <div>
                          <span className="font-roboto text-sm tracking-wide">{userDetails?.birthDate ? convertBackendDate(userDetails.birthDate) : "Add your birthday"}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <span className="font-semibold">Gender</span>
                        <span className="font-roboto text-sm tracking-wide">{userDetails?.gender}</span>
                      </div>
                    </div>
                    <span className="px-4 w-[10rem] py-2 bg-[#008080] text-white rounded-md text-sm font-semibold tracking-wide cursor-pointer" onClick={handleChangePassword}>
                      Change Password
                    </span>
                  </div>
                  {
                    changePassword && (
                      <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
                          <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <ChangePasswordModal props={handleChangePassword} />
                          </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                      </>
                    )
                  }
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
                        {
                          isLoading ? (
                            <Spinner color="blue.300" />
                          ) : (
                            <>
                              <Avatar size="lg" name={`${userDetails?.firstName} ${userDetails?.lastName}`} src={""} />
                              <Box ml={4}>
                                <Text fontWeight="bold">{`${userDetails?.firstName} ${userDetails?.lastName}`}</Text>
                                <Text fontSize="sm" className="font-roboto">{userDetails?.email}</Text>
                                <Text fontSize="sm">Bonus: <span className="font-roboto">100</span></Text>
                              </Box>

                            </>
                          )
                        }
                      </div>
                    </DrawerHeader>
                    <DrawerBody>
                      <OptionsMobile props={handleEditProfile} />
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </Box>
            </div>
          </div>
        )
      }
    </>
  );
};

export default CustomerProfile;
