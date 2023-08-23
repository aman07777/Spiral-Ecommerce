import React, { useState, useEffect } from 'react';

import { Box, Flex, Image, IconButton } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const images = [
    " https://icms-image.slatic.net/images/ims-web/6e743cde-460d-430a-b4e3-0e5b42361e0a.jpg_1200x1200.jpg",
    "https://icms-image.slatic.net/images/ims-web/acf2f203-656e-4501-8060-fa5f78b2df66.jpg",
    "https://icms-image.slatic.net/images/ims-web/77c49853-b80c-4f7a-906d-a32ab7937748.jpg"
];

function HeroBanner() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);


    const nextImage = () => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
    };


    return (
        <Flex flexDirection="column">
            <Flex position="relative" width="75%" height="500px" ml="200px" mt="20px" mb="20px" overflow="hidden">
                <AnimatePresence initial={false} custom={currentImage}>
                    {images.map((imageUrl, index) => (
                        index === currentImage && (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 2 }}
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                            >
                                <Image src={imageUrl} alt={`Image ${index}`} width="100%" height="100%" objectFit="cover" />
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>

                <Box position="absolute" top="50%" left="10px" transform="translateY(-50%)">
                    <IconButton
                        aria-label="Previous Image"
                        icon={<ChevronLeftIcon />}
                        onClick={prevImage}
                    />
                </Box>

                <Box position="absolute" top="50%" right="10px" transform="translateY(-50%)">
                    <IconButton
                        aria-label="Next Image"
                        icon={<ChevronRightIcon />}
                        onClick={nextImage}
                    />
                </Box>
            </Flex>
        </Flex>
    )
}

export default HeroBanner
