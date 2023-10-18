import React, { useState } from "react";

import { Box, Image, Flex } from "@chakra-ui/react";
import ImageMagnifier from "../../../image-magnifier";
import { imageUrl } from "../../../../global/config";
const ImageSection = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0]);
  return (
    <>
      <Box
        flexDirection={{ base: "column", md: "row" }}
        className="flex flex-1"
      >
        <Box
          display="flex"
          flexDirection="column"
          mb={{ base: "2rem", md: 0 }}
          className="w-full"
        >
          {/* image magnifier section starts */}
          <ImageMagnifier image={selectedImage} />
          {/* image magnifier section ends */}
          {/* more image section start*/}
          <Box flex="1">
            <Flex gap={2} pt="1rem">
              {images.map((image, index) => (
                <Image
                  key={index}
                  src={`${imageUrl}/${image}`}
                  boxSize={{ base: "50px", md: "50px" }}
                  objectFit="cover"
                  mb={2}
                  borderRadius=".3rem"
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </Flex>
          </Box>
          {/* more image section end */}
        </Box>
      </Box>
    </>
  );
};

export default ImageSection;
