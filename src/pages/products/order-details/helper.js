export const getDiscountAmount = (discount, price) => {
  return (discount / 100) * price;
};
export const getTotalPrice = (price, quantity) => {
  return price * quantity;
};
export const getPurchasePrice = (price, quantity, discount) => {
  const total = getTotalPrice(price, quantity);
  return total - getDiscountAmount(discount, total);
};

export const checkShippingInfo = (data) => {
  const { fullName, address, mobileNumber, province } = data;
  return (
    fullName !== "" && address !== "" && mobileNumber !== "" && province !== ""
  );
};
