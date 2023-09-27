import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import LeftSide from "./LeftSide";



const PaymentOption = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("johndoe@example.com");
    const [bonus, setBonus] = useState(100);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    return (
        <>
            <div className="w-[100%] flex items-center justify-center my-8">
                <div className="w-[100%] md:w-[80%]">
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" className="p-5">
                        <Flex alignItems="center" bg="gray.50" p={4}>
                            <Avatar size="lg" name={`${firstName} ${lastName}`} src={image} />
                            <Box ml={4}>
                                <Text fontWeight="bold">{`${firstName} ${lastName}`}</Text>
                                <Text fontSize="sm" className="font-roboto">{email}</Text>
                                <Text fontSize="sm">Bonus: <span className="font-roboto">{bonus}</span></Text>
                            </Box>
                            <Box ml="auto" display={{ base: "none", md: "block" }} >
                                <IconButton
                                    aria-label="Edit Profile"
                                    icon={<EditIcon />}
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

                                </div>

                            </div>

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
                                        <Avatar size="lg" name={`${firstName} ${lastName}`} src={image} className="mb-3" />
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
                                            navigate('/profile')
                                        }}>
                                            <i><FaUserCircle size={20} className="text-[#008080]" /></i>
                                            <span className="text-sm  font-semibold hover:text-[#008080]">My Profile</span>
                                        </div>
                                        <div className="flex gap-x-2 items-center cursor-pointer ">
                                            <i><FaAddressBook size={20} className="text-[#008080]" /></i>
                                            <span className="text-sm  font-semibold hover:text-[#008080]">Address Book</span>
                                        </div>
                                        <div className="flex gap-x-2 items-center cursor-pointer ">

                                            <i><MdOutlinePayment size={20} className="text-[#008080]" /></i>
                                            <span className="text-sm  font-semibold hover:text-[#008080]">Payment Options</span>
                                        </div>
                                        <div className="flex gap-x-2 items-center cursor-pointer ">

                                            <i><BiSolidCart size={20} className="text-[#008080]" /></i>
                                            <span className="text-sm  font-semibold hover:text-[#008080]">My Orders</span>
                                        </div>
                                        <div className="flex gap-x-2 items-center cursor-pointer ">

                                            <i><FaThList size={20} className="text-[#008080]" /></i>
                                            <span className="text-sm  font-semibold hover:text-[#008080]">My Whishlist</span>
                                        </div>
                                        <div className="flex gap-x-2 items-center cursor-pointer ">

                                            <i><MdPreview size={20} className="text-[#008080]" /></i>
                                            <span className="text-sm  font-semibold hover:text-[#008080]">My Review</span>
                                        </div>
                                        <div className="flex gap-x-2 items-center cursor-pointer ">

                                            <i><BiLogOut size={20} className="text-[#008080]" /></i>
                                            <span className="text-sm  font-semibold hover:text-[#008080]">Log Out</span>
                                        </div>
                                        <span className="px-4 w-[10rem] py-2 bg-[#008080] text-white rounded-md text-sm font-semibold tracking-wide cursor-pointer" >
                                            Edit Profile
                                        </span>
                                    </div>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </Box>
                </div>
            </div>
        </>
    )
}

export default PaymentOption