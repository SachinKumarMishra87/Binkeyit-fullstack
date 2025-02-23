import React from 'react'
import { Link } from "react-router-dom"
import { FaCaretRight, FaCartShopping } from "react-icons/fa6";
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceInRupees } from '../utils/DisplayPriceinRupees';
import { useSelector } from 'react-redux';

const CartMobile = () => {
    const { totalPrice, totalQyt } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)

    return (
        <>
            {
                cartItem[0] && (
                    <div className="lg:hidden p-2 sticky bottom-4 z-10">
                        <div className="flex justify-between gap-3 items-center bg-green-700 px-2 py-1 rounded text-neutral-100 text-sm">
                            <div className="flex items-center gap-2">
                                <div className=" p-2 bg-green-500 rounded w-fit">
                                    <FaCartShopping />
                                </div>
                                <div className="text-xs">
                                    <p>{totalQyt} Items</p>
                                    <p>{DisplayPriceInRupees(totalPrice)}</p>
                                </div>
                            </div>

                            <Link to={'/cart'} className=" flex items-center gap-1">
                                <span className=" text-sm">View Cart</span>
                                <FaCaretRight />
                            </Link>
                        </div>
                    </div>
                )
            }
        </>

    )
}

export default CartMobile