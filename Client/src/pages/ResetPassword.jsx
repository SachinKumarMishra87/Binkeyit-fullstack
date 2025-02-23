import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';



function ResetPassword() {
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateValue = Object.values(data).every(el => el)


    useEffect(() => {
        if (!(location?.state?.data?.success)) {
            navigate("/")
        }

        if (location?.state?.email) {
            setData((prev) => {
                return {
                    ...prev,
                    email: location?.state?.email
                }
            })
        }
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target

        setData((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // This Axios coming from utils folder where set the axios baseURL
            const response = await Axios({
                ...SummaryApi.resetPassword,
                data: data
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message)
                navigate("/login")
                setData({
                    email: "",
                    newPassword: "",
                    confirmPasswprd: ""
                })
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className=' w-full container mx-auto px-2 '>
            <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 ">
                <p className='flex justify-center font-semibold text-gray-600'>Enter Your Password</p>
                <form className='grid gap-4 py-4' onSubmit={handleSubmit}>


                    {/* Email */}
                    <div className='grid gap-1 '>
                        <label htmlFor="email">Email : </label>
                        <div className='flex justify-between items-center bg-blue-50 p-2 border rounded focus:outline-none focus:border-blue-400 w-full'>
                            <input
                                type="email"
                                id='email'
                                className='bg-transparent outline-none w-full'
                                name='email'
                                value={data.email || ""}
                                readOnly
                            />
                        </div>

                        {/* New Password */}

                        <label htmlFor="newPassword" className='mt-2'>New Password : </label>
                        <div className='flex justify-between items-center bg-blue-50 p-2 border rounded focus:outline-none focus:border-blue-400 w-full'>
                            <input
                                type={showPassword ? "text" : "password"}
                                id='newPassword'
                                placeholder='Enter your Password..'
                                className='bg-transparent outline-none'
                                name='newPassword'
                                value={data.newPassword || ""} // Fallback
                                onChange={handleChange}
                            />
                            <div onClick={() => setShowPassword(prevV => !prevV)} className='cursor-pointer'>
                                {
                                    showPassword ? (
                                        <FaEye />
                                    ) : (
                                        <FaEyeSlash />
                                    )
                                }
                            </div>
                        </div>

                        {/* confirm password */}

                        <label htmlFor="confirmPasswprd" className='mt-2'>Confirm Password : </label>
                        <div className='flex justify-between items-center bg-blue-50 p-2 border rounded focus:outline-none focus:border-blue-400 w-full'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id='confirmPassword'
                                placeholder='Confirm Your Password..'
                                className='bg-transparent outline-none'
                                name='confirmPassword'
                                value={data.confirmPassword || ""} // Fallback
                                onChange={handleChange}
                            />
                            <div onClick={() => setShowConfirmPassword(prevV => !prevV)} className='cursor-pointer'>
                                {
                                    showConfirmPassword ? (
                                        <FaEye />
                                    ) : (
                                        <FaEyeSlash />
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    {/* Button */}
                    <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 transition-all hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 -tracking-wide`}>Change Password</button>

                </form>

                <p className="text-sm text-gray-700">
                    Already have account ?
                    <Link
                        to="/login"
                        className="text-blue-900 font-semibold hover:text-blue-700 underline"
                    >
                        {""} Login
                    </Link>
                </p>

            </div>
        </section>
    )
}

export default ResetPassword
