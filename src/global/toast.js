export const handleToast = (toast, title, description, status) => {
  toast({
    title: title,
    description: description,
    status: status,
    duration: 5000,
    isClosable: true,
  });
};
