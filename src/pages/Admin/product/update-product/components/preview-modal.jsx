import React from "react";
import {
  Flex,
  Button,
  Image,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { imageUrl } from "../../../../../global/config";
const PreviewModal = ({
  isPreviewModalOpen,
  product,
  selectedImageIndex,
  setIsPreviewModalOpen,
  setSelectedImageIndex,
}) => {
  const handlePreviewModalClose = () => {
    setIsPreviewModalOpen(false);
    setSelectedImageIndex(0);
  };

  const handlePrevClick = () => {
    setSelectedImageIndex((prev) =>
      prev > 0 ? prev - 1 : product.images?.length - 1
    );
  };

  const handleNextClick = () => {
    setSelectedImageIndex((prev) =>
      prev < product.images?.length - 1 ? prev + 1 : 0
    );
  };
  return (
    <>
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={handlePreviewModalClose}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Product Images</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction="row">
              <IconButton
                icon={<ChevronLeft />}
                aria-label="Previous Image"
                size="sm"
                onClick={handlePrevClick}
                mr={2}
              />
              <Image
                src={`${imageUrl}/${product?.images?.[selectedImageIndex]}`}
                alt={`Product Image ${selectedImageIndex + 1}`}
                height="30vh"
                width="30vw"
                className="object-cover"
              />
              <IconButton
                icon={<ChevronRight />}
                aria-label="Next Image"
                size="sm"
                onClick={handleNextClick}
                ml={2}
              />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              size="sm"
              onClick={handlePreviewModalClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewModal;
