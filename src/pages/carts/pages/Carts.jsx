import React, { useState, useEffect } from 'react'
import { useUserContext } from "../../../contexts/UserContext";
import { Button, Checkbox, Input, Spinner, useToast } from '@chakra-ui/react';
import { cartStore } from '../../../services/CartStore';
import { imageUrl } from '../../../global/config';
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from 'react-router-dom';
import { useOrderStore } from '../../products/product-details/store';


const Carts = () => {
    //toast
    const toast = useToast();

    const { currentUser } = useUserContext();

    // states 
    const [cartItems, setCartItems] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [promo, setPromo] = useState([]);
    const deleteCart = cartStore((state) => state.removeCart);
    const getAllCarts = cartStore((state) => state.getAllCarts);
    const getPromoCodes = useOrderStore((state) => state.getPromoCodes);

    // get promo codes
    useEffect(() => {
        getPromoCodes().then((data) => {
            setPromo(data)
        })
    }, [getPromoCodes])


    //   get all carts 
    useEffect(() => {
        getAllCarts()
            .then((data) => {
                if (data.length === 0) {
                    toast({
                        title: "Cart is empty",
                        description: "Please add some products to cart.",
                        status: "warning",
                        duration: 3000,
                        isClosable: true,
                    });
                }
                setCartItems(data);
                setIsLoading(false);
            })
            .catch((error) => {
                const errorMessage =
                    error.response?.data?.message || "An error occurred.";
                toast({
                    title: "Error",
                    description: errorMessage,
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });
    }, [currentUser, toast]);

    //handle select item --> check box
    const handleSelectItem = (event, index) => {
        const newCartItems = [...cartItems];
        newCartItems[index].isChecked = event.target.checked;
        setCartItems(newCartItems);
        setSelectAll(newCartItems.every((item) => item.isChecked));
    };

    // handle select all --> check box 
    const handleSelectAll = (event) => {
        const newCartItems = cartItems.map((item) => ({
            ...item,
            isChecked: event.target.checked,
        }));
        setCartItems(newCartItems);
        setSelectAll(event.target.checked);
    };

    // quantity change 
    const handleQuantityChange = (event, index) => {
        const newCartItems = [...cartItems];
        let newQuantity = parseInt(event.target.value);

        if (newQuantity > newCartItems[index].availableQuantity) {
            newQuantity = newCartItems[index].availableQuantity;
        } else if (newQuantity < 1) {
            newQuantity = 1;
        }

        newCartItems[index].selectedQuantity = newQuantity;
        setCartItems(newCartItems);
    };

    const handleCheckout = () => {
        // ...
    };

    const handleDeleteAll = () => {
        const newCartItems = cartItems.filter((item) => !item.isChecked);
        setCartItems(newCartItems);
        setSelectAll(false);
    };


    const subtotal = cartItems?.reduce(
        (total, item) =>
            total + (item.isChecked ? item.price * item.selectedQuantity : 0),
        0
    );
    const discountAmount = cartItems?.reduce(
        (total, item) => total + (item.isChecked ? item.discount : 0), 0
    )
    const discount = (subtotal / 100) * discountAmount;
    const shippingCharge = 150
    const grandTotal = (subtotal - discount) + shippingCharge;

    const handleRemoveCartItem = async (productId) => {
        try {
            await deleteCart(productId);
            toast({
                title: "Product removed",
                description: "Product removed from cart successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });

            getAllCarts().then((data) => {
                setCartItems(data);
            });
        } catch (error) {
            const errorMessage =
                error.response?.data?.message || "An error occurred.";
            toast({
                title: "Error",
                description: errorMessage,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            {
                !isLoading ? (
                    <div className="w-[100%] flex flex-col-reverse xl:flex-row mt-5 gap-y-3 gap-x-3">
                        {/* table  */}
                        <div className="w-[100%] xl:w-[70%] flex flex-col border-[1px] shadow text[#585858] max-[851px]:h-[50em] h-[30em] overflow-y-scroll">
                            <div className='min-[851px]:hidden py-3 flex flex-col w-[95%] ml-3'>
                                <span className=''>Cart Items</span>
                                <div className='flex items-center gap-x-3'>
                                    <span>Select All: </span>
                                    <Checkbox
                                        isChecked={selectAll}
                                        onChange={handleSelectAll}
                                        borderRadius="full"
                                    />
                                </div>
                            </div>
                            <div>
                                {selectAll ? (
                                    <Button
                                        colorScheme="red"
                                        size="sm"
                                        onClick={handleDeleteAll}
                                        borderRadius="0.5rem"
                                        m={5}
                                    >
                                        DeleteAll
                                    </Button>
                                ) : null}
                            </div>
                            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full text-left text-sm font-light max-[850px]:hidden ">
                                            <thead className="border-b font-medium dark:border-neutral-500 max-[850px]:hidden">
                                                <tr className='w-[100%]'>
                                                    <th scope="col" className="px-6 py-4 w-[5%]">
                                                        <Checkbox
                                                            isChecked={selectAll}
                                                            onChange={handleSelectAll}
                                                            borderRadius="full"
                                                        />

                                                    </th>
                                                    <th scope="col" className="px-6 py-4 w-[45%] ">Product</th>
                                                    <th scope="col" className="px-6 py-4 w-[30%]">Quantity</th>
                                                    <th scope="col" className="px-6 py-4 w-[10%]">Price</th>
                                                    <th scope="col" className="px-6 py-4 w-[10%]">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Array.isArray(cartItems) && cartItems?.map((product, index) => (
                                                        <React.Fragment key={index}>
                                                            <tr className="border-b dark:border-neutral-500 max-[850px]:hidden" key={product.id}>
                                                                <td className="whitespace-nowrap px-6 py-4 font-medium w-[5%]">
                                                                    <Checkbox
                                                                        isChecked={product?.isChecked}
                                                                        onChange={(event) =>
                                                                            handleSelectItem(event, index)
                                                                        }
                                                                    />
                                                                </td>

                                                                <td className="whitespace-nowrap px-6 py-4 font-medium w-[45%]">
                                                                    <div className='flex w-[100%]'>
                                                                        <div className='w-[20%]'>
                                                                            <img src={`${imageUrl}/${product.image}`} alt={product?.name} className='h-[3rem] w-[3rem] ' />
                                                                        </div>
                                                                        <Link
                                                                            to={`/products/${product?.id}`}
                                                                            state={{
                                                                                product: {
                                                                                    color: product.color,
                                                                                    size: product.size,
                                                                                    sQuantity: product.selectedQuantity,
                                                                                },
                                                                            }}
                                                                            className='flex flex-col gap-y-2 w-[80%]'
                                                                        >
                                                                            <div className=''>
                                                                                <span className="text-xs font-bold line-clamp-2">
                                                                                    {product.name}
                                                                                </span>
                                                                                <span className="flex text-xs gap-x-1">
                                                                                    {" "}
                                                                                    <span className="font-semibold">
                                                                                        Size:
                                                                                    </span>{" "}
                                                                                    {product.size}
                                                                                </span>
                                                                                <span className="flex text-xs gap-x-1 ">
                                                                                    <span className="font-semibold">
                                                                                        Color:
                                                                                    </span>
                                                                                    {product.color ? product.color : "Yellow"}
                                                                                </span>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                </td>

                                                                <td className="whitespace-nowrap px-6 py-4 w-[30%]">
                                                                    {/* //button  */}
                                                                    <div>
                                                                        <Button
                                                                            size="sm"
                                                                            onClick={() => {
                                                                                if (product.selectedQuantity > 0) {
                                                                                    handleQuantityChange(
                                                                                        {
                                                                                            target: {
                                                                                                value: product.selectedQuantity - 1,
                                                                                            },
                                                                                        },
                                                                                        index
                                                                                    );
                                                                                }
                                                                            }}
                                                                        >
                                                                            -
                                                                        </Button>
                                                                        <Input
                                                                            type="number"
                                                                            value={product.selectedQuantity}
                                                                            onChange={(event) =>
                                                                                handleQuantityChange(event, index)
                                                                            }
                                                                            min={1}
                                                                            max={product.availableQuantity}
                                                                            size="sm"
                                                                            w={["50px", "50px", "70px"]}
                                                                            mx={2}
                                                                            borderRadius="0.5rem"
                                                                            border="1px solid black"
                                                                            color="black"
                                                                            bg="white"
                                                                            readOnly
                                                                        />
                                                                        <Button
                                                                            size="sm"
                                                                            onClick={() => {
                                                                                if (product.selectedQuantity < product.availableQuantity) {
                                                                                    handleQuantityChange(
                                                                                        {
                                                                                            target: {
                                                                                                value: product.selectedQuantity + 1,
                                                                                            },
                                                                                        },
                                                                                        index
                                                                                    );
                                                                                }
                                                                            }}
                                                                        >
                                                                            +
                                                                        </Button>
                                                                    </div>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4 w-[10%]">
                                                                    <span className="font-serif text-sm">
                                                                        Rs. {product?.selectedQuantity * product.price}
                                                                    </span>
                                                                </td>
                                                                <td className="whitespace-nowrap px-6 py-4 w-[10%]">
                                                                    <div className='cursor-pointer' onClick={() => handleRemoveCartItem(product.id)}>
                                                                        <DeleteIcon className="text-red-600" />
                                                                    </div>
                                                                </td>
                                                            </tr>


                                                        </React.Fragment>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                        {
                                            Array.isArray(cartItems) && cartItems?.map((product, index) => (
                                                <React.Fragment key={index}>
                                                    {/* // for mobile devices */}
                                                    <div className='min-[851px]:hidden flex-col mb-4 p-2 gap-y-5 flex w-[95%] border-b-[2px] border-gray-200 pb-5'>
                                                        <div className='flex justify-between items-center'>
                                                            <Checkbox
                                                                isChecked={product?.isChecked}
                                                                onChange={(event) =>
                                                                    handleSelectItem(event, index)
                                                                }
                                                            />
                                                            <div className='cursor-pointer' onClick={() => handleRemoveCartItem(product.id)}>
                                                                <DeleteIcon className="text-red-600" />
                                                            </div>
                                                        </div>

                                                        <div className='flex w-[100%]'>
                                                            <div className='w-[40%]'>
                                                                <img src={`${imageUrl}/${product.image}`} alt={product?.name} className='w-[8rem] h-[8rem]' />
                                                            </div>
                                                            <Link
                                                                to={`/products/${product?.id}`}
                                                                state={{
                                                                    product: {
                                                                        color: product.color,
                                                                        size: product.size,
                                                                    },
                                                                }}
                                                                className='w-[60%] flex flex-col gap-y-2 overflow-x-hidden'
                                                            >
                                                                <div className=''>
                                                                    <span className="text-xs font-bold line-clamp-2">
                                                                        {product.name}
                                                                    </span>
                                                                    <span className="text-xs line-clamp-2">
                                                                        Rs. {product?.selectedQuantity * product.price}
                                                                    </span>
                                                                    <span className="flex text-xs gap-x-1">
                                                                        {" "}
                                                                        <span className="font-semibold">
                                                                            Size:
                                                                        </span>{" "}
                                                                        {product.size}
                                                                    </span>
                                                                    <span className="flex text-xs gap-x-1 ">
                                                                        <span className="font-semibold">
                                                                            Color:
                                                                        </span>
                                                                        {product.color ? product.color : "Yellow"}
                                                                    </span>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        {/* button  */}
                                                        <div className='w-[95%] flex mt-2 items-center justify-center'>
                                                            <Button
                                                                size="sm"
                                                                onClick={() => {
                                                                    if (product.selectedQuantity > 0) {
                                                                        handleQuantityChange(
                                                                            {
                                                                                target: {
                                                                                    value: product.selectedQuantity - 1,
                                                                                },
                                                                            },
                                                                            index
                                                                        );
                                                                    }
                                                                }}
                                                            >
                                                                -
                                                            </Button>
                                                            <Input
                                                                type="number"
                                                                value={product.selectedQuantity}
                                                                onChange={(event) =>
                                                                    handleQuantityChange(event, index)
                                                                }
                                                                min={1}
                                                                max={10}
                                                                size="sm"
                                                                w="50px"
                                                                mx={2}
                                                                borderRadius="0.5rem"
                                                                border="1px solid black"
                                                                color="black"
                                                                bg="white"
                                                                readOnly
                                                            />
                                                            <Button
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleQuantityChange(
                                                                        {
                                                                            target: {
                                                                                value: product.selectedQuantity + 1,
                                                                            },
                                                                        },
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* cart summary  */}
                        <div className="w-[100%] xl:w-[30%] @[750px]:w-[20em] @[1000px]:w-[25em] px-4 pt-2 border rounded-sm border-l-[4px] shadow pb-5 h-fit">
                            <h3 className="font-semibold text-[#585858]">Available Promo Codes</h3>
                            <div className="my-3">
                                <select
                                    name=""
                                    id=""
                                    className="w-full py-[.4em] border outline-transparent pl-2 focus:border"
                                >
                                    <option value="">Select Promo Code</option>
                                    {Array.isArray(promo) &&
                                        promo.map(
                                            (code) =>
                                                code.status === "active" && (
                                                    <option value={code._id}>{code.promoCode}</option>
                                                )
                                        )}
                                </select>
                            </div>
                            <p className="h-[2px] bg-gray-300 my-3" />
                            <h3 className="font-semibold text-[#585858]">Order Summary</h3>
                            <div className="flex justify-between w-full pr-4 mt-2">
                                <div className="flex gap-y-[.2rem] flex-col">
                                    <p>Subtotal:</p>
                                    <p>Discount:</p>
                                    <p>Shipping Fee:</p>
                                    <p>Total:</p>
                                </div>
                                <div className="flex gap-y-[.2rem] flex-col items-end">
                                    <p>Rs.{subtotal.toFixed(2)}</p>
                                    <p>Rs.{discount.toFixed(2)}</p>
                                    <p>Rs.{shippingCharge.toFixed(2)}</p>
                                    <p>Rs.{grandTotal.toFixed(2)}</p>
                                </div>
                            </div>
                            <button
                                className="w-full py-2 mt-5 capitalize bg-[teal] border border-[teal] text-white hover:bg-[teal]/80 hover:border-[teal]/80 rounded-sm"
                            // onClick={() => handlePlaceOrderClick()}
                            >
                                Checkout Now
                                {/* {isLoading ? "Ordering..." : "place order"} */}
                            </button>
                        </div>


                    </div >
                ) : (
                    <Spinner />
                )
            }
        </>
    )
}

export default Carts