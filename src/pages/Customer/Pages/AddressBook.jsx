import React, { useState, useEffect } from "react";
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
    Spinner,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import MenuIcon from "@mui/icons-material/Menu";
import LeftSide from "../Components/LeftSide";
import AddressForm from "../Components/AddressForm";
import { customerProfileStore } from "../helper/store";
import { addressBookStore } from "../helper/AddressBookStore";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import TopSide from "../Components/TopSide";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react'
import OptionsMobile from "../Components/OptionsMobile";
import EditAddressForm from "../Components/EditAddressForm";
import { FaAddressBook } from "react-icons/fa";

const AddressBook = () => {
    const toast = useToast();
    const cancelRef = React.useRef()
    const [profileDetails, setProfileDetails] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [addressOption, setAddressOption] = useState(false);
    const [addressDetails, setAddressDetails] = useState([]);
    const [addressBookId, setAddressBookId] = useState("");
    const [editAddressBook, setEditAddressBook] = useState(false);
    const getUserDetails = customerProfileStore((state) => state.customerDetails);
    const getAllAddresses = addressBookStore((state) => state.getAllAddress)
    const [dialogState, setDialogState] = useState({});

    const onOpen = (valId) => {
        setDialogState({ ...dialogState, [valId]: true });
    };

    const onClose = (valId) => {
        setDialogState({ ...dialogState, [valId]: false });
    };

    function handleAddressOption(newValue) {
        setAddressOption(newValue);
    }

    function handleEditAddressOption(newValue) {
        setEditAddressBook(newValue)
    }
    // fetch user details function 
    const fetchAddressDetails = async () => {
        try {

            await getAllAddresses().then((addressd) => {
                setAddressDetails(addressd);
                setIsLoading(false);
            })

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // get user details 
        setProfileDetails(getUserDetails)
    }, [getUserDetails]);


    useEffect(() => {
        fetchAddressDetails();
    }, [])

    // update address details with new detials 
    function updateAddressDetails(newValue) {
        setAddressDetails([...addressDetails, newValue])
    }

    //   delete handler 
    async function deleteHandler(id) {
        try {
            const message = await addressBookStore.getState().deleteAddressBook(id);
            if (message.status === "success") {
                toast({
                    title: "success",
                    description: message.message,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                const addressDetail = await addressBookStore.getState().getAllAddress();
                addressDetail && setAddressDetails(addressDetail);
            }

        } catch (error) {
            toast({
                title: "error",
                description: "Something went wrong",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return error
        }
    }




    return (
        <>
            <div className="w-[100%] flex items-center justify-center my-8">
                <div className="w-[100%] md:w-[80%]">
                    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" className="p-5">
                        <Flex alignItems="center" bg="gray.50" p={4}>
                            <TopSide />
                            <div className="w-[100%] items-center justify-center mb-4 hidden md:flex">
                                <div className="flex gap-x-2 items-center justify-center">
                                    <span className="text-lg font-bold ml-5">My Address Book</span>
                                    <i><FaAddressBook className="text-[#008080]" size={20} /></i>
                                </div>
                            </div>

                            {
                                addressDetails?.length > 0 && (
                                    <Box ml="auto" display={{ base: "none", md: "block" }} >
                                        <IconButton
                                            aria-label="Edit Profile"
                                            icon={<BiSolidMessageSquareAdd />}
                                            onClick={handleAddressOption}
                                        />
                                    </Box>
                                )
                            }

                            <Box display={{ base: "block", md: "none" }} ml={{ base: "auto" }}>
                                <IconButton
                                    aria-label="Open Sidebar"
                                    icon={<MenuIcon />}
                                    onClick={() => setIsDrawerOpen(true)}
                                />
                            </Box>
                        </Flex>
                        <div className="w-[100%] flex items-center justify-between mb-4 md:hidden">
                            <span className="text-sm font-semibold ml-5">My Address Book</span>
                            <div className="mr-5"
                                onClick={handleAddressOption}
                            >
                                <BiSolidMessageSquareAdd />
                            </div>
                        </div>

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
                            {
                                isLoading ? (
                                    <Spinner color="blue.300" />
                                ) : (
                                    <>
                                        {
                                            addressDetails && addressDetails?.length > 0 ? (
                                                <>
                                                    <div className="flex flex-col w-[100%] items-center md:h-96 md:overflow-y-scroll ">
                                                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 w-[90%] ">
                                                            {
                                                                addressDetails?.map((val, index) => (
                                                                    <div key={index} className="bg-[#f7fafc] border border-gray-300 rounded-md p-5 flex flex-col gap-y-1 cursor-auto select-none hover:shadow-2xl">
                                                                        <div className="flex items-center justify-between text-xs">
                                                                            <span>{profileDetails?.firstName} {profileDetails?.lastName}</span>
                                                                            <span className="text-green-500 cursor-pointer" onClick={() => {
                                                                                setAddressBookId(val._id)
                                                                                setEditAddressBook(true)
                                                                            }}>Edit</span>
                                                                        </div>
                                                                        <span className="text-sm">{profileDetails?.phoneNumber}</span>
                                                                        <span className="text-sm">{val.province}, {val.city}, {val.area}</span>
                                                                        <span className="text-xs">
                                                                            <span className="text-red-600 cursor-pointer" onClick={() => onOpen(val._id)}>Delete</span>
                                                                        </span>
                                                                        {/* dialog for the delete  */}
                                                                        <AlertDialog
                                                                            isOpen={dialogState[val._id]}
                                                                            onClose={() => onClose(val._id)}
                                                                            isCentered
                                                                        >
                                                                            <AlertDialogOverlay bg="blackAlpha.300"
                                                                                backdropFilter="blur(10px) hue-rotate(90deg)" >
                                                                                <AlertDialogContent>
                                                                                    <AlertDialogHeader fontSize='sm' fontWeight='bold'>
                                                                                        Delete Address
                                                                                    </AlertDialogHeader>

                                                                                    <AlertDialogBody
                                                                                        fontSize="sm"
                                                                                    >
                                                                                        Are you sure? You want to delete Address
                                                                                    </AlertDialogBody>

                                                                                    <AlertDialogFooter>
                                                                                        <Button ref={cancelRef} onClick={() => onClose(val._id)}>
                                                                                            Cancel
                                                                                        </Button>
                                                                                        <Button colorScheme='red' onClick={() => { deleteHandler(val._id) }} ml={3}>
                                                                                            Delete
                                                                                        </Button>
                                                                                    </AlertDialogFooter>
                                                                                </AlertDialogContent>
                                                                            </AlertDialogOverlay>
                                                                        </AlertDialog>
                                                                    </div>
                                                                ))
                                                            }

                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex flex-col w-[100%] items-center justify-center py-10">
                                                        <div className="w-[80%]  flex gap-y-5 items-center justify-center flex-col" onClick={handleAddressOption}>
                                                            <span className="text-xs  tracking-wide select-none">Save your delivery and billing address</span>
                                                            <div className="flex items-center gap-x-3 justify-center bg-[#008080] px-4 py-2 rounded-md cursor-pointer">
                                                                <span className="text-white text-sm font-semibold">Add Your Delivery Address</span>
                                                                <i><AiOutlinePlus size={20} color="white" /> </i>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }

                                    </>
                                )
                            }

                            {
                                editAddressBook && (
                                    <>
                                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
                                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                <EditAddressForm props={handleEditAddressOption} id={addressBookId} fetchAddressDetails={fetchAddressDetails} />
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>

                                    </>
                                )
                            }

                            {
                                addressOption && (
                                    <>
                                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl">
                                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                <AddressForm props={handleAddressOption}
                                                    profileDetails={profileDetails}
                                                    updateAddressDetails={updateAddressDetails}
                                                />
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
                                        <TopSide />
                                    </div>
                                </DrawerHeader>
                                <DrawerBody>
                                    <OptionsMobile props={"not profile"} />
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </Box>
                </div>
            </div>
        </>
    )
}

export default AddressBook