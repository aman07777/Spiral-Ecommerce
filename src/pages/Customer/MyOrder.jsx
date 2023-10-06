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
import MenuIcon from "@mui/icons-material/Menu";
import { FaAddressBook, FaThList } from "react-icons/fa";
import { MdOutlinePayment, MdPreview } from "react-icons/md";
import { BiSolidCart, BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import LeftSide from "./LeftSide";
import { MdFavorite } from "react-icons/md";
import AllOrderList from "./AllOrderList";
import OrderHistory from "./OrderHistory";


const MyOrder = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("johndoe@example.com");
    const [bonus, setBonus] = useState(100);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [what, setWhat] = useState("orders");


    const item = [
        {
            name: "Oil Proof Self Adhesive Kitchen Marble Sticker - 3M x 61cm",
            color: "Black",
            price: 120,
            status: "pending",
            image: "https://static-01.daraz.com.np/p/e6ca1cabe9129183c8c8aecb34c97f90.jpg"
        },
        {
            name: "Oil Proof Self Adhesive Kitchen Marble Sticker - 3M x 61cm",
            color: "Black",
            price: 100,
            status: "sold",
            image: "https://static-01.daraz.com.np/p/262c1880732779acba145d0cc0eca092.jpg_400x400q75.jpg_.webp"
        },
        {
            name: "Oil Proof Self Adhesive Kitchen Marble Sticker - 3M x 61cm",
            color: "Black",
            price: 110,
            status: "canceled",
            image: "https://static-01.daraz.com.np/p/e6ca1cabe9129183c8c8aecb34c97f90.jpg"
        },
        {
            name: "Classic Blue Ray Cut Silver/Black Frame Computer Glass With Cover For Unisex",
            color: "Black",
            price: 120,
            status: "pending",
            image: "https://static-01.daraz.com.np/p/f8e7d0f1a4e525540390c4b4979e73ab.jpg_400x400q75.jpg_.webp"
        },
        {
            name: "Oil Proof Self Adhesive Kitchen Marble Sticker - 3M x 61cm",
            color: "Black",
            price: 90,
            status: "pending",
            image: "https://static-01.daraz.com.np/p/e6ca1cabe9129183c8c8aecb34c97f90.jpg"
        },

    ]


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
                            <div className="w-full items-center justify-center gap-x-2 hidden md:flex" >
                                <span className="text-lg font-bold">My Orders</span>
                                <i><BiSolidCart className="text-[#008080]" size={20} /></i>
                            </div>
                            <Box display={{ base: "block", md: "none" }} ml={{ base: "auto" }}>
                                <IconButton
                                    aria-label="Open Sidebar"
                                    icon={<MenuIcon />}
                                    onClick={() => setIsDrawerOpen(true)}
                                />
                            </Box>
                        </Flex>


                        <div className="w-full items-center justify-center gap-x-2 mb-7 flex md:hidden" >
                            <span className="text-lg font-bold">My favorites</span>
                            <i><MdFavorite className="text-[#008080]" size={20} /></i>
                        </div>

                        <Flex className="md:h-96">
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

                            <div className="flex flex-col items-center justifty-center gap-y-8 w-[100%] md:h-96 overflow-y-scroll ">
                                <div className="w-[90%] bg-white">
                                    <div className="mb-4">
                                        <hr></hr>
                                        <div className="flex gap-x-10">
                                            <span className={`text-sm cursor-pointer  ${what === "orders" && "border-t-2 border-[#008080]"}`} onClick={(e) => { setWhat("orders") }}>Orders</span>
                                            <span className={`text-sm cursor-pointer ${what === "history" && "border-t-2 border-[#008080]"}`} onClick={(e) => { setWhat("history") }}>History</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-x-3 mb-3">
                                        <span>Show:</span>
                                        <select variant="static" label="select Version">
                                            <option>Last 5 orders</option>
                                            <option>Last 10 orders</option>
                                            <option>Last 30 days</option>
                                            <option>Last 6 months</option>
                                            <option>All</option>
                                        </select>
                                    </div>

                                    {
                                        what === "orders" && (
                                            <>
                                                <div className="flex flex-col gap-y-3">
                                                    {
                                                        item?.map((val, index) => (
                                                            <>
                                                                <AllOrderList val={val} key={index} />
                                                            </>
                                                        ))
                                                    }
                                                </div>
                                            </>
                                        )
                                    }

                                    {
                                        what === "history" && (
                                            <>
                                                <div className="flex flex-col gap-y-3">
                                                    {
                                                        item?.map((val, index) => (
                                                            <>
                                                                <OrderHistory val={val} key={index} />
                                                            </>
                                                        ))
                                                    }
                                                </div>
                                            </>
                                        )
                                    }
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

export default MyOrder;