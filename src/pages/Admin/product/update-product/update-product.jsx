import React, { useState } from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Dashboard from "../../Dashboard";
import UpdateProductBreadcrumb from "./components/update-product-breadcrumb";
import UpdateProductForm from "./components/update-product-form";
import PreviewModal from "./components/preview-modal";
import { useUpdateProductStore } from "./store";
const UpdateProduct = () => {
  const { id } = useParams();
  // stores
  const getDetails = useUpdateProductStore((state) => state.getProductDetails);
  // states
  const [product, setProduct] = useState({});

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const handlePreviewClick = () => {
    setIsPreviewModalOpen(true);
  };

  const handlePreviewModalClose = () => {
    setIsPreviewModalOpen(false);
    setSelectedImageIndex(0);
  };

  const handlePrevClick = () => {
    setSelectedImageIndex(
      (selectedImageIndex - 1 + product.previewImages?.length) %
        product.previewImages?.length
    );
  };

  const handleNextClick = () => {
    setSelectedImageIndex(
      (selectedImageIndex + 1) % product.previewImages?.length
    );
  };
  const { isFetching, data: productDetails } = useQuery({
    queryKey: ["get", "product", id],
    queryFn: () => getDetails(id),
  });
  !isFetching && setProduct({ ...productDetails });
  return (
    <>
      <Dashboard />
      <UpdateProductBreadcrumb />
      {!isFetching && (
        <UpdateProductForm
          product={product}
          setProduct={setProduct}
          handlePreviewClick={handlePreviewClick}
        />
      )}
      <PreviewModal
        handleNextClick={handleNextClick}
        handlePreviewModalClose={handlePreviewModalClose}
        product={product}
        isPreviewModalOpen={isPreviewModalOpen}
        selectedImageIndex={selectedImageIndex}
        handlePrevClick={handlePrevClick}
      />
    </>
  );
};

export default UpdateProduct;
