import React, { useState } from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceinRupees'
import { useGlobalContext } from '../provider/GlobalProvider'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import { loadStripe } from "@stripe/stripe-js"

const CheckOutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQyt, fetchCartItem, fetchOrder } = useGlobalContext()
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectedAddress, setSelectedAddress] = useState(0)
  const cartItemsList = useSelector(state => state.cartItem.cart)

  const navigate = useNavigate()

  const handleCashOnDelivery = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.cashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectedAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        if (fetchCartItem) {
          fetchCartItem()
        }
        if (fetchOrder) {
          fetchOrder()
        }
        navigate('/success', {
          state: {
            text: "Order"
          }
        })
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }


  const handleOnlinePayment = async () => {
    try {
      toast.loading("Loading..")
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
      const stripePromise = await loadStripe(stripePublicKey)

      const response = await Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectedAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        }
      })

      const { data: responseData } = response

      stripePromise.redirectToCheckout({ sessionId: responseData.id })

      if (fetchCartItem) {
        fetchCartItem();
      }
      if (fetchOrder) {
        fetchOrder()
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className='bg-blue-50 '>
      <div className="container mx-auto p-4 flex flex-col lg:flex-row w-full justify-between gap-5 ">

        {/*Address Part  */}
        <div className="w-full">
          <h3 className='text-lg font-semibold'>Choose your address</h3>
          <div className="p-2 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {
              addressList.map((address, index) => {
                return (
                  <label key={index + address?._id + "Addresses"} htmlFor={'address' + index} className={`${!address.status && "hidden"}`}>
                    <div className="border lg:h-36 md:h-40 p-3 bg-white hover:bg-blue-50 rounded-md border-green-800 flex gap-3">
                      <div className="">
                        <input type="radio" id={'address' + index} value={index} name='address' onChange={(e) => setSelectedAddress(e.target.value)} />
                      </div>
                      <div className="">
                        <p>{address.address_line}</p>
                        <p>{address.city}</p>
                        <p>{address.state}</p>
                        <p>{address.country} - {address.pincode}</p>
                        <p>{address.mobail}</p>
                      </div>
                    </div>
                  </label>
                )
              })
            }

          </div>
          <div onClick={() => setOpenAddress(true)} className="h-16 bg-blue-50 border-2 border-dashed border-neutral-300 flex justify-center items-center cursor-pointer">
            Add address
          </div>
        </div>

        {/* Summary */}
        <div className="w-full max-w-md bg-white py-4 px-2">
          <h3 className='text-lg font-semibold'>Summary</h3>

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

          <div className="w-full flex flex-col gap-4">
            <button onClick={handleOnlinePayment} className='py-2 px-4 bg-green-600 hover:bg-green-700 transition-all duration-100 ease-in-out text-white font-semibold rounded'>Online Payment</button>
            <button onClick={handleCashOnDelivery} className='py-2 px-4 border-2 border-green-600 hover:bg-green-700 transition-all duration-200 ease-in-out text-green-600 hover:text-white font-semibold rounded'>Cash on Delivery</button>

          </div>

        </div>
      </div>

      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }

    </section>
  )
}

export default CheckOutPage