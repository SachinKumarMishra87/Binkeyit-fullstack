import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi"
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link } from "react-router-dom"

function ForgotPassword() {
  const [data, setData] = useState({
    email: ""
  });
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

    try {
      // This Axios coming from utils folder where set the axios baseURL
      const response = await Axios({
        ...SummaryApi.forgotPassword,
        data: data
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/verification-otp", {
          state: data
        })
        setData({
          email: "",
        })
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section className=' w-full container mx-auto px-2 '>
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 ">
        <p className='flex justify-center font-semibold text-gray-600'>Forgot Password</p>
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

          {/* Button */}
          <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 transition-all hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 -tracking-wide`}>Send Otp</button>

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

export default ForgotPassword
