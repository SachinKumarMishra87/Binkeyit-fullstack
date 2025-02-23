import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import Loading from "./Loading"
import { useSelector } from 'react-redux'
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

const AddTwoCartButton = ({ data }) => {
    const [loading, setLoading] = useState(false)
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)
    const [isAvailable, setIsAvailable] = useState(false)
    const [qty, setQty] = useState(1);
    const [cartItemDetails, setCartItemDetails] = useState({});

    const handleAddToCart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.addToCart,
                data: {
                    productId: data?._id
                }
            })

            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                if (fetchCartItem) {
                    fetchCartItem()
                }
            }

        } catch (error) {
            // AxiosToastError(error)
            toast.error("Please Login")
        } finally {
            setLoading(false)
        }
    }

    // check item in cart or not
    useEffect(() => {
        const checkingItem = cartItem.some(item => item?.productId?._id === data?._id)
        setIsAvailable(checkingItem)

        const product = cartItem.find(item => item?.productId?._id === data?._id)
        setQty(product?.quantity)
        setCartItemDetails(product)
    }, [data, cartItem])


    const increaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        const response = await updateCartItem(cartItemDetails?._id, qty + 1)
        if (response.success) {
            toast.success("Item added")
        }
    }
    const decreaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (qty === 1) {
            deleteCartItem(cartItemDetails?._id)
        }
        else {
            const response = await updateCartItem(cartItemDetails?._id, qty - 1)
            if (response.success) {
                toast.success("Item removed")
            }
        }
    }

    return (
        <div className='w-full max-w-[110px]'>
            {
                isAvailable ? (
                    <div className=" flex gap-2 ">
                        <button onClick={decreaseQty}
                            className='flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white flex-1 p-1 rounded'>
                            <FaMinus />
                        </button>
                        <p className='flex items-center justify-center w-full flex-1 font-semibold'>{qty}</p>
                        <button onClick={increaseQty}
                            className='flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white flex-1 p-1 rounded'>
                            <FaPlus />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleAddToCart}
                        className='px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded'>
                        {
                            loading ? <Loading /> : "Add"
                        }
                    </button>
                )
            }

        </div>
    )
}

export default AddTwoCartButton