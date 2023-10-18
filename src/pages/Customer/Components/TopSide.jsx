import React, { useState, useEffect } from 'react'
import { Avatar, Box, Text, Spinner } from '@chakra-ui/react'
import { customerProfileStore } from '../helper/store'

const TopSide = () => {
    const [profileDetails, setProfileDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const getUserDetails = customerProfileStore((state) => state.getCustomerDetails);

    useEffect(() => {
        getUserDetails().then((data) => {
            setProfileDetails(data);
            setIsLoading(false)
        })
    }, [getUserDetails])


    return (
        <>
            {
                isLoading ? (
                    <Spinner color="blue.300" />
                ) : (
                    <>
                        <Avatar size="lg" name={`${profileDetails?.firstName} ${profileDetails?.lastName}`} src={""} />
                        <Box ml={4}>
                            <Text fontWeight="bold">{`${profileDetails?.firstName} ${profileDetails?.lastName}`}</Text>
                            <Text fontSize="sm" className="font-roboto">{profileDetails?.email}</Text>
                            <Text fontSize="sm">Bonus: <span className="font-roboto">100</span></Text>
                        </Box>

                    </>
                )
            }
        </>
    )
}

export default TopSide