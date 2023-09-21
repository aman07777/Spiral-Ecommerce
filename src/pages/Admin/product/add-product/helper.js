export class AddProductClass {
  addProduct = async (data, addProduct, toast, setLoading, setProduct) => {
    console.log(
      "🚀 ~ file: helper.js:3 ~ AddProductClass ~ addProduct= ~ data:",
      data
    );
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
