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
import { FaCartPlus } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";


const MyWhislist = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("johndoe@example.com");
    const [bonus, setBonus] = useState(100);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    const item = [
        {
            name: "Oil Proof Self Adhesive Kitchen Marble Sticker - 3M x 61cm",
            color: "Black",
            price: 120,
            discount: 4,
            image: "https://static-01.daraz.com.np/p/e6ca1cabe9129183c8c8aecb34c97f90.jpg"
        },
        {
            name: "Oil Proof Self Adhesive Kitchen Marble Sticker - 3M x 61cm",
            color: "Black",
            price: 120,
            discount: 0,
            image: "https://static-01.daraz.com.np/p/262c1880732779acba145d0cc0eca092.jpg_400x400q75.jpg_.webp"
        },
        {
            name: "Oil Proof Self Adhesive Kitchen Marble Sticker - 3M x 61cm",
            color: "Black",
            price: 120,
            discount: 4,
            image: "https://static-01.daraz.com.np/p/e6ca1cabe9129183c8c8aecb34c97f90.jpg"
        },
        {
            name: "Classic Blue Ray Cut Silver/Black Frame Computer Glass With Cover For Unisex",
            color: "Black",
            price: 120,
            discount: 2,
            image: "https://static-01.daraz.com.np/p/f8e7d0f1a4e525540390c4b4979e73ab.jpg_400x400q75.jpg_.webp"
        },
        {
            name: "Oil Proof Self Adhesive Kitchen Marble Sticker - 3M x 61cm",
            color: "Black",
            price: 120,
            discount: 4,
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
                            <div className="w-full items-center justify-center flex gap-x-2" >
                                <span className="text-lg font-bold">My favorites</span>
                                <i><MdFavorite className="text-[#008080]" size={20}/></i>
                            </div>
                            <Box display={{ base: "block", md: "none" }} ml={{ base: "auto" }}>
                                <IconButton
                                    aria-label="Open Sidebar"
                                    icon={<MenuIcon />}
                                    onClick={() => setIsDrawerOpen(true)}
                                />
                            </Box>
                        </Flex>

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
                                <div className="w-[90%]">
                                    <span className="text-xs mb-4">Watchlist</span>
                                    <div className="flex flex-col gap-y-3">
                                        {
                                            item?.map((val, index) => (
                                                <>
                                                    <div key={index} className="p-5 bg-gray-100">
                                                        <div className="w-[100%] flex items-end justify-end">
                                                            <span><AiOutlineCloseCircle size={20} className="cursor-pointer text-orange-700" /></span>
                                                        </div>
                                                        {/* one item  */}
                                                        <div className="flex min-[320px]:flex-col md:flex-row ">
                                                            <div className="w-full md:w-[60%]  flex">
                                                                <img src={val.image} className="w-[5rem] object-cover" />
                                                                <div className="px-3 flex flex-col gap-y-2">
                                                                    <span className="text-sm font-semibold">{val.name}</span>
                                                                    <span className="text-xs">Color family: {val.color}</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-col gap-y-2 w-full md:w-[20%] ">
                                                                <span className="text-lg text-[#008080]"> Rs.{
                                                                    Math.floor(val.price - ((val.price / 100) * val.discount))
                                                                }</span>
                                                                {
                                                                    val.discount > 0 && (
                                                                        <>
                                                                            <div className="flex gap-x-2">
                                                                                <Text
                                                                                    fontSize="sm"
                                                                                    color="#0077B5"
                                                                                    textDecoration="line-through"
                                                                                >
                                                                                    Rs. {val.price}
                                                                                </Text>
                                                                                <span className="text-sm">- {val.discount}%</span>
                                                                            </div>
                                                                            <span className="text-green-400 text-xs">Price dropped</span>
                                                                        </>
                                                                    )
                                                                }

                                                            </div>
                                                            <div className="w-full md:w-[20%] flex flex-col items-end  md:items-center justify-center gap-y-3">
                                                                <span><FaCartPlus size={25} className="cursor-pointer text-[#008080]" /></span>
                                                            </div>
                                                        </div>
                                                        {/* one item end  */}
                                                    </div>
                                                </>
                                            ))
                                        }
                                    </div>

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

export default MyWhislist;