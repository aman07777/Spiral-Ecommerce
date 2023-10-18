import React, { useCallback, useEffect, useState } from "react";
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
    useToast,
} from "@chakra-ui/react";
import MenuIcon from "@mui/icons-material/Menu";
import { BiSolidCart } from "react-icons/bi";
import LeftSide from "../Components/LeftSide";
import AllOrderList from "./AllOrderList";
import OrderHistory from "./OrderHistory";
import OptionsMobile from "../Components/OptionsMobile";
import TopSide from "../Components/TopSide";
import { orderStore } from "../helper/orderStore";


const MyOrder = () => {
    const toast = useToast();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [what, setWhat] = useState("orders");
    const [myorders, setMyOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]); // New state variable for filtered orders
    const [myDeliveredOrders, setMyDeliveredOrders] = useState([]);
    const [selectOption, setSelectOption] = useState("all");

    //for getting orders
    const getMyOrders = orderStore((state => state.getMyOrders))

    useEffect(() => {
        getMyOrders()
            .then((data) => {
                const deliveredOrders = data.filter(order => order?.orderItems[0].status === 'Delivered');
                setMyOrders(data);
                setFilteredOrders(data); // Set filteredOrders to all orders initially
                setMyDeliveredOrders(deliveredOrders)
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.message || "An error occurred.";
                toast({
                    title: "Error",
                    description: errorMessage,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });
    }, [getMyOrders, toast]);


    const filterOrdersData = useCallback((orders) => {
        let filteredOrder;
        const now = new Date();

        switch (selectOption) {
            case 'last_five':
                filteredOrder = orders?.slice(-5);
                break;
            case 'last_ten':
                filteredOrder = orders?.slice(-10);
                break;
            case 'last_30_days':
                filteredOrder = orders?.filter(order => (now - new Date(order?.createdAt)) / (1000 * 60 * 60 * 24) <= 30);
                break;
            case 'last_6_months':
                filteredOrder = orders?.filter(order => (now - new Date(order?.createdAt)) / (1000 * 60 * 60 * 24) <= 180);
                break;
            case 'all':
            default:
                filteredOrder = orders;
                break;
        }

        if (filteredOrder && filteredOrder.length > 0) {
            setFilteredOrders(filteredOrder);
        } else {
            setFilteredOrders([])
        }
    }, [selectOption]);

    useEffect(() => {
        filterOrdersData(myorders)
    }, [myorders, selectOption, filterOrdersData])


    return (
        <>
            <div className="w-[100%] flex items-center justify-center my-8">
                <div className="w-[100%] md:w-[80%]">
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" className="p-5">
                        <Flex alignItems="center" bg="gray.50" p={4}>
                            <TopSide />
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
                            <span className="text-lg font-bold">My Orders</span>
                            <i><BiSolidCart className="text-[#008080]" size={20} /></i>
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

                            <div className="flex flex-col items-center justifty-center gap-y-8 w-[100%] h-96 overflow-y-scroll ">
                                <div className="w-[90%] bg-white">
                                    <div className="mb-4">
                                        <hr></hr>
                                        <div className="flex gap-x-10">
                                            <span className={`text-sm cursor-pointer  ${what === "orders" && "border-t-2 border-[#008080]"}`} onClick={(e) => { setWhat("orders") }}>Orders</span>
                                            <span className={`text-sm cursor-pointer ${what === "history" && "border-t-2 border-[#008080]"}`} onClick={(e) => { setWhat("history") }}>History</span>
                                        </div>
                                    </div>
                                    <div className={`flex gap-x-3 mb-3 ${what === "history" && "hidden"}`}>
                                        <span>Show:</span>
                                        <select variant="static" label="select Version" onChange={(e) => setSelectOption(e.target.value)}>
                                            <option value="all">All</option>
                                            <option value="last_five">Last 5 orders</option>
                                            <option value="last_ten">Last 10 orders</option>
                                            <option value="last_30_days">Last 30 days</option>
                                            <option value="last_6_months">Last 6 months</option>
                                        </select>
                                    </div>

                                    {
                                        what === "orders" && (
                                            <>
                                                <div className="flex flex-col gap-y-3">
                                                    {
                                                        filteredOrders?.map((val) => (
                                                            <React.Fragment key={val._id}>
                                                                <AllOrderList val={val} />
                                                            </React.Fragment>
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
                                                        myDeliveredOrders?.length > 0 ? (
                                                            myDeliveredOrders?.map((val) => (
                                                                <div key={val._id}>
                                                                    <OrderHistory val={val} />
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <span>No item found</span>
                                                        )
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
                                        <TopSide />
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

export default MyOrder;