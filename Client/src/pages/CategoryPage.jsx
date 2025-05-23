import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import NoData from '../components/NoData';
import EditCategory from '../components/EditCategory';
import ConfirmBox from '../components/ConfirmBox';
import toast from 'react-hot-toast';
import Loading from '../components/Loading';

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    image: ""
  })
  const [openConfirmDeleteBox, setOpenConfirmDeleteBox] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState({
    _id: "",
  })

  // const allCategory = useSelector(state => state.product.allCategory)
  // console.log(allCategory)
  // useEffect(() => {
  //   setCategoryData(allCategory)
  // }, [allCategory])

  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getAllCategory
      })
      const { data: responseData } = response

      if (responseData.success) {
        setCategoryData(responseData.data)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        setOpenConfirmDeleteBox(false)
        fetchCategory()
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Category</h2>
        <button onClick={() => setOpenUploadCategory(true)} className='text-sm px-3 py-1 rounded border border-primary-200 hover:bg-primary-200'>Add Category</button>
      </div>
      {
        !categoryData[0] && !loading && (
          <NoData />
        )
      }
      <div className='p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
        {
          categoryData.map((category, index) => {
            return (
              <div className='w-32 h-56 rounded shadow-md' key={index}>
                <img
                  alt={category.name}
                  src={category.image}
                  className='w-full object-scale-down'
                />
                <div className='items-center h-9 flex gap-2'>
                  <button onClick={() => {
                    setOpenEdit(true)
                    setEditData(category)
                  }} className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded'>
                    Edit
                  </button>
                  <button onClick={() => {
                    setOpenConfirmDeleteBox(true)
                    setDeleteCategory(category)
                  }} className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'>
                    Delete
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>
      {
        loading && (
          <Loading />
        )
      }

      {
        openUploadCategory && (
          <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />
        )
      }

      {
        openEdit && (
          <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} />
        )
      }

      {
        openConfirmDeleteBox && (
          <ConfirmBox close={() => setOpenConfirmDeleteBox(false)} cancle={() => setOpenConfirmDeleteBox(false)} confirm={handleDeleteCategory} />
        )
      }
    </section>
  )
}

export default CategoryPage