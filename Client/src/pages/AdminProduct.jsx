import React, { useEffect, useState } from 'react'
import AxiosToastError from "../utils/AxiosToastError.js"
import Axios from "../utils/Axios.js"
import SummaryApi from '../common/SummaryApi.js';
import Loading from '../components/Loading.jsx';
import ProductCardAdmin from '../components/ProductCardAdmin.jsx';
import { IoMdSearch } from "react-icons/io";

const AdminProduct = () => {
  const [productData, setProductdata] = useState([]);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false);
  const [totalPageCount, setTotalPageCount] = useState(1);
  const [search, setSearch] = useState("");

  const fetchProductData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 15,
          search: search
        }
      })

      const { data: responseData } = response;
      if (responseData.success) {
        setTotalPageCount(responseData.totalNoPages)
        setProductdata(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
      console.log("error",error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData();
  }, [page])

  const handleNextPage = () => {
    if (page !== totalPageCount) {
      setPage(preve => preve + 1)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(preve => preve - 1)
    }
  }

  const handleOnSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value)
    setPage(1)
  }

  useEffect(() => {

    let flag = true;

    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData()
        flag = false
      }
    }, 300)

    return () => {
      clearTimeout(interval)
    }

  }, [search])

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex items-center justify-between gap-4'>
        <h2 className='font-semibold'>Product</h2>
        <div className="h-full min-w-24 max-w-60 w-full px-4 py-2 flex items-center gap-2 border focus-within:border-blue-500 rounded bg-blue-50 ">
          <label htmlFor="productSearch">
            <IoMdSearch size={24}
              className='text-yellow-900'
            />
          </label>
          <input
            id='productSearch'
            type="text"
            placeholder='Search product here...'
            className='h-full w-full outline-none bg-transparent'
            value={search}
            onChange={handleOnSearchChange}
          />
        </div>
      </div>
      {
        loading && (
          <Loading />
        )
      }

      {/* Display All Product */}
      <div className="p-4 bg-blue-50">
        <div className=" min-h-[70vh] flex flex-col justify-between">

          <div className="grid gap-4 grid-cols-2 lg:grid-cols-5 md:grid-cols-4">
            {
              productData.map((p, index) => {
                return (
                  <ProductCardAdmin fetchProductData = {fetchProductData} data={p} key={index}/>
                )
              })
            }
          </div> 
          <div className=" flex justify-between gap-2 my-2">
            <button
              onClick={handlePreviousPage}
              className='border border-primary-200 rounded px-5 py-1 hover:bg-primary-100'>Previous</button>
            <button 
            className='w-full bg-yellow-600 font-semibold rounded text-white'>{page}/{totalPageCount}</button>
            <button
              onClick={handleNextPage}
              className='border border-primary-200 rounded px-5 py-1 hover:bg-primary-100'>Next</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminProduct