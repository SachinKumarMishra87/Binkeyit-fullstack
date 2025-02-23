import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from "../common/SummaryApi"
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate, Link, useLocation } from "react-router-dom"

function varifyForgotPasswordOtp() {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

console.log
  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password")
    }
  }, [])
  // "When all fields are filled, the Submit Button background color will change."
  const validateValue = data.every(el => el)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // This Axios coming from utils folder where set the axios baseURL
      const response = await Axios({
        ...SummaryApi.varifyForgotPasswordOtp,
        data: {
          otp: data.join(""),
          email: location?.state?.email
        }
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }

      if (response.data.success) {
        toast.success(response.data.message)
        setData(["", "", "", "", "", ""])
        navigate("/reset-password", {
          state: {
            data: response.data,
            email: location?.state?.email
          }
        })
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className=' w-full container mx-auto px-2 '>
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7 ">
        <form className='grid gap-4 py-4' onSubmit={handleSubmit}>

          {/* Otp */}
          <div className='grid gap-1'>
            <label htmlFor="otp">Enter Your OTP : </label>
            <div className='flex items-center gap-2 justify-between mt-3'>
              {
                data.map((element, index) => {
                  return (
                    <input
                      key={index}
                      type="text"
                      id='otp'
                      ref={(ref) => {
                        inputRef.current[index] = ref
                        return ref
                      }}
                      maxLength={1}
                      value={data[index]}
                      onChange={(e) => {
                        const value = e.target.value

                        const newData = [...data]
                        newData[index] = value
                        setData(newData)

                        if (value && index < 5) {
                          inputRef.current[index + 1].focus()
                        }
                      }}
                      className='bg-blue-50 w-full max-w-16 p-2 border rounded focus:outline-none focus:border-blue-400 text-center font-semibold'
                    />
                  )
                })
              }
            </div>

          </div>

          {/* Button */}
          <button disabled={!validateValue} className={`${validateValue ? "bg-green-800 transition-all hover:bg-green-700" : "bg-gray-500"}  text-white py-2 rounded font-semibold my-3 -tracking-wide`}>Verify OTP</button>

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

export default varifyForgotPasswordOtp
