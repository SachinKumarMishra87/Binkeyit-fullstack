import React, { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import uploadImage from "../utils/UploadImage"
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';

const EditSubCategory = ({ data, close,fetchData }) => {

    const [subCategoryData, setSubCategoryData] = useState({
        _id: data._id,
        name: data.name,
        image: data.image,
        category: data.category || []
    })
    const [subcategoryImgLoading, setSubCategoryImgLoading] = useState(false)

    const allCategory = useSelector((state) => state.product.allCategory)

    const handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;

        setSubCategoryData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadSubcategoryImg = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            return;
        }
        try {
            setSubCategoryImgLoading(true);
            const response = await uploadImage(file);
            const { data: ImageResponse } = response

            setSubCategoryData((prev) => {
                return {
                    ...prev,
                    image: ImageResponse.data.url
                }
            })
        } catch (error) {
            return error;
        } finally {
            setSubCategoryImgLoading(false)
        }
    }

    const handleRemoveCategorySelected = (categoryId) => {
        const index = subCategoryData.category.findIndex(el => el._id === categoryId)
        subCategoryData.category.splice(index, 1)
        setSubCategoryData((prev) => {
            return {
                ...prev
            }
        })
    }

    const handleSubmitSubCategory = async (e) => {

        e.preventDefault();

        try {
            const response = await Axios({
                ...SummaryApi.updateSubCategory,
                data: subCategoryData
            })

            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message)
                if (close) {
                    close()
                }
                if (fetchData) {
                    fetchData();
                }
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (
        <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
            <div className="bg-white max-w-6xl w-full p-4 rounded ">
                <div className="flex items-center justify-between">
                    <h1 className='font-semibold'>Edit Sub Category</h1>
                    <button onClick={close} className='w-fit block ml-auto bg-orange-200 rounded-md'>
                        <IoCloseSharp size={20} />
                    </button>
                </div>
                <form className='my-3 grid gap-3' onSubmit={handleSubmitSubCategory}>
                    <div className='grid gap-1'>
                        <label htmlFor="subcategoryname">Name</label>
                        <input
                            type="text" id='subcategoryname' name='name'
                            className='p-2 bg-blue-50 border outline-none focus-within:border-blue-500 rounded'
                            placeholder='Sub Category Name'
                            value={subCategoryData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='grid gap-1'>
                        <p>Image</p>
                        <div className='flex flex-col gap-3 lg:flex-row items-center'>
                            <div className="border h-36 w-full lg:w-36 bg-blue-50 flex items-center justify-center ">
                                {
                                    !subCategoryData.image ? (
                                        <p className='text-sm text-neutral-400'>No Image</p>
                                    ) : (
                                        <img
                                            src={subCategoryData.image}
                                            alt={subCategoryData.name}
                                            className='w-full h-full object-scale-down' />
                                    )
                                }
                            </div>

                            <label htmlFor="uploadSubcategoryImg">
                                <div className='cursor-pointer px-4 py-1 border border-yellow-200 text-yellow-600 hover:bg-yellow-300 hover:text-neutral-800 rounded-sm'>
                                    {
                                        subcategoryImgLoading ? "Loading..." : "Upload Image"
                                    }
                                </div>
                                <input
                                    type="file"
                                    id='uploadSubcategoryImg'
                                    className='hidden'
                                    onChange={handleUploadSubcategoryImg}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <label htmlFor="selectCategory">Select Category</label>
                        <div className="border focus-within:border-blue-500 rounded">

                            {/* Display value */}
                            <div className="flex flex-wrap gap-2">
                                {
                                    subCategoryData.category.map((cat, index) => {
                                        return (
                                            <p className='bg-white flex items-center gap-2 shadow-md px-1 m-1' key={cat._id + "selectedValue"}>
                                                {cat.name}
                                                <div className='cursor-pointer hover:text-red-800' onClick={() => handleRemoveCategorySelected(cat._id)}>
                                                    <IoCloseSharp size={20} />
                                                </div>
                                            </p>
                                        )
                                    })
                                }
                            </div>

                            {/* select category */}
                            <select
                                id='selectCategory'
                                className='cursor-pointer p-2 w-full bg-blue-50 border outline-none'
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const categoryDetails = allCategory.find(el => el._id == value)

                                    if (
                                        categoryDetails &&
                                        !subCategoryData.category.some((cat) => cat._id === categoryDetails._id)
                                    ) {


                                        setSubCategoryData((prev) => {
                                            return {
                                                ...prev,
                                                category: [...prev.category, categoryDetails]
                                            }
                                        })
                                    } else {
                                        alert("Category already selected!"); // Replace with your preferred feedback mechanism
                                    }
                                }}
                            >
                                <option value=""  >Select Category</option>
                                {
                                    allCategory.map((category, index) => {
                                        return (
                                            <option key={index} value={category?._id}>{category?.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <button className={`px-4 py-2 border font-semibold rounded-md
                        ${subCategoryData.name && subCategoryData.image && subCategoryData.category.length > 0 ? "bg-green-600 text-white hover:bg-green-700 transition-all duration-100 ease" : "bg-neutral-200 text-neutral-400"}
                        `}>
                        Submit
                    </button>
                </form>
            </div>
        </section>
    )
}

export default EditSubCategory