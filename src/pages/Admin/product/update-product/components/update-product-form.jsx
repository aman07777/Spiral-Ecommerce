import React, { useState } from "react";
import {
  Flex,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Image,
  IconButton,
  useToast,
} from "@chakra-ui/react";

import { ArrowForward } from "@mui/icons-material";
import { imageUrl } from "../../../../../global/config";
import { useUpdateProductStore } from "../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleToast } from "../../../../../global/toast";

const UpdateProductForm = ({ setIsPreviewModalOpen, product, setProduct }) => {
  const toast = useToast();
  const client = useQueryClient();
  // stores
  const updateProduct = useUpdateProductStore((state) => state.updateProduct);
  const getDetails = useUpdateProductStore((state) => state.getProductDetails);
  //states
  const [images, setImages] = useState([]);
  const handleSizeChange = (event) => {
    const { value } = event.target;
    const sizes = value.split(",");
    setProduct({ ...product, sizes });
  };
  const handleImageChangeMultiple = (event) => {
    const files = event.target.files;
    const images = [];
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      if (file && /\.(jpe?g|png)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          images.push(event.target.result);
          if (images?.length === files?.length) {
            setProduct({
              ...product,
              previewImages: [...product.previewImages, ...images],
            });
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const { mutateAsync, isLoading } = useMutation({
    mutationFn: updateProduct,
    mutationKey: ["update", "product", product?._id],
    onSuccess: (data) => {
      if (data) {
        client.invalidateQueries(["get", "products"], { exact: true });
        getDetails();
        handleToast(
          toast,
          "Success",
          "Product updated successfully",
          "success"
        );
      }
    },
    onError: (error) => {
      handleToast(toast, "Error", error.message, "error");
    },
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("brand", product.brand);
    for (let i = 0; i < product.colors?.length; i++) {
      formData.append("colors", product.colors[i]);
    }
    product?.sizes.forEach((size) => {
      formData.append("sizes", size);
    });
    for (let i = 0; i < images?.length; i++) {
      formData.append("productImage", images[i]);
    }

    mutateAsync({ data: formData, id: product?._id });
  };
  return (
    <>
      <Flex direction={{ base: "column", md: "row" }} p={4}>
        <Flex direction="column" className="max-w-[550px] w-full">
          <Box
            borderWidth="1px"
            borderRadius="lg"
            mb={4}
            mt={0}
            padding={{ base: 2, md: 4 }}
            className="w-full"
          >
            <Box p="6" mt={0}>
              <form
                onSubmit={handleSubmit}
                className="text-[#585858] grid gap-y-2"
              >
                <FormControl id="name" isRequired mb={2}>
                  <FormLabel>Product Name</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter product name"
                    size="md"
                    value={product.name || ""}
                    onChange={(event) =>
                      setProduct({ ...product, name: event.target.value })
                    }
                    className="rounded-sm focus:outline-transparent active:outline-transparent"
                  />
                </FormControl>

                <Flex direction="row">
                  <FormControl id="price" mr={2} isRequired>
                    <FormLabel>Product Price</FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter product price"
                      size="md"
                      value={product.price || ""}
                      onChange={(event) =>
                        setProduct({ ...product, price: event.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl id="category" ml={2} isRequired>
                    <FormLabel>Product Category</FormLabel>
                    <Select
                      placeholder="Select category"
                      size="md"
                      value={product.category || ""}
                      onChange={(event) =>
                        setProduct({ ...product, category: event.target.value })
                      }
                    >
                      <option value="clothing">Clothing</option>
                      <option value="electronics">Electronics</option>
                      <option value="home">Home</option>
                    </Select>
                  </FormControl>
                </Flex>
                <FormControl id="brand" mt={2} isRequired>
                  <FormLabel>Product Brand</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter product brand"
                    size="md"
                    value={product.brand || ""}
                    onChange={(event) =>
                      setProduct({ ...product, brand: event.target.value })
                    }
                  />
                </FormControl>
                <FormControl id="brand" mt={2} isRequired>
                  <FormLabel>Product Color</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter product color (comma-separated)"
                    size="md"
                    value={product.colors || ""}
                    onChange={(event) => {
                      setProduct({
                        ...product,
                        colors: event.target.value?.split(","),
                      });
                    }}
                  />
                </FormControl>
                <FormControl id="sizes" mt={2} isRequired>
                  <FormLabel>Product Sizes</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter product sizes (comma-separated)"
                    size="md"
                    value={product.sizes || ""}
                    onChange={handleSizeChange}
                  />
                </FormControl>
                <FormControl id="description" isRequired mb={2}>
                  <FormLabel>Product Description</FormLabel>
                  <Textarea
                    placeholder="Enter product description"
                    size="md"
                    value={product.description || ""}
                    onChange={(event) =>
                      setProduct({
                        ...product,
                        description: event.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl id="image" mt={2}>
                  <FormLabel>Product Image</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      e.preventDefault();
                      handleImageChangeMultiple(e);
                      setImages(e.target.files);
                    }}
                    multiple
                    size="md"
                  />
                </FormControl>
                {(product.images?.length > 0 ||
                  product.previewImages?.length > 0) && (
                  <Flex direction="row" alignItems="center" mt={2}>
                    <Image
                      src={
                        product.previewImages?.length > 0
                          ? product.previewImages?.[0]
                          : `${imageUrl}/${product.images?.[0]}`
                      }
                      alt={`Product Image 1`}
                      boxSize="50px"
                      objectFit="cover"
                      mr={2}
                    />
                    <IconButton
                      icon={<ArrowForward />}
                      aria-label="Preview Images"
                      size="md"
                      onClick={() => setIsPreviewModalOpen(true)}
                    />
                  </Flex>
                )}
                <Button type="submit" colorScheme="blue" mt={4} size="md">
                  {isLoading ? "Updating..." : "Update"}
                </Button>
              </form>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default UpdateProductForm;
