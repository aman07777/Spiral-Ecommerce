import React, { useState } from "react";

import { useParams } from "react-router-dom";
import Dashboard from "../../Dashboard";
import UpdateProductBreadcrumb from "./components/update-product-breadcrumb";
import UpdateProductForm from "./components/update-product-form";
import PreviewModal from "./components/preview-modal";
import { useUpdateProductStore } from "./store";
import { useEffect } from "react";
const UpdateProduct = () => {
  const { id } = useParams();
  // stores
  const getDetails = useUpdateProductStore((state) => state.getProductDetails);
  const productDetails = useUpdateProductStore((state) => state.productDetails);

  // states
  const [product, setProduct] = useState({});

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  useEffect(() => {
    getDetails(id);
  }, [getDetails, id]);
  useEffect(() => {
    setProduct({
      ...productDetails,
      previewImages: [],
    });
  }, [productDetails]);
  return (
    <>
      <Dashboard />
      <UpdateProductBreadcrumb />
      {Object.keys(product).length > 0 && (
        <UpdateProductForm
          product={product}
          setProduct={setProduct}
          setIsPreviewModalOpen={setIsPreviewModalOpen}
        />
      )}
      {Object.keys(product || {}).length > 0 && (
        <PreviewModal
          product={product}
          isPreviewModalOpen={isPreviewModalOpen}
          selectedImageIndex={selectedImageIndex}
          setIsPreviewModalOpen={setIsPreviewModalOpen}
          setSelectedImageIndex={setSelectedImageIndex}
        />
      )}
    </>
  );
};

export default UpdateProduct;
