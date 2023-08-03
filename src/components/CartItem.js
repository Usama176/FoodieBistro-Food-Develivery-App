import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { useStateValue } from '../context/StateProvider';

function CartItem({ item, setFlag }) {
    // Get cartItems and dispatch function from the context
    const [{ cartItems }, dispatch] = useStateValue();

    // State to keep track of the quantity of the item in the cart
    const [quantity, setQuantity] = useState(item.qty);

    // Function to dispatch cartItems to context and update the flag
    const cartDispatch = (updatedItems) => {
        // Save updated items to local storage
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));

        // Dispatch updated cartItems to the context
        dispatch({
        type: 'SET_CART_ITEMS',
        cartItems: updatedItems,
        });

        // Update the flag to trigger a re-render in the parent component
        setFlag((prevFlag) => prevFlag + 1);
    };

    // Function to update the quantity of the item in the cart
    const updateQuantity = (action, id) => {
        if (action === 'add') {
            setQuantity((prevQuantity) => prevQuantity + 1);
        } else {
            if (quantity === 1) {
                // Remove the item from cart if quantity is 1
                const updatedItems = cartItems.filter((cartItem) => cartItem.id !== id);
                cartDispatch(updatedItems);
            } else {
                // Decrease the quantity if it's greater than 1
                setQuantity((prevQuantity) => prevQuantity - 1);
            }
        }
    };

    // Update the cartItems in the context whenever the quantity changes
    useEffect(() => {
        const updatedItems = cartItems.map((cartItem) =>
        cartItem.id === item?.id ? { ...cartItem, qty: quantity } : cartItem
        );
        cartDispatch(updatedItems);
    }, [quantity]);

    return (
        <div className='bg-cartItem w-full p-1 px-2 rounded-lg flex items-center gap-2'>
        <img
            src={item.imageURL}
            className='w-20 h-20 max-w-[60px] rounded-full object-contain'
            alt='icon'
        />
        {/* name section */}
        <div className='flex flex-col gap-2'>
            <p className='text-base text-gray-50'>{item.title}</p>
            <p className='text-sm block text-gray-300 font-semibold'>$ {item.price}</p>
        </div>
        {/* button section */}
        <div className='group flex items-center gap-3 ml-auto cursor-pointer'>
            <motion.div
                whileTap={{ scale: 0.75 }}
                onClick={() => updateQuantity('remove', item?.id)}
            >
                <BiMinus className='text-gray-50 text-xl' />
            </motion.div>
            <p className='p-2 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center'>
                {item.qty}
            </p>
            <motion.div
                whileTap={{ scale: 0.75 }}
                onClick={() => updateQuantity('add', item?.id)}
            >
                <BiPlus className='text-gray-50 text-xl' />
            </motion.div>
        </div>
        </div>
    );
}

export default CartItem;