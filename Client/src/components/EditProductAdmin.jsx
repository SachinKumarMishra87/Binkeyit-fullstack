import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from "../utils/UploadImage"
import { VscLoading } from "react-icons/vsc";
import ViewImage from "../components/ViewImage"
import { IoClose } from 'react-icons/io5';
import { useSelector } from "react-redux"
import AddMoreProductFields from '../components/AddMoreProductFields';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from "../utils/AxiosToastError.js"
import successAlert from '../utils/SuccessAlert.js';

const EditProductAdmin = ({ data: filledData, close ,fetchProductData}) => {
  console.log(filledData)
  const [data, setData] = useState({
    _id: filledData._id,
    name: filledData.name,
    image: filledData.image,
    category: filledData.category,
    subCategory: filledData.subCategory,
    unit: filledData.unit,
    stock: filledData.stock,
    price: filledData.price,
    discount: filledData.discount,
    description: filledData.description,
    more_details: filledData.more_details || {},
  })
  const [loading, setLoading] = useState(false)
  const [viewImageUrl, setViewImageUrl] = useState("")
  const allCategory = useSelector(state => state.product.allCategory)
  const [selectCategory, setSelectCategory] = useState("")
  const [selectSubCategory, setSelectSubCategory] = useState("")
  const allSubCategory = useSelector(state => state.product.allSubCategory)

  const [openAddField, setOpenAddField] = useState(false)
  const [fieldName, setFieldName] = useState("")
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })

  }

  const handleUploadProductImage = async (e) => {
    try {
      setLoading(true)
      const file = e.target.files[0];

      if (!file) {
        return
      }
      const response = await UploadImage(file)
      const { data: ImageResponse } = response
      const ImageUrl = ImageResponse.data.url

      setData((prev) => {
        return {
          ...prev,
          image: [...prev.image, ImageUrl]
        }
      })

    } catch (error) {
      return error
    } finally {
      setLoading(false)
    }
  }

  const handleDleteImage = async (index) => {

    data.image.splice(index, 1);
    setData((prev) => {
      return {
        ...prev
      }
    })

  }

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1)
    setData((prev) => {
      return {
        ...prev
      }
    })
  }

  const handleRemoveSubCategory = (index) => {
    data.subCategory.splice(index, 1)
    setData((prev) => {
      return {
        ...prev
      }
    })
  }

  const handleAddMoreFields = () => {
    setData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [fieldName]: ""
        }
      }
    })
    setFieldName("")
    setOpenAddField(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setSubmitLoading(true)
      const response = await Axios({
        ...SummaryApi.updateProductDetails,
        data: data
      })

      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message)
        if (close) {
          close()
        }
        fetchProductData()
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: [],
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {}
        })
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setSubmitLoading(false)
    }
  }

  return (
    <section className='fixed top-0 bottom-0 right-0 left-0 z-50 bg-black  bg-opacity-70 p-4'>
      <div className="bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto h-full maxh-[95vh] scrollBarCustom">
        <section>
          <div className='p-2 bg-white shadow-md flex items-center justify-between'>
            <h2 className='font-semibold'>Update Product</h2>
            <button>
              <IoClose size={20} onClick={close} />
            </button>
          </div>

          <div className="grid p-3">
            <form className='grid gap-4' onSubmit={handleSubmit}>

              {/* name */}
              <div className="grid gap-1">
                <label htmlFor="name"
                  className='font-medium'>Name</label>
                <input
                  type="text"
                  placeholder='Enter product name..'
                  value={data.name}
                  name='name'
                  id='name'
                  onChange={handleChange}
                  required
                  autoFocus
                  className='outline-none bg-blue-50 p-2 border focus-within:border-blue-600 rounded'
                />
              </div>

              {/* Descriptions */}
              <div className="grid gap-1">
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  placeholder='Enter product description..'
                  value={data.description}
                  name='description'
                  id='description'
                  onChange={handleChange}
                  required
                  rows={3}
                  className='scrollBarCustom outline-none bg-blue-50 p-2 border focus-within:border-blue-600 rounded resize-none'
                />
              </div>

              {/* Image */}
              <div>
                <p>Image</p>
                <div className="">
                  <div className="bg-blue-100 h-24 border rounded flex justify-center items-center">
                    <label htmlFor='uploadProduct' className="flex flex-col items-center cursor-pointer">
                      {
                        loading ? <VscLoading size={30} className="rotate-animation text-green-900 " />
                          : <FaCloudUploadAlt size={35}
                          />
                      }
                      <p>
                        {
                          loading ? "Uploading.." : "Upload Image"
                        }
                      </p>
                      <input
                        type="file"
                        name="file"
                        id="uploadProduct"
                        hidden
                        accept='image'
                        onChange={handleUploadProductImage}
                      />
                    </label>
                  </div>

                  {/* Display uploaded image */}

                  <div className="flex flex-wrap gap-4">
                    {
                      data.image.map((img, index) => {
                        return (
                          <div
                            className="h-24 mt-1 w-24 min-w-24 bg-blue-50 border relative group"
                            key={img + index}>
                            <img
                              src={img}
                              alt={img}
                              className='w-full h-full object-scale-down cursor-pointer'
                              onClick={() => setViewImageUrl(img)}
                            />
                            <div
                              onClick={() => handleDleteImage(index)}
                              className="cursor-pointer absolute right-0 bottom-0 p-1 bg-red-500 hover:bg-red-600 hidden rounded-tl-full text-white group-hover:block">
                              <IoClose size={20} />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>

              {/* Select Category */}
              <div className="grid gap-1">

                <label>Category</label>

                <div className="">
                  <select
                    className='bg-blue-50 border w-full p-2 rounded outline-none'
                    value={selectCategory}
                    onChange={(e) => {
                      const value = e.target.value
                      const category = allCategory.find(el => el._id === value)

                      if (!data.category.some((c) => c._id === value)) {
                        setData((prev) => ({
                          ...prev,
                          category: [...prev.category, category],
                        }));
                      }
                      else {
                        alert("This category also used ??")
                      }
                      setSelectCategory("");
                    }}
                  >
                    <option value={""}>Select Category</option>
                    {
                      allCategory.map((c, index) => {
                        return (
                          <option value={c?._id} key={c?._id + index}>{c.name}</option>
                        )
                      })
                    }
                  </select>
                  <div className="flex flex-wrap gap-1">
                    {
                      data.category.map((c, index) => {
                        return (
                          <div
                            className="flex items-center gap-1 text-sm shadow-md rounded-sm px-2 py-1 mt-1"
                            key={c._id + index + "productSection"}
                          >
                            <p>{c.name}</p>
                            <div
                              className='hover:text-red-700 cursor-pointer'
                              onClick={() => handleRemoveCategory(index)}
                            >
                              <IoClose size={18} />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>

              </div>

              {/* Select Sub Category */}
              <div className="grid gap-1">

                <label>Sub Category</label>

                <div className="">
                  <select
                    className='bg-blue-50 border w-full p-2 rounded outline-none'
                    value={selectSubCategory}
                    onChange={(e) => {
                      const value = e.target.value
                      const subCategory = allSubCategory.find(el => el._id === value)

                      if (!data.subCategory.some((c) => c._id === value)) {
                        setData((prev) => ({
                          ...prev,
                          subCategory: [...prev.subCategory, subCategory],
                        }));
                      }
                      else {
                        alert("This Sub Category also used ??")
                      }
                      setSelectSubCategory("");
                    }}
                  >
                    <option value={""}
                    >Select Sub Category</option>
                    {
                      allSubCategory.map((c, index) => {
                        return (
                          <option value={c?._id} key={index}>{c.name}</option>
                        )
                      })
                    }
                  </select>
                  <div className="flex flex-wrap gap-1">
                    {
                      data.subCategory.map((c, index) => {
                        return (
                          <div
                            className="flex items-center gap-1 text-sm shadow-md rounded-sm px-2 py-1 mt-1"
                            key={c._id + index + "productSection"}
                          >
                            <p>{c.name}</p>
                            <div
                              className='hover:text-red-700 cursor-pointer'
                              onClick={() => handleRemoveSubCategory(index)}
                            >
                              <IoClose size={18} />
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>

              </div>

              {/* Unit */}
              <div className="grid gap-1">
                <label htmlFor="unit">Unit</label>
                <input
                  type="text"
                  placeholder='Enter product unit'
                  value={data.unit}
                  name='unit'
                  id='unit'
                  onChange={handleChange}
                  required
                  className='outline-none bg-blue-50 p-2 border focus-within:border-blue-600 rounded'
                />
              </div>

              {/* Stock */}
              <div className="grid gap-1">
                <label htmlFor="stock">Number of Stock</label>
                <input
                  type="number"
                  placeholder='Enter product stock'
                  value={data.stock}
                  name='stock'
                  id='stock'
                  onChange={handleChange}
                  required
                  className='outline-none bg-blue-50 p-2 border focus-within:border-blue-600 rounded'
                />
              </div>

              {/* Price */}
              <div className="grid gap-1">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  placeholder='Enter product price'
                  value={data.price}
                  name='price'
                  id='price'
                  onChange={handleChange}
                  required
                  className='outline-none bg-blue-50 p-2 border focus-within:border-blue-600 rounded'
                />
              </div>

              {/* Discount */}
              <div className="grid gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  type="number"
                  placeholder='Enter product discount'
                  value={data.discount}
                  name='discount'
                  id='discount'
                  onChange={handleChange}
                  required
                  className='outline-none bg-blue-50 p-2 border focus-within:border-blue-600 rounded'
                />
              </div>

              {/* More Fields */}
              {
                Object?.keys(data.more_details)?.map((k, index) => {
                  return (
                    <div key={index} className="grid gap-1">
                      <label htmlFor={k}>{k}</label>
                      <input
                        type="text"
                        value={data?.more_details[k]}
                        id={k}
                        placeholder={`Please enter ${k}..`}
                        onChange={(e) => {
                          const value = e.target.value

                          setData((prev) => {
                            return {
                              ...prev,
                              more_details: {
                                ...prev.more_details,
                                [k]: value
                              }
                            }
                          })
                        }}
                        required
                        className='outline-none bg-blue-50 p-2 border focus-within:border-blue-600 rounded'
                      />
                    </div>
                  )
                })
              }
              <div
                onClick={() => setOpenAddField(true)}
                className="bg-yellow-800 hover:bg-green-600 transition-all duration-100 ease-linear cursor-pointer py-1 px-3 w-32 rounded text-white hover:text-black text-center font-semibold border border-primary-200">
                Add Fields
              </div>
              <button
                className='bg-primary-200 hover:bg-primary-100 py-2 rounded font-semibold '
              >
                {
                  submitLoading ? "Loading.." : "Update Product"
                }
              </button>
            </form>
          </div>

          {
            viewImageUrl && (
              <ViewImage url={viewImageUrl} close={() => setViewImageUrl("")} />
            )
          }

          {
            openAddField && (
              <AddMoreProductFields
                value={fieldName}
                onchange={(e) => setFieldName(e.target.value)}
                submit={handleAddMoreFields}
                close={() => setOpenAddField(false)} />
            )
          }

        </section>
      </div>
    </section>
  )
}

export default EditProductAdmin


