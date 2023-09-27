import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { Add } from "@mui/icons-material";
import { useDisclosure } from "@chakra-ui/react";
import AddPromoCodeModal from "./add-promo-code-modal";
const Heading = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="flex justify-between w-full p-4">
        <p className=" text-[1.1rem] font-semibold">Your promo codes</p>
        {/* button -> navigates to add page */}
        <Box
          title="add promo a code"
          to="#"
          onClick={onOpen}
          className="text-[#585858] hover:text-[#0077b5] transition-[color] relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:-bottom-[.1rem] before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 border hover:border-transparent p-1 rounded-sm before:left-0 @[600px]:px-3 @[700px]:px-5 border-[#585858]/60"
        >
          <Icon as={Add} />
        </Box>
        {/* button fin */}
      </div>
      {/* modal for adding a promo code */}
      <AddPromoCodeModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Heading;
