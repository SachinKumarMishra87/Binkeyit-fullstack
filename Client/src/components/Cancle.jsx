import React from 'react'
import { Link } from 'react-router-dom'


const Cancle = () => {
  return (
    <div className='flex justify-center p-4'>
      <div className="m-2 w-full border border-red-900 max-w-md bg-red-200 flex flex-col justify-center items-center gap-4
     rounded p-4 py-5 mx-auto">
        <p className='text-red-800 font-bold text-lg'>
          Order Cancle
        </p>
        <Link to={"/"} className='border border-red-900 text-red-900 hover:bg-red-900 hover:text-white transition-all px-4 py-1 rounded'>Go To Home</Link>
      </div>
    </div>
  )
}

export default Cancle