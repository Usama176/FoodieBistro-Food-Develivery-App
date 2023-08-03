import React, { useState } from 'react';
import { useStateValue } from "../context/StateProvider";
import { motion } from 'framer-motion';
import { useMediaQuery } from '@react-hook/media-query';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import HomeContainer from './HomeContainer';
import FoodItemList from './FoodItemList';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';

const MainContainer = () => {

    const [{ foodItems, cartDisplay }] = useStateValue();

    // Check the screen size using the useMediaQuery hook
    const isLargeScreen = useMediaQuery('(min-width: 1250px)');
    const scrollValueLarge = 1000;
    const scrollValueMedium = 700;

    const [scrollValue, setScrollValue] = useState(0);

    return (
        <div className='w-full h-auto flex flex-col items-center justify-center'>
            <HomeContainer/>
            <section className='w-full'>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-2xl font-semibold capitalize text-headingColor relative
                        before:absolute before:rounded-lg before:bg-gradient-to-tr from-orange-400 to-orange-600
                        before:w-32 before:h-1 before:-bottom-2 before:left-0 transition-all ease-in-out
                        duration-100'
                    >
                        Our fresh & healthy fruits
                    </p>
                    <div className='hidden md:flex gap-3 items-center'>
                        <motion.div
                            whileTap={{ scale: 0.75 }}
                            onClick={() => setScrollValue(isLargeScreen ? -scrollValueLarge : -scrollValueMedium)}
                            className='w-8 h-8 rounded-lg bg-orange-300 flex items-center justify-center
                                hover:bg-orange-500 cursor-pointer hover:shadow-lg'
                        >
                            <MdChevronLeft className='text-lg text-white'/>
                        </motion.div>
                        <motion.div
                            whileTap={{ scale: 0.75 }}
                            onClick={() => setScrollValue(isLargeScreen ? scrollValueLarge : scrollValueMedium)}
                            className='w-8 h-8 rounded-lg bg-orange-300 flex items-center justify-center
                                hover:bg-orange-500 cursor-pointer hover:shadow-lg'
                        >
                            <MdChevronRight className='text-lg text-white'/>
                        </motion.div>
                    </div>
                </div>
                <FoodItemList
                    flag={true}
                    data={foodItems?.filter((e) => e.category === 'fruits')}
                    scrollValue={scrollValue}
                    setScrollValue={setScrollValue}
                />
                <MenuContainer />
                {cartDisplay && (
                    <CartContainer />
                )}
            </section>
        </div>
    );
};

export default MainContainer;