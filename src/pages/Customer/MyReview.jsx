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
import { AiFillStar } from "react-icons/ai";


const MyReview = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("johndoe@example.com");
    const [bonus, setBonus] = useState(100);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);


    const reviewData = [
        {
            name: "Oil Proof Self Adhesive Kitchen Marble Sticker - 3M x 61cm",
            reviewText: "Good Items. Everyone should buy it, Most Recommended",
            image: "https://static-01.daraz.com.np/p/e6ca1cabe9129183c8c8aecb34c97f90.jpg",
            star: 4
        },
        {
            name: "Oil Proof Self Adhesive Kitchen Marble Sticker - 3M x 61cm",
            reviewText: "Good Items. Everyone should buy it, Most Recommended",
            image: "https://static-01.daraz.com.np/p/262c1880732779acba145d0cc0eca092.jpg_400x400q75.jpg_.webp",
            star: 2
        },
        {
            name: "Oil Proof Self Adhesive Kitchen Marble Sticker - 3M x 61cm",
            reviewText: "Good Items. Everyone should buy it, Most Recommended",
            image: "https://static-01.daraz.com.np/p/12f4a625c7b7adb3f80b15fa322064d2.jpg",
            star: 3
        },
        {
            name: "Oil Proof Self Adhesive Kitchen Marble Sticker - 3M x 61cm",
            reviewText: "Good Items. Everyone should buy it, Most Recommended",
            image: "https://static-01.daraz.com.np/p/7e5cb63ffa7d5225bf21c0ab024f33b4.jpg",
            star: 5
        },
    ]

    function StarRating({ rating }) {
        const stars = Array.from({ length: 5 }, (_, index) => (
            <AiFillStar key={index} className={index < rating ? 'text-yellow-400' : ''} />
        ));

        return <div className="flex gap-x-2">{stars}</div>;
    }


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
                            <div className="w-full items-center justify-center hidden md:flex gap-x-2" >
                                <span className="text-lg font-bold">My Review</span>
                                <i><MdPreview className="text-[#008080]" size={20} /></i>
                            </div>
                            <Box display={{ base: "block", md: "none" }} ml={{ base: "auto" }}>
                                <IconButton
                                    aria-label="Open Sidebar"
                                    icon={<MenuIcon />}
                                    onClick={() => setIsDrawerOpen(true)}
                                />
                            </Box>
                        </Flex>
                        <div className="w-full items-center justify-center flex md:hidden gap-x-2" >
                            <span className="text-lg font-bold">My Review</span>
                            <i><MdPreview className="text-[#008080]" size={20} /></i>
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

                            <div className="w-[100%] grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:gird-cols-3 2xl:grid-cols-4 gap-4 p-2 md:h-96 overflow-y-scroll">

                                {
                                    reviewData?.map((item, index) => (
                                        <>
                                            {/* review page start  */}
                                            <div key={index} className="p-5 bg-gray-100 flex flex-col gap-y-3 items-center rounded-md cursor-pointer">
                                                <div className="w-[7rem] h-[7rem] rounded-full border border-black">
                                                    <img src={item.image} className="rounded-full w-[7rem] h-[7rem]" />
                                                </div>
                                                <div className="w-full flex items-center justify-center">
                                                    <span className="text-sm font-semibold">{item.name}</span>
                                                </div>
                                                <div className="w-full flex items-center justify-center">
                                                    <span className="text-xs tracking-wide">{`"${item.reviewText}"`}</span>
                                                </div>
                                                <div className="flex gap-x-2">
                                                    <StarRating rating={item.star} />
                                                </div>
                                            </div>
                                            {/* review page end  */}
                                        </>
                                    ))
                                }

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

export default MyReview;