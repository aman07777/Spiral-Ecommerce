import { Box, Container, Heading, Text, Link } from "@chakra-ui/react";

const ErrorPage = () => {
  return (
    <Box padding="40px 0" background="#fff" fontFamily="'Arvo', serif">
      <Container maxWidth="container.xl">
        <Box
          display={{ md: "flex" }}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            marginTop={{ base: "50px" }}
            backgroundImage="url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)"
            height={{ base: "200px", md: "800px" }}
            backgroundPosition="center"
            backgroundSize="cover"
            width={{ base: "100%", md: "50%" }}
          />
          <Box
            className="contant_box_404"
            marginTop={{ base: "5px", md: "-50px" }}
            marginLeft={{ md: "50px" }}
            textAlign={{ base: "center", md: "left" }}
            maxWidth={{ base: "100%", md: "50%" }}
          >
            <Heading as="h3" fontSize={{ base: "30px", md: "50px" }}>
              Look like you're lost
            </Heading>

            <Text fontSize={{ base: "20px", md: "xl" }} marginBottom="20px">
              The page you are looking for is not available!
            </Text>

            <Link
              href="/"
              className="link_404"
              color="#fff !important"
              padding="10px 20px"
              background="#39ac31"
              display="inline-block"
            >
              Go to Home
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ErrorPage;
