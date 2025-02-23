import { createContext, useContext, useEffect, useState } from "react"
import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"
import { useDispatch, useSelector } from "react-redux"
import { handleAddItemCart } from "../store/cartProduct"
import AxiosToastError from "../utils/AxiosToastError"
import toast from "react-hot-toast"
import { pricewithdiscount } from "../utils/PriceWithDiscount"
import { handleAddAddress } from "../store/addressSlice"
import { setOrder } from "../store/orderSlice"

export const GlobalContext = createContext(null)

export const useGlobalContext = () => useContext(GlobalContext)

export const GlobalProvider = ({ children }) => {
    const dispatch = useDispatch()
    const [notDiscountTotalPrice, setNotDiscountPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQyt, setTotalQyt] = useState(0)
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state?.user)

    const fetchCartItem = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getCartItem
            })

            const { data: responseData } = response

            if (responseData.success) {
                dispatch(handleAddItemCart(responseData.data))
            }

        } catch (error) {
            console.log(error)
        }
    }

    const updateCartItem = async (_id, qty) => {
        try {
            const response = await Axios({
                ...SummaryApi.updateCartItemQty,
                data: {
                    _id: _id,
                    qty: qty
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                fetchCartItem();
                return responseData
            }

        } catch (error) {
            AxiosToastError(error)
            return error
        }
    }

    const deleteCartItem = async (cardId) => {
        try {

            const response = await Axios({
                ...SummaryApi.deleteCartItem,
                data: {
                    _id: cardId
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                fetchCartItem()
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    useEffect(() => {
        const qty = cartItem.reduce((prev, curr) => {
            return prev + curr.quantity
        }, 0)
        setTotalQyt(qty)

        const toPrice = cartItem.reduce((prev, curr) => {
            return prev + (pricewithdiscount(curr.productId.price, curr.productId.discount) * curr.quantity)
        }, 0)
        setTotalPrice(toPrice)

        const notDiscountPrices = cartItem.reduce((prev, curr) => {
            return prev + (curr.quantity * curr?.productId?.price)
        }, 0)
        setNotDiscountPrice(notDiscountPrices)
    }, [cartItem])

    const handleLogout = () => {
        localStorage.clear()
        dispatch(handleAddItemCart([]))
    }

    const fetchAddress = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getAddress
            })

            const { data: responseData } = response

            if (responseData.success) {
                dispatch(handleAddAddress(responseData.data))
            }

        } catch (error) {
            // AxiosToastError(error)
        }
    }

    const fetchOrder = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getOrderItems
            })

            const { data: responseData } = response

            if (responseData.success) {
                dispatch(setOrder(responseData.data))
            }

        } catch (error) {
            console.log("error from globalProvider fetchOrder", error)
        }
    }

    useEffect(() => {
        fetchCartItem()
        handleLogout()
        fetchAddress()
        fetchOrder()
    }, [user])

    return (
        <GlobalContext.Provider value={{
            fetchCartItem,
            updateCartItem,
            deleteCartItem,
            fetchAddress,
            totalPrice,
            totalQyt,
            notDiscountTotalPrice,
            fetchOrder
        }}>
            {children}
        </GlobalContext.Provider>
    )
}