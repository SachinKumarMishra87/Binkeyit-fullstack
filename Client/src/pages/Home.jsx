import React from 'react'
import desktopBanner from "../assets/banner.jpg"
import mobileBanner from "../assets/banner-mobile.jpg"
import { useSelector } from 'react-redux'
import { validURLConverter } from '../utils/validURLConverter'
import { Link, useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

function Home() {

    const loadingCategory = useSelector(state => state.product.loadingCategory)
    const categoryData = useSelector(state => state.product.allCategory)
    const subcCategoryData = useSelector(state => state.product.allSubCategory)

    const navigate = useNavigate();

    const handleRedirectProductListPage = (id, cat) => {

        const subCategory = subcCategoryData.find(sub => {
            const filterData = sub.category.some(c => {
                return c._id == id
            })

            return filterData ? true : null
        })

        const url = `/${validURLConverter(cat)}-${id}/${validURLConverter(subCategory?.name)}-${subCategory?._id}`
        navigate(url)
    }



    return (
        <section key={"hgdbdgb"} className='bg-white'>
            <div className=" container mx-auto">
                <Link to={"/search"} className={`w-full h-full min-h-48 rounded bg-blue-100 ${!desktopBanner && "animate-pulse my-2"} `}>
                    {/* For Desktop */}
                    <img
                        src={desktopBanner}
                        alt="banner"
                        className='w-full h-full hidden lg:block'
                    />
                    {/* For Mobile */}
                    <img
                        src={mobileBanner}
                        alt="banner"
                        className='w-full h-full lg:hidden '
                    />
                </Link>
            </div>

            <div className="container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-9 gap-2">
                {
                    loadingCategory ? (
                        new Array(12).fill(null).map((c, index) => {
                            return (
                                <div key={index} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                                    <div className="bg-blue-100 min-h-24 rounded"></div>
                                    <div className="bg-blue-100 h-8 rounded"></div>
                                </div>
                            )
                        })
                    ) : (
                        categoryData.map((cat, index) => {
                            return (
                                <div key={cat._id || index} className="w-full h-full" onClick={() => handleRedirectProductListPage(cat._id, cat.name)}>
                                    <div>
                                        <img
                                            src={cat.image}
                                            alt={cat.name}
                                            className='w-full h-full object-scale-down cursor-pointer'
                                        />
                                    </div>
                                </div>
                            )
                        })

                    )
                }
            </div>

            {/* Display Category wise Product */}
            {
                categoryData.map((c, index) => {
                    return (
                        <CategoryWiseProductDisplay
                            key={c?._id || index}
                            id={c?._id}
                            name={c?.name} />
                    )
                })
            }


        </section>
    )
}

export default Home
