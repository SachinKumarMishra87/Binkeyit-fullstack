import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { validURLConverter } from '../utils/validURLConverter'


const CategoryWiseProductDisplay = ({ id, name }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const containerRef = useRef()
    const subcCategoryData = useSelector(state => state.product.allSubCategory)
    const loadingCardNumber = new Array(7).fill(null)

    const fetchCategoryWiseProduct = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getProductByCategories,
                data: {
                    id: id
                }
            })

            const { data: responseData } = response;
            if (responseData.success) {
                setData(responseData.data)
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryWiseProduct();
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 300
    }
    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 300
    }

    const handleRedirectProductListPage = () => {
        const subCategory = subcCategoryData.find(sub => {
            const filterData = sub.category.some(c => {
                return c._id == id
            })

            return filterData ? true : null
        })

        const url = `/${validURLConverter(name)}-${id}/${validURLConverter(subCategory?.name)}-${subCategory?._id}`
        return url
    }

    const redirectUrl = handleRedirectProductListPage();
    return (
        <div className="px-4">
            <div className="container mx-auto p-4 flex items-center justify-between gap-4">
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                <Link to={redirectUrl} className='text-green-600 hover:text-green-400'>See All</Link>
            </div>
            <div className="relative flex items-center">
                <div className="flex gap-4 md:gap-6 lg:gap-8 mx-auto px-6 overflow-x-scroll scrollbar-none scroll-smooth" ref={containerRef}>
                    {
                        loading &&
                        loadingCardNumber.map((_, index) => {
                            return (
                                <CardLoading key={index} />
                            )
                        })
                    }

                    {
                        data.map((p, index) => {
                            return (
                                <CardProduct data={p} key={p?._id || index} />
                            )
                        })
                    }

                </div>
                <div className="w-full left-0 right-0 container mx-auto px-2 absolute hidden lg:flex justify-between ">
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white hover:bg-gray-200 shadow-gray-400 shadow-sm  text-lg p-2 rounded-full'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleScrollRight} className='z-10 relative bg-white hover:bg-gray-200 shadow-gray-400 shadow-sm text-lg p-2 rounded-full'>
                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay