import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Success = () => {
    const location = useLocation()
    return (
        <div className='flex justify-center p-4'>
            <div className="m-2 w-full max-w-md bg-green-200 flex flex-col justify-center items-center gap-4
             rounded p-4 py-5 mx-auto">
                <p className='text-green-800 font-bold text-lg'>{Boolean(location?.state?.text) ? location?.state?.text : "Payment"} Successfull</p>
                <Link to={"/"} className='border border-green-900 text-green-900 hover:bg-green-900 hover:text-white transition-all px-4 py-1 rounded'>Go To Home</Link>
            </div>
        </div>
    )
}

export default Success