import { Box, Icon } from "@chakra-ui/react";
import { Add } from "@mui/icons-material";
import { Link } from "react-router-dom";
const Title = () => {
  return (
    <div className="flex justify-between px-4 mt-3 @[600px]:px-6">
      <p className="font-semibold text-[#585858] text-[1.2rem]">Products</p>
      <Box
        as={Link}
        title="Add new product"
        to="/admin-add-product"
        className="text-[#585858] hover:text-[#0077b5] transition-[color] relative before:absolute before:content-[''] before:w-0 before:h-[2px] before:-bottom-[.1rem] before:bg-[#0077b5] before:transition-[1s] hover:before:w-full duration-200 border hover:border-transparent p-1 rounded-sm before:left-0 @[600px]:px-3"
      >
        <Icon as={Add} />
      </Box>
    </div>
  );
};

export default Title;
