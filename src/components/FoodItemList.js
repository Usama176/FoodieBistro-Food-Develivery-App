import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MdShoppingBasket } from 'react-icons/md';
import NotFound from "../assets/NotFound.svg";
import { useStateValue } from '../context/StateProvider';
import { RiCheckFill } from 'react-icons/ri';

const FoodItemList = ({ flag, data, scrollValue, setScrollValue }) => {
    // Ref for the food-item-list element
    const foodItemListRef = useRef();

    const [{ cartItems }, dispatch] = useStateValue();

    // Animation controls for smooth scrolling
    const controls = useAnimation();

    useEffect(() => {
        // Scroll the row food-item-list when scrollValue changes
        if (scrollValue, setScrollValue) {
            foodItemListRef.current.scrollLeft += scrollValue;

            // Start animation for smooth scrolling effect
            controls.start({
                x: scrollValue, // Animate the x-axis position for smooth scrolling
                transition: { type: 'spring', damping: 25, stiffness: 1000 },
            });

            // Reset the scrollValue to 0 after scrolling and animation
            setScrollValue(0);
        }
    }, [scrollValue, controls]);

    const addToCart = (item) => {
        dispatch({
            type: 'SET_CART_ITEMS',
            cartItems: [...cartItems, item],
        });
    };

    // Update local storage whenever cartItems changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <motion.div
            ref={foodItemListRef}
            className={`w-full flex items-center gap-3  my-12 scroll-smooth 
                ${flag
                    ? "overflow-x-scroll scrollbar-none"
                    : "overflow-x-hidden flex-wrap justify-center"
                }`
            }
            animate={controls}
        >
            {data && data.length > 0 ?
                data.map((item) => (
                    <motion.div
                        key={item.id}
                        className={`w-275 min-w-[275px] md:w-300 md:min-w-[300px]  
                        bg-cardOverlay rounded-lg py-2 px-4 my-12 backdrop-blur-lg 
                        hover:drop-shadow-lg flex flex-col items-center justify-evenly relative
                        ${flag ?  "h-[195px]" : " h-[225px]" }`}
                    >
                        {/* Image and shopping basket icon */}
                        <div className="w-full flex items-center justify-between">
                            <motion.div
                                className="w-40 h-40 -mt-9 drop-shadow-2xl"
                                whileHover={{ scale: 1.2 }}
                            >
                                <img
                                    src={item?.imageURL}
                                    alt=""
                                    className="w-full h-full object-contain"
                                />
                            </motion.div>
                            { cartItems.some((cartItem) => cartItem.id === item.id) ? (
                                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center
                                    justify-center hover:shadow-md"
                                >
                                    <RiCheckFill className="text-white font-bold text-lg" />
                                </div>
                            ) : (
                                <motion.div
                                    whileTap={{ scale: 0.75 }}
                                    className="w-8 h-8 rounded-full bg-red-600 flex items-center
                                        justify-center cursor-pointer hover:shadow-md"
                                    onClick={() => addToCart(item)}
                                >
                                    <MdShoppingBasket className="text-white" />
                                </motion.div>
                            )}
                        </div>
                        {/* Product details */}
                        <div className={`w-full flex flex-col items-end justify-end 
                            ${flag ?  "-mt-4" : 'mt-1' }`}
                        >
                            <p className="text-textColor font-semibold text-base md:text-lg">
                                {item?.title}
                            </p>
                            <p className="mt-1 text-sm text-gray-500">
                                {item?.calories} Calories
                            </p>
                            <p className="text-lg text-headingColor font-semibold">
                                <span className="text-sm text-red-500">$</span>
                                {item?.price}
                            </p>
                        </div>
                    </motion.div>
                )) : (
                    <div className="w-full flex flex-col items-center justify-center">
                      <img src={NotFound} className="h-340" />
                      <p className="text-xl text-headingColor font-semibold my-2">
                        Items Not Available
                      </p>
                    </div>
                )
            }
        </motion.div>
    );
};

export default FoodItemList;