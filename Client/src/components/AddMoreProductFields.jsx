import React from 'react'
import { IoClose } from 'react-icons/io5'

const AddMoreProductFields = ({ close, value, onchange, submit }) => {
  return (
    <section 
    className='fixed left-0 right-0 bottom-0 top-0 p-4 bg-neutral-900 bg-opacity-70 flex justify-center items-center z-50'
    >
      <div className="bg-white rounded p-4 w-full max-w-md ">
        <div className="flex items-center justify-between gap-3">
          <h1 className='font-semibold'>Add Field</h1>
          <button><IoClose size={23} onClick={close} /></button>
        </div>

        <input type="text"
          className='bg-blue-50 my-2 p-2 border outline-none focus-within:border-blue-500 w-full'
          value={value}
          onChange={onchange}
          required
          placeholder='Enter fields name'
        />
        <button
          onClick={submit}
          className="bg-green-700 hover:bg-green-900 transition-all duration-100 ease-linear cursor-pointer py-1 px-3 rounded text-white text-center font-semibold border mx-auto w-fit block">
          Add Fields
        </button>
      </div>
    </section>
  )
}

export default AddMoreProductFields