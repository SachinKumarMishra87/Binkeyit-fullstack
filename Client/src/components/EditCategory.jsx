import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import uploadImages from '../utils/UploadImage.js';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummaryApi.js';
import toast from 'react-hot-toast';
import AxiosToastError from "../utils/AxiosToastError.js"

const EditCategory = ({ close, fetchData, data: CategoryData }) => {

    const [data, setData] = useState({
        _id: CategoryData._id,
        name: CategoryData.name,
        image: CategoryData.image
    })

    const [loading, setLoading] = useState(false)
    const [Addloading, setAddLoading] = useState(false)

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setAddLoading(true);
            const response = await Axios({
                ...SummaryApi.updateCategory,
                data: data
            })
            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                close();
                fetchData()
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setAddLoading(false)
        }
    }

    const handleUploadCategoryImages = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            return
        }
        setLoading(true)
        try {
            const response = await uploadImages(file)
            const { data: ImageResponse } = response

            setData((preve) => {
                return {
                    ...preve,
                    image: ImageResponse.data.url,
                }
            })
        } catch (error) {
            return error
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
            <div className="bg-white max-w-4xl w-full p-4 rounded ">
                <div className="flex items-center justify-between">
                    <h1 className='font-semibold'>Update Category</h1>
                    <button onClick={close} className='w-fit block ml-auto bg-orange-200 rounded-md'>
                        <IoCloseSharp size={20} />
                    </button>
                </div>

                <form className='my-3 grid gap-2' onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label htmlFor="categoryName">Name</label>
                        <input
                            type="text"
                            id='categoryName'
                            placeholder='Enter category name'
                            value={data.name}
                            name='name'
                            onChange={handleOnChange}
                            className='bg-blue-50 p-2 border border-blue-200 rounded outline-none focus-within:border-blue-400'
                        />
                    </div>

                    <div className='grid gap-1'>
                        <p>Image</p>
                        <div className="flex gap-5 flex-col lg:flex-row items-center">
                            <div className="border rounded bg-blue-50 h-36 w-full lg:w-36 flex items-center justify-center">
                                {
                                    data.image ? (
                                        <img
                                            src={data.image}
                                            alt="category"
                                            className='w-full h-full object-scale-down'
                                        />
                                    ) : (
                                        <p className='text-sm text-neutral-500'>No Image</p>
                                    )
                                }
                            </div>
                            <label htmlFor='uploadCategoryImage'>
                                <div className={`
                                 ${!data.name ? "bg-gray-400" : "bg-green-600"} transition-all duration-200 ease-linear hover:bg-green-700 
                                 px-4 py-2 rounded cursor-pointer select-none text-white
                               `}>
                                    {
                                        loading ? "Loading..." : "Upload Image"
                                    }
                                </div>
                                <input
                                    disabled={!data.name}
                                    onChange={handleUploadCategoryImages}
                                    type="file"
                                    id='uploadCategoryImage'
                                    className='hidden'
                                />
                            </label>
                        </div>
                    </div>

                    <button
                        className={
                            `
                               ${data.name && data.image ? "bg-neutral-700 text-white hover:bg-neutral-900" : "bg-slate-200 "}
                               py-1.5 rounded mt-2 transition-all duration-200 ease-linear 
                           `
                        }
                    >
                        {
                            Addloading ? "Updating..." : "Update Category"
                        }
                    </button>
                </form>
            </div>
        </section>
    )
}

export default EditCategory