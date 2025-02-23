import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { IoArrowBackCircle } from "react-icons/io5";
import useMobile from '../hooks/useMobile';

function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false)
    const [isMobail] = useMobile();
    const params = useLocation();
    const searchText = params.search.slice(3)

    useEffect(() => {
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    }, [location])


    const redirectToSearch = () => {
        navigate("/search")
    }

    const handleOnChange = (e) => {
        const value = e.target.value
        const url = `/search?q=${value}`
        navigate(url)
    }
    return (
        <div className='w-full min-w-[300px] lg:min-w-[420px] lg:h-12 h-10 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200'>

            <div className="">
                {
                    (isMobail && isSearchPage) ? (

                        <Link to={"/"} className='flex justify-center items-center h-full p-2 group-focus-within:text-slate-600'>
                            <IoArrowBackCircle size={25} />
                        </Link>
                    ) : (
                        <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200'>
                            <IoIosSearch size={22} />
                        </button>
                    )
                }
            </div>

            <div className="w-full h-full">
                {
                    !isSearchPage ? (
                        // not in search page
                        <div onClick={redirectToSearch} className="w-full h-full cursor-pointer flex items-center ">
                            <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'Search "milk"',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'Search "bread"',
                                    1000,
                                    'Search "sugar"',
                                    1000,
                                    'Search "paneer"',
                                    1000,
                                    'Search "chocolate"',
                                    1000,
                                    'Search "curd"',
                                    1000,
                                    'Search "rice"',
                                    1000,
                                    'Search "egg"',
                                    1000,
                                    'Search "chips"',
                                    1000
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </div>
                    ) : (
                        // when i was search page
                        <div className='w-full h-full'>
                            <input
                                type="text"
                                placeholder='Search for atta dal and more.'
                                autoFocus={true}
                                defaultValue={searchText}
                                className='bg-transparent w-full h-full outline-none'
                                onChange={handleOnChange}
                            />
                        </div>

                    )
                }
            </div>

        </div>
    )
}

export default Search
