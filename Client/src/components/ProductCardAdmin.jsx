import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin'
import ConfirmBox from './ConfirmBox'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'

const ProductCardAdmin = ({ data, index, fetchProductData }) => {
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const handleDelete = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteProductDetails,
                data: {
                    _id: data._id,
                },
            });

            const { data: responseData } = response;

            if (responseData.success) {
                toast.success(responseData.message);
                fetchProductData();
                setDeleteOpen(false);
            } else {
                toast.error(responseData.message);
            }
        } catch (error) {
            console.error("Delete Error: ", error.response?.data || error.message);
            AxiosToastError(error);
        }
    };

    return (
        <div key={index} className='w-44 p-4 bg-white rounded cursor-pointer'>
            <div className="">
                <img
                    src={data?.image[0]}
                    alt={data?.name}
                    className='w-full h-full object-scale-down'
                />
            </div>
            <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
            <p className='text-slate-400'>{`${data?.unit}`}</p>
            <div className=" grid grid-cols-2 gap-3 py-2">
                <button onClick={() => setEditOpen(true)} className='border px-1 text-sm py-1 border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded'>Edit</button>
                <button onClick={() => setDeleteOpen(true)} className='border px-1 text-sm py-1 border-red-600 bg-red-100 text-red-800 hover:bg-red-200 rounded'>Delete</button>
            </div>
            {
                editOpen && (
                    <EditProductAdmin fetchProductData={fetchProductData} data={data} close={() => setEditOpen(false)} />
                )
            }
            {
                deleteOpen && (
                    <ConfirmBox cancle={() => setDeleteOpen(false)} confirm={handleDelete} close={() => setDeleteOpen(false)} />
                )
            }
        </div>
    )
}

export default ProductCardAdmin