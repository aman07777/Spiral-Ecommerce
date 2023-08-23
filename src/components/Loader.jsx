import { Flex, Spinner } from "@chakra-ui/react";
function Loader({ height = "50vh" }) {
  return (
    <Flex justifyContent="center" alignItems="center" height={height}>
      <Spinner size="xl" />
    </Flex>
  );
}

export default Loader;
