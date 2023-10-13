import React, { useState, useEffect } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { customerProfileStore } from '../helper/store';
import { useToast } from '@chakra-ui/react';


const EditProfile = ({ props, userProfile, updateUserDetail }) => {
    const toast = useToast();

    // update to user details triggring the store
    const update_user_details = customerProfileStore((state) => state.getCustomerDetails)

    // converting backend date 
    function convertBackendDate(inputDateString) {
        const date = new Date(inputDateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const formattedBirthDate = convertBackendDate(userProfile?.birthDate || "");

    const [userData, setUserData] = useState({
        firstName: userProfile?.firstName || "",
        lastName: userProfile?.lastName || "",
        birthDate: formattedBirthDate,
        phoneNumber: userProfile?.phoneNumber || "",
        gender: userProfile?.gender || "male"
    })


    // Function to handle changes in input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value.trim(),
        });
    };

    // update user details 
    const updateUserDetails = async () => {
        try {
            const userDetails = await customerProfileStore.getState().editCustomerDetails(userData, userProfile?._id);

            if (Array.isArray(userDetails) || userDetails instanceof Error) {
                toast({
                    title: "Error",
                    description: userDetails.message,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "success",
                    description: "Profile Successfully Updated!",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                updateUserDetail(userDetails);
                update_user_details();
                props(false)
            }

        } catch (error) {
            console.error(error);
        }
    };

    // if all fields are non-empty
    const areAllFieldsFilled = () => {
        return (
            userData.firstName.trim() !== "" &&
            userData.lastName.trim() !== "" &&
            userData.birthDate.trim() !== "" &&
            userData.phoneNumber.trim() !== "" &&
            userData.gender.trim() !== ""
        );
    };

    // submit handler
    function handleEditSubmit() {
        // Check if all fields are filled before calling updateUserDetails
        if (areAllFieldsFilled()) {
            updateUserDetails();
        } else {
            alert("Fields can't be empty!!");
        }
    }


    return (
        <>
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-[30rem]  pb-5">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <span className='font-bold'>Edit your profile</span>
                    <i className="p-1 ml-auto float-right" onClick={() => props(false)}>
                        <AiOutlineClose
                            size={30}
                            className="text-red-900 block cursor-pointer"
                        />
                    </i>
                </div>
                {/* body  */}
                {/*body*/}
                <div className="relative p-6 flex-auto break-words space-y-3 overflow-y-scroll">
                    {/* User personal detail Section */}
                    <div className="flex flex-col gap-3">
                        <div>
                            <span className='text-sm font-semibold'>First Name</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    className="border border-gray-400 rounded-md pl-3 py-2 w-72 md:w-96 text-sm"
                                    name="firstName"
                                    value={userData?.firstName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div>
                            <span className='text-sm font-semibold'>Last Name</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    className="border border-gray-400 rounded-md pl-3 py-2 w-72 md:w-96 text-sm"
                                    name='lastName'
                                    value={userData?.lastName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className='flex gap-x-3'>
                            <input
                                className="hidden"
                                type="radio"
                                id="male"
                                value="male"
                                name="gender"
                                checked={userData?.gender === 'male'}
                                onChange={handleInputChange}
                            />
                            <label
                                className={`${userData?.gender === 'male' ? 'bg-[#008080] text-white' : 'bg-gray-300'
                                    } hover:bg-[#008080] hover:text-white font-semibold py-2 px-4 cursor-pointer rounded-l`}
                                htmlFor="male"
                            >
                                Male
                            </label>
                            <input
                                className="hidden"
                                type="radio"
                                id="female" 
                                value="female"
                                name="gender"
                                checked={userData?.gender === 'female'}
                                onChange={handleInputChange}
                            />
                            <label
                                className={`${userData?.gender === 'female' ? 'bg-[#008080] text-white' : 'bg-gray-300'
                                    } hover:bg-[#008080] hover:text-white font-semibold py-2 px-4 cursor-pointer`}
                                htmlFor="female"
                            >
                                Female
                            </label>
                            <input
                                className="hidden"
                                type="radio"
                                id="not-specified"
                                value="not specified"
                                name="gender"
                                checked={userData?.gender === 'not specified'}
                                onChange={handleInputChange}
                            />
                            <label
                                className={`${userData?.gender === 'not specified' ? 'bg-[#008080] text-white' : 'bg-gray-300'
                                    } hover:bg-[#008080] hover:text-white font-semibold py-2 px-4 cursor-pointer rounded-r`}
                                htmlFor="non-specified"
                            >
                                Non Specified
                            </label>
                        </div>
                        <div>
                            <span className='text-sm font-semibold'>Phone Number</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    placeholder="980342423"
                                    className="border border-gray-400 rounded-md pl-3 py-2 w-72 md:w-96 text-sm"
                                    name='phoneNumber'
                                    value={userData?.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div>
                            <span className='text-sm font-semibold'>Birthday</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="date"
                                    placeholder="1999-01-11"
                                    className="border border-gray-400 rounded-md pl-3 py-2 w-72 md:w-96 text-sm"
                                    name='birthDate'
                                    value={userData?.birthDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <span
                                className="mt-4 px-8 py-2 rounded-md bg-[#008080] text-white cursor-pointer"
                                onClick={handleEditSubmit}
                            >
                                Save
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfile