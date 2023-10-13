import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Box,
  Container,
  useToast,
  Spinner,
  // useMediaQuery,
} from "@chakra-ui/react";

import { getProduct } from "../../../services/ProductServices";

import BreadCrumb from "./components/bread-crumb";
import { handleToast } from "../../../global/toast";
import ImageSection from "./components/image-section";
import DetailsSection from "./components/details-section";

export default function ProductDetails() {
  const { id: productId } = useParams();
  const toast = useToast();

  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProduct(productId)
      .then((result) => {
        if (!result.product) {
          handleToast(
            toast,
            "No products found",
            "Please try again with different keywords.",
            "warning"
          );
        }
        setProduct(result.product);
        setImages(result.product.images);
        setIsLoading(false);
      })
      .catch((error) => {
        handleToast(
          toast,
          "Error",
          error.response?.data?.message || "An error occurred.",
          "error"
        );
      });
  }, [productId, toast]);

  return (
    <>
      {!isLoading ? (
        <div className="flex justify-center w-full">
          <Box width={{ base: "100%", md: "95%", lg: "75%" }}>
            <BreadCrumb />
            <Container
              maxW={"7xl"}
              mt={5}
              mb={10}
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              justifyContent="center"
            >
              <ImageSection images={Array.isArray(images) ? images : []} />
              <DetailsSection product={product} />
            </Container>
          </Box>
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <Spinner />
        </div>
      )}
    </>
  );
}
