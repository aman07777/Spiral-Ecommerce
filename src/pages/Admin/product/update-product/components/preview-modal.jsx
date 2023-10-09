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
const PreviewModal = ({
  isPreviewModalOpen,
  handlePreviewModalClose,
  handleNextClick,
  product,
  selectedImageIndex,
  handlePrevClick,
}) => {
  return (
    <>
      <Modal
        isOpen={isPreviewModalOpen}
        onClose={handlePreviewModalClose}
        size="xl"
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
                src={product.images[selectedImageIndex]}
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
