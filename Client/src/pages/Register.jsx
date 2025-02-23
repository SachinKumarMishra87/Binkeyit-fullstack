import React, { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi"
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link } from "react-router-dom"

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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

    if (data.password !== data.confirmPassword) {
      toast.error(
        "please confirm your password"
      )
      return
    }

    try {
      // This Axios coming from utils folder where set the axios baseURL
      const response = await Axios({
        ...SummaryApi.register,
        data: data
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: ""
        })
        navigate("/login")
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section className=' w-full container mx-auto px-2 '>
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 ">
        <p>Welcome to Blienkit</p>

        <form className='grid gap-4 mt-6' onSubmit={handleSubmit}>

          {/* Name */}
          <div className='grid gap-1'>
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              id='name'
              autoFocus
              placeholder='Enter your name..'
              className='bg-blue-50 p-2 border rounded focus:outline-none focus:border-blue-400'
              name='name'
              value={data.name}
              onChange={handleChange}
            />
          </div>

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
          </div>

          {/* Confirm Password */}
          <div className='grid gap-1'>
            <label htmlFor="confirmPassword">Confirm Password : </label>
            <div className='bg-blue-50 p-2 border rounded focus-within:border-blue-400 flex items-center'>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id='confirmPassword'
                placeholder='Confirm your password..'
                className='w-full outline-none bg-transparent'
                name='confirmPassword'
                value={data.confirmPassword}
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
          <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 transition-all hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 -tracking-wide`}>Register</button>

        </form>

        <p className="text-sm text-gray-700">
          Already have an account ?
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

export default Register
