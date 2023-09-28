import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsCartPlusFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
const ProductCard = () => {
  const navigate = useNavigate();
  const handleSelectedProduct = (productId) => {
    navigate(`/products/${productId}`);
  };
  return (
    <>
      <Box
        // onClick={() => handleSelectedProduct(data.id)}
        borderRadius="lg"
        bg="white"
        cursor="pointer"
        position="relative"
        className="pb-3 border shadow-sm hover:shadow-lg transition duration-300 ease-in-out hover:translate-y-1"
      >
        <Box height="250px" overflow="hidden" position="relative" mb={3}>
          <Image
            src={`https://images.meesho.com/images/products/119544768/7pyu4_512.jpg`}
            // src={`${imageUrl}/${data.image}`}
            width="100%"
            height="250px"
            objectFit="center"
            borderTopRadius="lg"
          />
          <Box
            position="absolute"
            top={2}
            right={2}
            p={1}
            borderRadius="10px"
            color="#0077B5"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/protect/cart");
            }}
          >
            <BsCartPlusFill title="add to cart" className="text-[1.3rem]" />
          </Box>
        </Box>
        <div className="px-3">
          <div className="flex justify-between items-center">
            <Text className="text-[1.3rem] font-semibold">Nike Air</Text>
            <MdFavorite
              className="text-[1.3rem] hover:text-rose-500"
              title="favorite"
            />
          </div>
          {/* <Text className="text-[1.3rem] font-semibold">{data.name}</Text> */}
          <Text className="mt-2 font-semibold text-[1.1rem] text-[#585858]/80">
            {/* {data.price - (data.discount / 100) * data.price} NPR */}
            NPR 6599
          </Text>
          {true > 0 && (
            <div className="font-medium text-[.8rem] flex gap-x-3">
              <span className="line-through text-rose-400">
                {/* {data.price} NPR */}
                6500 NPR
              </span>
              <span className="text-green-400">10% off</span>
              {/* <span className="text-green-400">{data.discount}% off</span> */}
            </div>
          )}
        </div>
      </Box>
    </>
  );
};

export default ProductCard;
