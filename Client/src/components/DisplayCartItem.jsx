import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceinRupees'
import { FaCaretRight } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import AddTwoCartButton from './AddTwoCartButton'
import { pricewithdiscount } from '../utils/PriceWithDiscount'
import cartEmptyImage from "../assets/empty_cart.webp"
import toast from 'react-hot-toast'

const DisplayCartItem = ({ close }) => {
    const { notDiscountTotalPrice, totalPrice, totalQyt } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const redirectToCheckoutPage = () => {

        if (user?._id) {
            navigate("/checkout")
            if (close) {
                close()
            }
            return
        }
        toast("please login")

    }

    return (
        <section className='bg-neutral-900  fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50'>
            <div className="bg-white w-full max-w-sm min-h-screen ml-auto">
                <div className=" flex items-center gap-3 p-4 shadow-md justify-between">
                    <h2 className='font-semibold'>Cart</h2>
                    <Link to={"/"} className='lg:hidden'>
                        <IoClose size={25} />
                    </Link>
                    <button onClick={close} className='hidden lg:block'>
                        <IoClose size={25} />
                    </button>
                </div>

                <div className="min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4">
                    {/* Display Items */}
                    {
                        cartItem[0] ? (
                            <>
                                <div className="flex items-center justify-between p-2 bg-blue-100 text-blue-500 rounded-full px-4 py-3 ">
                                    <p>Your total saving</p>
                                    <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto scrollBarCustom">
                                    {
                                        cartItem[0] && (
                                            cartItem.map((item, index) => {
                                                return (
                                                    <div key={index + item?._id + "CartItems"}
                                                        className="flex w-full gap-4 items-center">
                                                        <div className="w-16 h-16 min-w-16 min-h-16 border rounded">
                                                            <img src={item?.productId?.image[0]} alt="img"
                                                                className='object-scale-down'
                                                            />
                                                        </div>
                                                        <div className="w-full max-w-sm text-xs">
                                                            <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                                            <p className='text-neutral-400'>{item?.productId?.unit}</p>
                                                            <p className='font-semibold'>{DisplayPriceInRupees(pricewithdiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                                        </div>
                                                        <div className="">
                                                            <AddTwoCartButton data={item?.productId} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                </div>
                                <div className="rounded bg-white p-4">
                                    <h3 className='font-semibold'>Bill details</h3>
                                    <div className="flex gap-4 justify-between ml-1 ">
                                        <p>Items total</p>
                                        <p className='flex gap-2 items-center'>
                                            <span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                                            <span>{DisplayPriceInRupees(totalPrice)}</span>
                                        </p>
                                    </div>
                                    <div className="flex gap-4 justify-between ml-1">
                                        <p>Total Quantity</p>
                                        <p className='flex gap-2 items-center'>
                                            {totalQyt} Item
                                        </p>
                                    </div>
                                    <div className="flex gap-4 justify-between ml-1">
                                        <p>Delivery Charge</p>
                                        <p className='flex gap-2 items-center'>
                                            Free
                                        </p>
                                    </div>
                                    <div className='font-semibold flex gap-4 justify-between ml-1'>
                                        <p>Grand Total</p>
                                        <p>{DisplayPriceInRupees(totalPrice)}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="p-2 bg-white flex flex-col justify-center items-center">
                                <img
                                    src={cartEmptyImage}
                                    className='w-full h-full'
                                    alt="cartEmptyImage"
                                />
                                <Link onClick={"/search"}
                                    className='bg-green-600 hover:bg-green-700 transition-all duration-100 ease-linear px-4 py-2 text-white rounded'
                                >
                                    Shop Now
                                </Link>
                            </div>
                        )
                    }

                </div>

                {
                    cartItem[0] && (
                        <div className="p-2">
                            <div className="flex items-center gap-4 justify-between bg-green-700 text-neutral-100 px-4 font-semibold text-base py-4 sticky bottom-3 rounded">
                                <div className="">
                                    {DisplayPriceInRupees(totalPrice)}
                                </div>
                                <button onClick={redirectToCheckoutPage} className='flex items-center gap-1'>
                                    Proceed
                                    <span className='hover:text-neutral-300'><FaCaretRight /></span>
                                </button>
                            </div>
                        </div>
                    )
                }



            </div>
        </section>
    )
}

export default DisplayCartItem