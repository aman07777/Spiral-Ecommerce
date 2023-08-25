// CartPage.jsx
import React from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import CartPageDesktop from '../components/CartPageDesktop';
import CartPageMobile from '../components/CartPageMobile';

function CartPage() {
  const [isDesktop] = useMediaQuery("(min-width: 768px)");

  return (
    <>
      {isDesktop ? <CartPageDesktop /> : <CartPageMobile />}
    </>
  );
}

export default CartPage;