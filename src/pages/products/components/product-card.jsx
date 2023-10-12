import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material";
import { imageUrl } from "../../../global/config";
import { MdFavorite } from "react-icons/md";
const ProductCard = ({ data }) => {
  const navigate = useNavigate();
  const handleSelectedProduct = (productId) => {
    navigate(`/products/${productId}`);
  };
  return (
    <>
      <Box
        onClick={() => handleSelectedProduct(data.id)}
        borderRadius="lg"
        bg="white"
        cursor="pointer"
        boxShadow="2xl"
        position="relative"
        transition="transform 0.2s ease-in-out"
        _hover={{ transform: "scale(1.05)" }}
        className="pb-3"
      >
        <Box height="250px" overflow="hidden" position="relative" mb={3}>
          <Image
            src={`${imageUrl}/${data.image}`}
            width="100%"
            height="250px"
            objectFit="center"
            borderTopRadius="lg"
          />
          <Box
            position="absolute"
            top={2}
            right={2}
            bg="white"
            p={1}
            borderRadius="10px"
            color="teal"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/protect/cart");
            }}
          >
            <ShoppingCart />
          </Box>
        </Box>
        <div className="px-3">
          <div className="flex items-center justify-between">
            <Text className="text-[1.3rem] font-semibold">Nike Air</Text>
            <MdFavorite
              className="text-[1.3rem] hover:text-rose-500"
              title="favorite"
            />
          </div>
          <Text className="mt-2 font-semibold text-[1.1rem] text-[#585858]/80">
            {data.price - (data.discount / 100) * data.price} NPR
          </Text>
          {data.discount > 0 && (
            <div className="font-medium text-[.8rem] flex gap-x-3">
              <span className="line-through text-rose-400">
                {data.price} NPR
              </span>
              <span className="text-green-400">{data.discount}% off</span>
            </div>
          )}
        </div>
      </Box>
    </>
  );
};

export default ProductCard;
