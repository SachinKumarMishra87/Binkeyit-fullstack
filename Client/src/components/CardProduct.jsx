import React, { useState } from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceinRupees'
import { Link } from 'react-router-dom'
import { validURLConverter } from '../utils/validURLConverter'
import { pricewithdiscount } from '../utils/PriceWithDiscount'
import AddTwoCartButton from './AddTwoCartButton'

const CardProduct = ({ data }) => {
    const url = `/product/${validURLConverter(data.name)}-${data._id}`

    return (
        <Link to={url}
            className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-40 lg:min-w-52 rounded cursor-pointer bg-white' >
            <div
                className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
                <img
                    src={data?.image[0]}
                    alt=""
                    className='w-full h-full object-scale-down lg:scale-125'
                />
            </div>
            <div className="flex items-center gap-4">
                <div className='rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-100'>
                    10 min
                </div>
                <div>
                    {
                        data.discount > 0 && (
                            <p className='text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full'>{data.discount}% Discount</p>
                        )
                    }
                </div>
            </div>
            <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
                {data.name}
            </div>
            <div className='w-fit px-2 lg:px-0 text-sm lg:text-base'>
                {data.unit}
            </div>

            <div className='px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base'>
                <div className='font-semibold'>
                    {DisplayPriceInRupees(pricewithdiscount(data.price, data.discount))}
                </div>
                <div className="">
                    {
                        data.stock == 0 ? (
                            <p className='text-red-600 border p-1 rounded bg-red-100 text-center'>Out of stock</p>
                        ) : (
                           <AddTwoCartButton data={data} />
                        )
                    }
                </div>
            </div>

        </Link>
    )
}

export default CardProduct
