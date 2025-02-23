import React, { useEffect, useState } from 'react'
import UploadSubCategory from '../components/UploadSubCategory';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import DisplayTable from '../components/DisplayTable';
import { createColumnHelper } from "@tanstack/react-table"
import ViewImage from '../components/ViewImage';
import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditSubCategory from '../components/EditSubCategory';
import ConfirmBox from "../components/ConfirmBox"
import toast from 'react-hot-toast';

const SubCategoryPage = () => {
  const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [imageUrl, setImageUrl] = useState('')
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    _id: ""
  })
  const [deleteSubCategory, setDeleteSubCategory] = useState({
    _id: ""
  })
  const [openDeleteSubCategoryConfirmBox, setOpenDeleteSubCategoryConfirmBox] = useState(false);

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubcategory
      })

      const { data: responseData } = response
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchSubCategory();
  }, [])

  const column = [
    columnHelper.accessor('name', {
      header: 'Name',
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center">
            <img
              src={row.original.image}
              alt={row.original.name}
              className='w-8 h-8 cursor-pointer'
              onClick={() => {
                setImageUrl(row.original.image)
              }}
            />
          </div>
        )
      }
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ row }) => {
        return (
          <>
            {
              row.original.category.map((c, index) => {
                return (
                  <p key={c._id + "table"} className='shadow-md px-1 inline-block'>{c.name}</p>
                )
              })
            }
          </>
        )
      }
    }),
    columnHelper.accessor("_id", {
      header: "Action",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-3">
            <button
              title='Edit'
              className='p-2 bg-green-100 rounded-full hover:text-green-700'
              onClick={() => {
                setOpenEdit(true)
                setEditData(row.original)
              }}
            >
              <MdOutlineEdit size={20} />
            </button>
            <button
              title='Delete'
              className='p-2 bg-red-100 rounded-full text-red-500 hover:text-red-700'
              onClick={() => {
                setOpenDeleteSubCategoryConfirmBox(true)
                setDeleteSubCategory(row.original)
              }}
            >
              <MdDelete size={20} />
            </button>
          </div>
        )
      }
    })
  ]

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory
      })
      const { data: responseData } = response
      if (responseData.success) {
        toast.success(responseData.message)
        setOpenDeleteSubCategoryConfirmBox(false)
        fetchSubCategory()
        setDeleteSubCategory({ _id: "" })
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }


  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button onClick={setOpenAddSubCategory} className='text-sm px-3 py-1 rounded border border-primary-200 hover:bg-primary-200'>Add Sub Category</button>
      </div>

      <div className="overflow-auto w-full max-w-[95vw]">
        <DisplayTable
          data={data}
          column={column}
          loading={loading}
        />
      </div>


      {
        openAddSubCategory && (
          <UploadSubCategory
            close={() => setOpenAddSubCategory(false)}
            fetchData={fetchSubCategory}
          />
        )
      }

      {
        imageUrl &&
        <ViewImage url={imageUrl} close={() => setImageUrl("")} />
      }

      {
        openEdit &&
        <EditSubCategory
          data={editData}
          close={() => setOpenEdit(false)}
          fetchData={fetchSubCategory}
        />
      }

      {
        openDeleteSubCategoryConfirmBox &&
        <ConfirmBox
          cancle={() => setOpenDeleteSubCategoryConfirmBox(false)}
          confirm={handleDeleteSubCategory}
          close={() => setOpenDeleteSubCategoryConfirmBox(false)}
        />
      }
    </section>
  )
}

export default SubCategoryPage