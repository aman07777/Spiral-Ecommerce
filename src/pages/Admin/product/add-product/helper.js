export class AddProductClass {
  addProduct = async (data, addProduct, toast, setLoading, setProduct) => {
    try {
      setLoading(true);
      const res = await addProduct(data);
      setLoading(false);
      if (res) {
        toast({
          title: "Success!",
          description: "Product added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setProduct({
          name: "",
          description: "",
          price: "",
          category: "",
          brand: "",
          colors: [],
          sizes: [],
          images: [],
          previewImages: [],
        });
        return;
      }
      toast({
        title: "Error!",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
}
