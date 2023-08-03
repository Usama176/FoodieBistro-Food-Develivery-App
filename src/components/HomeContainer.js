import React from 'react';
import { heroItemsData } from '../utils/data';

import DeliveryIcon from '../assets/delivery.png';
import HeroBg from '../assets/heroBg.png';

const HomeContainer = () => {
 
    return (
        <section 
          id='home'
          className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'
        >
            <div className='py-2 flex-1 flex flex-col items-start justify-center 
                gap-6'
            >
                <div className='flex items-center justify-center gap-2 bg-orange-100
                  px-4 py-1 rounded-full'
                >
                    <p className='text-base text-orange-500 font-semibold'>Bike Delivery</p>
                    <div className='w-8 h-8 rounded-full bg-white overflow-hidden
                      drop-shadow-md'
                    >
                        <img 
                            src={DeliveryIcon} 
                            className='w-full h-full object-contain' 
                            alt='bike icon'
                        />
                    </div>
                </div>
                <p className='text-[2rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor'>
                    The Fastest Food Delivery In 
                    <span className='text-orange-600 text-[2.5rem] lg:text-[5rem]'>Your City</span>
                </p>
                <p className='text-textColor font-light md:font-normal md:w-[80%] text-center md:text-left'>
                    Are you hungry? Did you have a long and stressful day? Interested
                    in getting a cheesy pizza delivered to your office or looking to 
                    avoid the weekly shop? Then FoodieBistro is the right destination
                    for you!
                </p>
                <button
                  type='button'
                  className=' bg-gradient-to-br from-orange-400 to-orange-500 w-full
                    md:w-auto px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out
                    duration-100'
                >
                    Order Now
                </button>
            </div>
            <div className='py-2 flex-1 flex items-center justify-center relative'>
                <img
                    src={HeroBg}
                    className='ml-auto h-420 w-full lg:w-auto lg:h-650'
                    alt='hero-bg'
                />
                <div
                  className='w-full max-w-[420px] h-full absolute top-0 xl:right-20 flex items-center justify-center
                     py-4 gap-3 lg:gap-4 flex-wrap'
                  >
                    {heroItemsData && heroItemsData.map(item => (
                        <div
                          key={item.id}
                          className='lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex
                            flex-col items-center justify-center drop-shadow-lg'
                        >
                            <img 
                                src={item.imageSrc} 
                                className='w-20 lg:w-40 -mt-10 lg:-mt-20'
                                alt='icecream image'
                            />
                            <p className='text-[14px] lg:text-lg font-semibold text-textColor mt-2 lg:mt-4'>
                                { item.name }
                            </p>
                            <p className='text-[10px] font-semibold text-lighttextGray md:my-2'>
                                { item.decp }
                            </p>
                            <p className='text-[14px] font-semibold text-headingColor'>
                                <span className='text-xs text-red-600'>$</span>
                                { item.price }
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

};

export default HomeContainer;