import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "../../../global/config";
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
        </Box>
        <div className="px-3">
          <div className="flex items-center justify-between">
            <Text className="text-[1rem] font-semibold line-clamp-1">{data.name}</Text>
          </div>
          <Text className="mt-2 font-semibold text-[1.1rem] text-[#585858]/80">
          NPR {(data.price - (data.discount / 100) * data.price).toFixed(2)}
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
