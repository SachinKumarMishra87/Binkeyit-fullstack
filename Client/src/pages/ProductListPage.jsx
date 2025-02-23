import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from "react-redux"
import { validURLConverter } from '../utils/validURLConverter'

const ProductListPage = () => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [totalPage, setTotalPage] = useState(1)
    const params = useParams()
    const allSubCategory = useSelector(state => state.product.allSubCategory)
    const [DisplaySubCategory, setDisplaySubCategory] = useState([])

    const subCategory = params?.subCategory.split("-");
    const subCategoryName = subCategory?.slice(0, subCategory?.length - 1).join(" ")

    const categoryId = params.category.split("-").slice(-1)[0];
    const subCategoryId = params.subCategory.split("-").slice(-1)[0];

    const fetchProductData = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getProductByCategoryAndSubcategory,
                data: {
                    categoryId: categoryId,
                    subCategoryId: subCategoryId,
                    page: page,
                    limit: 10
                }
            })

            const { data: responseData } = response;
            if (responseData.success) {
                if (responseData.page == 1) {
                    setData(responseData.data)
                } else {
                    setData([...data, ...responseData.data])
                }

                setTotalPage(responseData.totalCount)
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProductData();
    }, [params])

    useEffect(() => {
        const sub = allSubCategory.filter(s => {
            const filterData = s.category.some(el => {
                return el._id === categoryId
            })

            return filterData ? filterData : null
        })
        setDisplaySubCategory(sub)
    }, [params, allSubCategory])


    return (
        <section className=' sticky top-24 lg:top-20'>
            <div className="container sticky top-24 mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]">
                {/* sub category */}
                <div
                    className="min-h-[80vh] max-h-[80vh] overflow-y-scroll  grid gap-1 shadow-md bg-white py-2 scrollBarCustom">
                    <div>
                        {
                            DisplaySubCategory.map((s, index) => {

                                const link = `/${validURLConverter(s?.category[0].name)}-${s?.category[0]._id}/${validURLConverter(s?.name)}-${s?._id}`


                                return (
                                    <Link to={link}
                                        key={s._id + index + "DisplaySubCategory"}
                                        className={`w-full p-1 lg:p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer
                   ${subCategoryId === s._id ? "bg-green-100" : ""}`
                                        }>
                                        <div className="w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border">
                                            <img
                                                src={s.image}
                                                alt={s.name}
                                                className='w-14 lg:h-14 lg:w-12 h-full object-scale-down'
                                            />
                                        </div>
                                        <p
                                            className='lg:mt-0 text-xs text-center lg:text-left lg:text-base'
                                        >{s.name}</p>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>

                {/* product */}
                <div className=" min-h-[80vh] max-h-[80vh] ">
                    <div className=" sticky bg-white shadow-md p-4 z-10">
                        <h3 className='font-semibold'>{subCategoryName}</h3>
                    </div>
                    <div className=" min-h-[74vh] max-h-[74vh] md:min-h-[72vh] md:max-h-[72vh] lg:min-h-[72vh] lg:max-h-[72vh]  overflow-y-scroll scrollBarCustom">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
                            {
                                data.map((p, index) => {
                                    return (
                                        <CardProduct
                                            data={p}
                                            key={p?._id || index}
                                        />

                                    )
                                })
                            }
                        </div>

                        {
                            loading && (
                                <Loading />
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ProductListPage