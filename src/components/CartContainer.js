import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';

import EmptyCart from '../assets/emptyCart.svg';
import { useStateValue } from '../context/StateProvider';
import CartItem from './CartItem';

function CartContainer() {
    const [{ cartDisplay, cartItems, user }, dispatch] = useStateValue();
    const [flag, setFlag] = useState(1);
    const [total, setTotal] = useState(0);

    // Firebase authentication setup
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    // Function to toggle cart display
    const displayCart = () => {
        dispatch({
            type: 'SET_CART_DISPLAY',
            cartDisplay: !cartDisplay,
        });
    };

    // Function to clear cart
    const clearCart = () => {
        dispatch({
            type: 'SET_CART_ITEMS',
            cartItems: [],
        });

        localStorage.setItem('cartItems', JSON.stringify([]));
    };

    // Calculate total price
    useEffect(() => {
        let totalPrice = cartItems.reduce(function (acc, item) {
            return acc + item.qty * item.price;
        }, 0);
        setTotal(totalPrice);
    }, [total, flag]);

    // Function to handle user login
    const login = async () => {
        const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
        dispatch({
            type: 'SET_USER',
            user: providerData[0],
        });
        localStorage.setItem('user', JSON.stringify(providerData[0]));
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className='fixed top-0 right-0 bg-white w-full md:w-375 h-screen drop-shadow-md 
                flex flex-col z-[101]'
        >
        <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
            <motion.div
                whileTap={{ scale: 0.75 }}
                onClick={displayCart}
            >
            <MdOutlineKeyboardBackspace className='text-textColor text-3xl' />
            </motion.div>
            <p className='text-textColor text-lg font-semibold'>Cart</p>
            <motion.p
                whileTap={{ scale: 0.75 }}
                className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md 
                    hover:shadow-md cursor-pointer text-textColor font-semibold'
                onClick={clearCart}
            >
                Clear <RiRefreshFill />
            </motion.p>
        </div>
        {/* bottom section */}
        {cartItems && cartItems.length > 0 ? (
            <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
            <div className='w-full h-[45%] px-6 py-10 flex flex-col gap-3 overflow-y-scroll 
                scrollbar-none'
            >
                {/* cart item */}
                {cartItems && cartItems.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        setFlag={setFlag}
                    />
                ))}
            </div>
            {/* cart total section */}
            <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col 
                items-center justify-evenly px-8 py-2'
            >
                <div className='w-full flex items-center justify-between'>
                    <p className='text-gray-400 text-lg'>Sub Total</p>
                    <p className='text-gray-400 text-lg'>$ {total}</p>
                </div>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-gray-400 text-lg'>Delivery Charges</p>
                    <p className='text-gray-400 text-lg'>$ 2.5</p>
                </div>
                <div className='w-full border-b border-gray-600 my-2'></div>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-gray-200 text-xl font-semibold'>Total</p>
                    <p className='text-gray-200 text-xl font-semibold'>
                        $ {total + 2.5}
                    </p>
                </div>
                {user ? (
                    <motion.button
                        whileTap={{ scale: 0.8 }}
                        type='button'
                        className='bg-orange-500 w-full p-2 rounded-full text-gray-50 
                            text-lg my-2 hover:shadow-lg'
                    >
                        Check Out
                    </motion.button>
                    ) : (
                        <motion.button
                            whileTap={{ scale: 0.8 }}
                            type='button'
                            className='bg-orange-500 w-full p-2 rounded-full text-gray-50 
                                text-lg my-2 hover:shadow-lg'
                            onClick={login}
                        >
                            Login to Check Out
                        </motion.button>
                    )
                }
            </div>
            </div>
        ) : (
            <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
                <img src={EmptyCart} className='w-300' alt='empty cart' />
                <p className='text-xl text-textColor font-semibold'>
                    Your Cart Is Empty
                </p>
            </div>
        )}
        </motion.div>
    );
}

export default CartContainer;