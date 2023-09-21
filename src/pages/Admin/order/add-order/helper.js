export class AddOrderHelperClass {
  addOrder = async (data, addOrder, toast, setLoading, setData) => {
    try {
      setLoading(true);
      const res = await addOrder(data);
      setLoading(false);
      if (res) {
        toast({
          title: "Success!",
          description: "Order added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setData({
          customerName: "",
          productName: "",
          quantity: "",
          price: "",
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
      setLoading(false);
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
