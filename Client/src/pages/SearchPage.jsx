import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import CardProduct from '../components/CardProduct'
import InfiniteScroll from "react-infinite-scroll-component"
import { useLocation } from 'react-router-dom'
import NoData from '../components/NoData'

function SearchPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const loadingArrayCard = new Array(12).fill(null)
  const [page, setPage] = useState(1);
  const [totalpage, setTotalPage] = useState(1);
  const params = useLocation();
  const searchText = params?.search?.slice(3);

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.searchProduct,
        data: {
          search: searchText,
          page: page
        }
      })
      const { data: responseData } = response
      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData((preve) => {
            return [
              ...preve,
              ...responseData.data
            ]
          })
        }
        setTotalPage(responseData.totalPage)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, [page, searchText])


  const handleFetchMore = () => {
    if (totalpage > page) {
      setPage(preve => preve + 1)
    }
  }

  return (
    <section className='bg-white'>
      <div className=" container mx-auto p-4">
        <p className='font-semibold'>Search Results: {data.length}</p>
        <InfiniteScroll
          dataLength={data.length}
          hasMore={true}
          next={handleFetchMore}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4">


            {
              data.map((p, index) => {
                return (
                  <CardProduct data={p} key={p._id + index + "searchProduct"} />
                )
              })

            }

            {/* Loading Data */}
            {
              loading && (
                loadingArrayCard.map((_, index) => {
                  return (
                    <CardLoading key={"loadingSearchpage" + index} />
                  )
                })
              )
            }
          </div>
        </InfiniteScroll>
        {
          // No Data
          !data[0] && !loading && (
            <NoData/>
          )
        }
      </div>
    </section>
  )
}

export default SearchPage
