import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import UserProfileAvtarEdit from '../components/UserProfileAvtarEdit';
import SummaryApi from "../common/SummaryApi"
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';

const Profile = () => {
  const user = useSelector(state => state.user)
  const [openProfileAvtarEdit, setOpenProfileAvtarEdit] = useState(false)
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobail: user.mobail

  })

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      mobail: user.mobail
    })
  }, [user])

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setUserData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.updateUsersDetails,
        data: userData
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data))
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='p-4 '>
      {/* Profile upload and display img */}
      <div className='w-14 h-14 bg-red-500 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm cursor-pointer'>
        {
          user.avtar ? (
            <img
              src={user.avtar}
              alt="User Avatar"
              className='w-full h-full'
            />
          ) : (
            <FaRegCircleUser size={52} />
          )
        }

      </div>
      <button
        onClick={() => setOpenProfileAvtarEdit(true)}
        className='text-sm min-w-[14] border px-3 py-1 rounded-full mt-3 border-primary-100 hover:bg-primary-200 hover:text-white'>Edit</button>

      {
        openProfileAvtarEdit && (
          <UserProfileAvtarEdit close={() => setOpenProfileAvtarEdit(false)} />
        )
      }

      {/* name ,mobile ,email ,change password*/}
      <form className='my-4 grid gap-4' onSubmit={handleSubmit}>
        <div className='grid'>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id='name'
            name='name'
            placeholder='Enter your name'
            className='p-2 bg-blue-50 outline-none border focus-within:border-blue-300 rounded'
            value={userData.name}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className='grid'>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id='email'
            name='email'
            placeholder='Enter your email'
            className='p-2 bg-blue-50 outline-none border focus-within:border-blue-300 rounded'
            value={userData.email}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className='grid'>
          <label htmlFor="mobile">Mobile: </label>
          <input
            type="number"
            id='mobile'
            name='mobail'
            placeholder='Enter your mobile number'
            className='p-2 bg-blue-50 outline-none border focus-within:border-blue-300 rounded'
            value={userData.mobail}
            onChange={handleOnChange}
            required
          />
        </div>
        <button className='border px-4 py-2 font-semibold transition-all duration-200 ease-in-out bg-green-500 hover:bg-green-600 rounded text-neutral-800'>
          {
            loading ? "Loading..." : "Submit"
          }
        </button>
      </form>
    </div>
  )
}

export default Profile