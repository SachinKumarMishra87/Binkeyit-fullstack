import React from 'react'
import { IoClose } from 'react-icons/io5'

const ConfirmBox = ({ cancle, confirm, close }) => {
    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 z-50 bg-neutral-800 bg-opacity-70 p-4 flex justify-center items-center'>
            <div className="bg-white w-full max-w-md p-4 rounded-lg">
                <div className="flex justify-between items-center gap-3">
                    <h1 className='font-semibold '>Permanent Delete</h1>
                    <button onClick={close}>
                        <IoClose size={24} />
                    </button>
                </div>
                <p className='my-4'>Are you sure permanent delete ?</p>
                <div className="w-fit ml-auto flex gap-2 items-center">
                    <button onClick={cancle} className='px-3 border border-red-500 hover:bg-red-500 text-red-600 font-medium py-1 rounded hover:text-white'>Cancle</button>
                    <button onClick={confirm} className='px-3  border border-green-500 hover:bg-green-500 text-green-600 font-medium py-1 rounded hover:text-white'>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmBox