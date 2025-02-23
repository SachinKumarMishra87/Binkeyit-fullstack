import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from "react-hot-toast"
import AxiosToastError from "../utils/AxiosToastError"
import { FiExternalLink } from "react-icons/fi";
import isAdmin from '../utils/isAdmin'

function UserMenu({ close }) {
    const user = useSelector((state) => state?.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout
            })

            if (response.data.success) {
                if (close) {
                    close()
                }
                dispatch(logout())
                localStorage.clear()
                toast.success(response.data.message)
                navigate("/")
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const handleClose = () => {
        if (close) {
            close();
        }
    }

    return (
        <div>
            <div className='font-semibold'>My Account</div>
            <div className='text-sm flex items-center gap-2'>
                <span className='max-w-52 text-ellipsis line-clamp-1'>{user.name || user.mobail} <span className='text-medium text-red-600'>{user.role === "ADMIN" ? "(Admin)" : ""}</span></span>
                <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-blue-900'>
                    <FiExternalLink size={15} />
                </Link>
            </div>
            <Divider />
            <div className='text-sm grid gap-1 px-2'>
                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/category"}
                            className='p-0.5 hover:bg-orange-200 rounded-sm'>Category</Link>


                    )
                }

                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/subcategory"}
                            className='p-0.5 hover:bg-orange-200 rounded-sm'>Sub Category</Link>

                    )
                }


                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/upload-product"}
                            className='p-0.5 hover:bg-orange-200 rounded-sm'>Upload Product</Link>
                    )
                }

                {
                    isAdmin(user.role) && (
                        <Link onClick={handleClose} to={"/dashboard/admin-product"}
                            className='p-0.5 hover:bg-orange-200 rounded-sm'>Product</Link>
                    )
                }

                <Link onClick={handleClose} to={"/dashboard/myorders"}
                    className='p-0.5 hover:bg-orange-200 rounded-sm'>My Orders</Link>

                <Link onClick={handleClose} to={"/dashboard/address"}
                    className='p-0.5 hover:bg-orange-200 rounded-sm'>Save Address</Link>

                <button onClick={handleLogout} className='text-left p-0.5  hover:bg-orange-200 rounded-sm'>Log Out</button>
            </div>
        </div>
    )
}

export default UserMenu
