import React, { useEffect, useRef, useState } from 'react'
import { useParams } from "react-router-dom"
import Axios from "../utils/Axios"
import AxiosToastError from '../utils/AxiosToastError';
import SummaryApi from '../common/SummaryApi';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6"
import { DisplayPriceInRupees } from '../utils/DisplayPriceinRupees';
import Divider from '../components/Divider';
import minuteDeliveryImg from "../assets/minute_delivery.png"
import bestPricingImg from "../assets/Best_Prices_Offers.png"
import Wide_Assortment from "../assets/Wide_Assortment.png"
import { pricewithdiscount } from '../utils/PriceWithDiscount';
import AddTwoCartButton from '../components/AddTwoCartButton';

const ProductDisplayPages = () => {
  const params = useParams();
  const productId = params?.product?.split("-").slice(-1)[0]
  const imageContainer = useRef();

  const [data, setData] = useState({
    name: "",
    image: []
  })
  const [image, setImage] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId
        }
      })
      const { data: responseData } = response
      if (responseData.success) {
        setData(responseData.data)
        // setImage(responseData.data.image[0])
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100
  }
  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100
  }

  return (
    <section className=' container mx-auto p-4 grid lg:grid-cols-2 '>
      {/* Left Part For Image */}
      <div className="">
        <div className="bg-white lg:min-h-[70vh] lg:max-h-[70vh] rounded min-h-56 max-h-56 h-full w-full">
          <img
            src={data.image[image]}
            alt="Product Image"
            className='w-full h-full object-scale-down'
          />
        </div>
        <div className="flex items-center justify-center gap-3 my-2">
          {
            data.image.map((img, index) => {
              return (
                <div
                  key={index + img + "miniImage"}
                  className={`bg-neutral-300 w-2 h-2 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-500 lg:bg-neutral-400"}`}>
                </div>
              )
            })
          }
        </div>
        <div className="grid relative">
          <div ref={imageContainer} className="scroll-smooth relative z-10 flex gap-4 w-full overflow-x-auto scrollbar-none">
            {
              data.image.map((img, index) => {
                return (
                  <div
                    key={index + img + "miniImage"}
                    className="w-20 h-20 min-h-20 min-w-20  cursor-pointer shadow-md">
                    <img
                      src={img}
                      alt=""
                      className='w-full h-full object-scale-down'
                      onClick={(() => setImage(index))}
                    />
                  </div>
                )
              })
            }
          </div>
          <div className="w-full -ml-3 h-full hidden lg:flex items-center justify-between absolute">
            <button onClick={handleScrollLeft} className='relative z-10 bg-white p-1 rounded-full shadow-lg'><FaAngleLeft /></button>
            <button onClick={handleScrollRight} className='relative z-10 bg-white p-1 rounded-full shadow-lg'><FaAngleRight /></button>
          </div>
        </div>
        <div className="my-4 hidden lg:grid gap-3">
          <div className="">
            <p className='font-semibold'>Description</p>
            <p className='text-base text-neutral-600'>{data.description}</p>
          </div>
          <div className="">
            <p className='font-semibold'>Unit</p>
            <p className='text-base text-neutral-600'>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              return (
                <div key={index} className="">
                  <p className='font-semibold'>{element}</p>
                  <p className='text-base text-neutral-600'>{data?.more_details[element]}</p>
                </div>
              )
            })
          }
        </div>
      </div>

      {/* Right Part For Details */}
      <div className="p-4 lg:pl-7 text-base lg:text-lg">
        <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
        <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>
        <p className=''>{data.unit}</p>
        <Divider />
        <div className="">
          <p className=''>Price</p>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="border border-green-600 p-4 py-2 rounded bg-green-100 w-fit">
              <p className='font-semibold text-lg lg:text-2xl'>{DisplayPriceInRupees(pricewithdiscount(data.price, data.discount))}</p>
            </div>
            {
              data.discount > 0 && (
                <p className=' line-through text-lg'>{DisplayPriceInRupees(data.price)}</p>
              )
            }
            {
              data.discount > 0 && (
                <p className=' font-bold text-green-600 lg:text-2xl'>{data.discount}% <span className='text-base text-neutral-500'>Discount</span> </p>
              )
            }
          </div>

        </div>
        <div className="my-4">
          {
            data.stock === 0 ? (
              <p className='text-lg my-2 text-red-500'>Out of stock</p>
            ) : (
              <AddTwoCartButton data={data} />
            )
          }
        </div>
        <h2 className='font-semibold '>Why shop from Binkeyit?</h2>

        <div className="">

          {/* Image 1 */}
          <div className="flex items-center gap-4 my-4">
            <img
              src={minuteDeliveryImg}
              alt="Superfast Delivery"
              className='h-20 w-20'
            />
            <div className="text-sm">
              <div className="font-semibold">Superfast Delivery</div>
              <p className='px-1'>Get your order delivered to your doorstep at the earliest from dark stores near you.</p>
            </div>
          </div>

          {/* Image 2 */}
          <div className="flex items-center gap-4 my-4">
            <img
              src={bestPricingImg}
              alt="Best price offer"
              className='h-20 w-20'
            />
            <div className="text-sm">
              <div className="font-semibold">Best Prices & Offers</div>
              <p className='px-1'>Best price destination with offers directly from the manufacturers.</p>
            </div>
          </div>

          {/* Image 3 */}
          <div className="flex items-center gap-4 my-4">
            <img
              src={Wide_Assortment}
              alt="Wide_Assortment"
              className='h-20 w-20'
            />
            <div className="text-sm">
              <div className="font-semibold">Wide Assortment</div>

              <p className='px-1'>Choose from 5000+ products across food personal care, household & other categories</p>
            </div>
          </div>
        </div>

        {/* Discription for mobile */}
        <div className="my-4 grid lg:hidden gap-3">
          <div className="">
            <p className='font-semibold'>Description</p>
            <p className='text-base text-neutral-600'>{data.description}</p>
          </div>
          <div className="">
            <p className='font-semibold'>Unit</p>
            <p className='text-base text-neutral-600'>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => {
              return (
                <div key={index} className="">
                  <p className='font-semibold'>{element}</p>
                  <p className='text-base text-neutral-600'>{data?.more_details[element]}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default ProductDisplayPages