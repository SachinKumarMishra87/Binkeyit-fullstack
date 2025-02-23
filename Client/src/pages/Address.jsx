import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { MdDelete, MdEdit } from "react-icons/md";
import EditAddressDetails from '../components/EditAddressDetails';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';

const Address = () => {
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress, setOpenAddress] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const { fetchAddress } = useGlobalContext()

  const handleDisableAddress = async (_id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteAddress,
        data: {
          _id: _id
        }
      })

      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        if (fetchAddress) {
          fetchAddress()
        }
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <div className=''>
      <div className="bg-white shadow-lg px-2 py-2 flex items-center justify-between gap-4">
        <h2 className='font-semibold'>Address</h2>
        <button onClick={() => setOpenAddress(true)} className="border font-semibold px-5 py-2 rounded-full text-primary-200 border-primary-200 hover:bg-primary-200 bg-yellow-50 transition-all duration-75 ease hover:text-white">
          Add address
        </button>
      </div>
      <div className="bg-blue-50 p-2 grid gap-4">
        {
          addressList.map((address, index) => {
            return (
              <div key={index + address?._id + "Addresses"}
                className={`border p-3 bg-white flex rounded-md border-green-800 ${!address.status && "hidden"}`}>
                <div className="w-full">
                  <p>{address.address_line}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.country} - {address.pincode}</p>
                  <p>{address.mobail}</p>
                </div>
                <div className="flex justify-between flex-col">
                  <button onClick={() => {
                    setOpenEdit(true)
                    setEditData(address)
                  }} className='hover:text-white text-green-800 bg-green-200 hover:bg-green-800 px-1 py-4 rounded'>
                    <MdEdit size={23} />
                  </button>
                  <button onClick={() => {
                    handleDisableAddress(address._id)
                  }} className='hover:text-white text-red-800 bg-red-200 hover:bg-red-800 p-1 py-4 rounded'>
                    <MdDelete size={23} />
                  </button>
                </div>

              </div>
            )
          })
        }
        <div onClick={() => setOpenAddress(true)} className="h-16 bg-blue-50 border-2 border-dashed border-neutral-300 flex justify-center items-center cursor-pointer">
          Add address
        </div>
      </div>
      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }

      {
        openEdit && (
          <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />
        )

      }
    </div>
  )
}

export default Address