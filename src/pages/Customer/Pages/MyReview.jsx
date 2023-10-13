import React, { useState } from "react";
import {
    Box,
    Flex,
    Heading,
    IconButton,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
} from "@chakra-ui/react";
import MenuIcon from "@mui/icons-material/Menu";
import { MdPreview } from "react-icons/md";
import LeftSide from "../Components/LeftSide";
import { AiFillStar } from "react-icons/ai";
import OptionsMobile from "../Components/OptionsMobile";
import TopSide from "../Components/TopSide";


const MyReview = () => {
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
                            <TopSide/>
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
                                        <TopSide/>
                                    </div>
                                </DrawerHeader>
                                <DrawerBody>
                                    <OptionsMobile props={"Not Profile"} />
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