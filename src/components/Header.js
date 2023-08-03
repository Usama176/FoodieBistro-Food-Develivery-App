import React, { useState } from'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GiShoppingBag } from "react-icons/gi";
import { MdAdd, MdLogout } from "react-icons/md";
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../firebase.config';
import { useStateValue } from '../context/StateProvider';

import Logo from '../assets/logo.png';
import Avatar from '../assets/avatar.png';

const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user, cartDisplay, cartItems }, dispatch] = useStateValue();
    const [isMenu, setIsMenu] = useState(false);

    // if there is no user, define the login function which handles login
    const login = async () => {
        if(!user) {
            const {user : {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: 'SET_USER',
                user: providerData[0]
            });
            localStorage.setItem('user', JSON.stringify(providerData[0]));
        } else {
            setIsMenu(!isMenu);
        };
    };
    const logout = () => {
        localStorage.clear();
        setIsMenu(false);
        
        dispatch({
            type: 'SET_USER',
            user: null
        });
    };
    const closeMenu = () => {
        setIsMenu(false)
    };

    const displayCart = () => {
        dispatch({
            type: 'SET_CART_DISPLAY',
            cartDisplay: !cartDisplay,
        })
    };

    return(
        <header className='fixed z-50 w-screen p-3 px-8 md:p-6 md:px-16 bg-primary'>
            
            {/* Desktop and Tablet */}
            <div className='hidden md:flex w-full h-full justify-between'>
                <Link to={'/'} className='flex items-center gap-2'>
                    <img src={Logo} className='w-8 object-cover' alt='logo'/>
                    <p className='text-headingColor text-xl font-bold'>FoodieBistro</p>
                </Link>
                <div className='flex gap-8'>
                    <motion.ul
                      initial={{ opacity:0, x:200 }}
                      animate={{ opacity:1, x:0 }}
                      exit={{ opacity:0, x:200 }}
                      className='flex items-center gap-8'
                    >
                        <li className='text-base text-textColor hover:text-headingColor duration-100
                            transition-all ease-in-out cursor-pointer'
                        >
                            Home
                        </li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100
                            transition-all ease-in-out cursor-pointer'
                        >
                            Menu
                        </li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100
                            transition-all ease-in-out cursor-pointer'
                        >
                            About Us
                        </li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100
                            transition-all ease-in-out cursor-pointer'
                        >
                            Services
                        </li>
                    </motion.ul>
                    <div 
                        className='relative flex items-center justify-center'
                        onClick={displayCart}
                    >
                        <GiShoppingBag className='text-2xl text-headingColor cursor-pointer'/>
                        {cartItems && cartItems.length > 0 &&
                            <div className='absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center
                            rounded-full bg-cartNumBg'
                            >
                                <p className='text-xs text-white font-semibold'>
                                    {cartItems.length}
                                </p>
                            </div>
                        }
                    </div>
                    <div className='relative'>
                        <motion.img
                            src={user ? user.photoURL : Avatar} 
                            className='w-10 min-w-[40px] h-10 min-h-[40px] rounded-full shadow-md cursor-pointer' 
                            alt='user-profile'
                            whileTap={ {scale: 0.92} }
                            onClick={login}
                        />
                        {isMenu && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.6}}
                              animate={{ opacity: 1, scale: 1}}
                              exit={{ opacity: 0, scale: 0.6}}
                              className='w-40 bg-gray-50 rounded-lg shadow-xl flex flex-col absolute
                                top-12 right-0'
                            >
                                {user && user.email === "usamaarifsss4@gmail.com" && (
                                    <Link 
                                        to={'/createItem'}
                                        onClick={closeMenu}
                                    >
                                        <p className='px-4 py-2 flex items-center gap-3 hover:bg-slate-100 text-textColor
                                            rounded-lg text-base transition-all duration-100 ease-in-out cursor-pointer'>
                                                New Item <MdAdd/>
                                        </p>
                                    </Link>
                                )}
                                <p
                                  onClick={logout}
                                  className='px-4 py-2 flex items-center gap-3 hover:bg-slate-100 text-textColor
                                    rounded-lg text-base transition-all duration-100 ease-in-out cursor-pointer'>
                                        Logout <MdLogout/>
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
            {/* Mobile */}
            <div className='flex items-center justify-between md:hidden w-full h-full'>
                <div 
                    className='relative flex items-center justify-center'
                    onClick={displayCart}
                >
                    <GiShoppingBag className='text-2xl text-headingColor cursor-pointer'/>
                    {cartItems && cartItems.length > 0 &&
                        <div className='absolute -top-2 -right-3 w-5 h-5 flex items-center justify-center
                        rounded-full bg-cartNumBg'
                        >
                            <p className='text-xs text-white font-semibold'>
                                {cartItems.length}
                            </p>
                        </div>
                    }
                </div>
                <Link to={'/'} className='flex items-center gap-2'>
                    <img src={Logo} className='w-8 object-cover' alt='logo'/>
                    <p className='text-headingColor text-xl font-bold'>Rancher'S</p>
                </Link>
                <div className='relative'>
                    <motion.img
                        src={user ? user.photoURL : Avatar} 
                        className='w-10 min-w-[40px] h-10 min-h-[40px] rounded-full shadow-md cursor-pointer' 
                        alt='user-profile'
                        whileTap={ {scale: 0.92} }
                        onClick={login}
                    />
                    {isMenu && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.6}}
                          animate={{ opacity: 1, scale: 1}}
                          exit={{ opacity: 0, scale: 0.6}}
                          className='w-40 bg-gray-50 rounded-lg shadow-xl flex flex-col absolute
                            top-12 right-0'
                        >
                            {user && user.email === "usamaarifsss4@gmail.com" && (
                                <Link 
                                    to={'/createItem'}
                                    onClick={closeMenu}
                                >
                                    <p className='px-4 py-2 flex items-center gap-3 hover:bg-slate-100
                                     hover:text-headingColor text-textColor rounded-lg text-base transition-all 
                                       duration-100 ease-in-out cursor-pointer'
                                    >
                                            New Item <MdAdd/>
                                    </p>
                                </Link>
                            )}
                            <ul
                                initial={{ opacity:0, x:200 }}
                                animate={{ opacity:1, x:0 }}
                                exit={{ opacity:0, x:200 }}
                                className='flex flex-col justify-center'
                                >
                                    <li 
                                      onClick={closeMenu}
                                      className='px-4 py-2 text-base text-textColor hover:text-headingColor
                                        hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer rounded-lg'
                                    >
                                        Home
                                    </li>
                                    <li
                                      onClick={closeMenu}
                                      className='px-4 py-2 text-base text-textColor hover:text-headingColor
                                        hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer rounded-lg'
                                    >
                                        Menu
                                    </li>
                                    <li
                                      onClick={closeMenu}
                                      className='px-4 py-2 text-base text-textColor hover:text-headingColor
                                        hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer rounded-lg'
                                    >
                                        About Us
                                    </li>
                                    <li
                                      onClick={closeMenu}
                                      className='px-4 py-2 text-base text-textColor hover:text-headingColor
                                        hover:bg-slate-100 duration-100 transition-all ease-in-out cursor-pointer rounded-lg'
                                    >
                                        Services
                                    </li>
                            </ul>
                            <p
                              onClick={logout}
                              className='m-2 p-2 flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 hover:text-headingColor
                               text-textColor rounded-md shadow-md text-base transition-all duration-100 ease-in-out cursor-pointer'>
                                    Logout <MdLogout/>
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </header>        
    );

};

export default Header;