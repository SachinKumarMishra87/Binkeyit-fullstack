import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi"
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link } from "react-router-dom"
import fetchUserDetails from "../utils/fetchUserDetails"
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';


function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      }
    })
  }

  // "When all fields are filled, the Submit Button background color will change."
  const validateValue = Object.values(data).every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // This Axios coming from utils folder where set the axios baseURL
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)

        localStorage.setItem('accessToken', response.data.date.accessToken)
        localStorage.setItem('refreshToken', response.data.date.refreshToken)

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))

        setData({
          email: "",
          password: "",
        })
        navigate("/")
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }


  return (
    <section className=' w-full container mx-auto px-2 '>
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 ">

        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>


          {/* Email */}
          <div className='grid gap-1'>
            <label htmlFor="email">Email : </label>
            <input
              type="email"
              id='email'
              placeholder='Enter your email..'
              className='bg-blue-50 p-2 border rounded focus:outline-none focus:border-blue-400'
              name='email'
              value={data.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className='grid gap-1'>
            <label htmlFor="password">Password : </label>
            <div className='bg-blue-50 p-2 border rounded focus-within:border-blue-400 flex items-center'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                placeholder='Enter your password..'
                className='w-full outline-none bg-transparent'
                name='password'
                value={data.password}
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
            <Link to={"/forgot-password"} className='block ml-auto hover:text-blue-950'>Forgot password ? </Link>
          </div>


          {/* Button */}
          <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 transition-all hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 -tracking-wide`}>Login</button>

        </form>

        <p className="text-sm text-gray-700">
          I don't have any account ?
          <Link
            to="/register"
            className="text-blue-900 font-semibold hover:text-blue-700 underline"
          >
            {""} Register
          </Link>
        </p>

      </div>
    </section>
  )
}

export default Login
