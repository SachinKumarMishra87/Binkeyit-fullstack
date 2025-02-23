import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'

const MyOrderPage = () => {
  const orders = useSelector(state => state.orders.order)

  return (
    <section className='p-4'>
      <div className="bg-white shadow-md p-3 font-semibold ">
        <h1>Order</h1>
      </div>
      {
        !orders[0] && (
          <NoData />
        )
      }
      <div className="py-4">
        {
          orders.map((order, index) => {
            return (
              <div key={index + "orderList" + order._id}
                className="border rounded p-4 text-sm">

                <div className="flex gap-3 items-center">
                  <h1 className='font-semibold text-neutral-600'>{index + 1} :</h1>
                  <div className="">
                    <p>Order No : {order?.orderId}</p>
                    <div className="flex gap-3 items-center">
                      <img src={order.product_details.image[0]}
                        alt={order.product_details.name}
                        className='w-14 h-14'
                      />
                      <p className='font-medium'>{order.product_details.name}</p>
                    </div>
                  </div>
                </div>


              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default MyOrderPage