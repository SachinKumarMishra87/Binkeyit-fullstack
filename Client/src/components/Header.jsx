import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import { FaUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useMobile from '../hooks/useMobile';
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu';
import { DisplayPriceInRupees } from '../utils/DisplayPriceinRupees';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';

function Header() {
    const [isMobail] = useMobile();
    const location = useLocation();
    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user)
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)

    const { totalPrice, totalQyt } = useGlobalContext()
    const [openCartSection, setOpenCartSection] = useState(false)

    const redirectLoginPage = () => {
        navigate("/login")
    }

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false)
    }

    const handleMobailUser = () => {
        if (!user._id) {
            navigate("/login")
            return
        }
        navigate("/user")
    }

    return (
        <header className='h-24  lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
            {
                !(isSearchPage && isMobail) && (

                    <div className="container mx-auto flex items-center px-2 lg:px-6 justify-between">
                        {/* Logo */}
                        <div className='h-full'>
                            <Link to={"/"} className="h-full flex justify-center items-center">
                                <img
                                    src={logo}
                                    alt="logo"
                                    width={170}
                                    height={60}
                                    className='hidden lg:block'
                                />
                                <img
                                    src={logo}
                                    alt="logo"
                                    width={120}
                                    height={60}
                                    className='lg:hidden'
                                />
                            </Link>
                        </div>

                        {/* Search */}
                        <div className="hidden lg:block">
                            <Search />
                        </div>

                        {/* Login and my cart  */}
                        <div>

                            {/* user icon display in only mobile version */}
                            <button className="lg:hidden text-neutral-600" onClick={handleMobailUser}>
                                <FaUserCircle size={30} />
                            </button>

                            {/* This is only for desktop version */}
                            <div className="hidden lg:flex items-center gap-8">
                                {
                                    user?._id ? (
                                        <div className='relative'>
                                            <div className='flex select-none items-center gap-1 cursor-pointer' onClick={() => setOpenUserMenu(prevState => !prevState)}
                                            >
                                                <p>Account</p>
                                                {
                                                    openUserMenu ? (
                                                        <GoTriangleUp size={25} />
                                                    ) : (
                                                        <GoTriangleDown size={25} />
                                                    )
                                                }
                                            </div>
                                            {
                                                openUserMenu && (
                                                    <div className='absolute right-0 top-14'>
                                                        <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                                            <UserMenu close={handleCloseUserMenu} />
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ) : (
                                        <button onClick={redirectLoginPage} className='text-lg px-2'> Login </button>
                                    )
                                }
                                <button onClick={() => setOpenCartSection(true)} className='flex items-center gap-1 bg-green-800 transition-all hover:bg-green-700 px-3 py-2 rounded text-white'>

                                    {/* add to cart icons */}
                                    <div className="animate-bounce">
                                        <TiShoppingCart size={26} />
                                    </div>

                                    {/* Numbers of items */}
                                    <div className="font-semibold text-sm">
                                        {
                                            cartItem.length > 0 ?
                                                <div className="">
                                                    <p>{totalQyt} Items</p>
                                                    <p>{DisplayPriceInRupees(totalPrice)}</p>
                                                </div> : <div className="font-semibold">
                                                    <p>My Cart</p>
                                                </div>
                                        }
                                    </div>

                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className='container mx-auto px-2 lg:hidden'>
                <Search />
            </div>

            {
                openCartSection && (
                    <DisplayCartItem close={() => setOpenCartSection(false)} />
                )
            }

        </header>
    )
}

export default Header
