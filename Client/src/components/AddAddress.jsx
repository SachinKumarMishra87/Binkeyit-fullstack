import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useForm } from "react-hook-form";
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { useGlobalContext } from '../provider/GlobalProvider';


const AddAddress = ({ close }) => {

    const { register, handleSubmit, reset } = useForm();
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async (data) => {
        console.log(data)
        try {
            const response = await Axios({
                ...SummaryApi.createAddress,
                data: {
                    address_line: data.addressline,
                    city: data.city,
                    state: data.state,
                    pincode: data.pincode,
                    country: data.country,
                    mobail: data.mobile
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                fetchAddress()
                if (close) {
                    close()
                    reset()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

    return (
        <section className='fixed bg-neutral-900 top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50 p-4 h-screen overflow-auto'>
            <div className="bg-white p-4 w-full max-w-lg mt-10 mx-auto rounded">
                <div className=" flex justify-between gap-4 items-center">
                    <h2 className='font-semibold'>Add Address</h2>
                    <IoCloseSharp onClick={close} size={25} />
                </div>
                <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-3">
                        {/* Address */}
                        <div className="grid gap-1">
                            <label htmlFor="addressline" className="text-gray-700 font-medium">
                                Address Line :
                            </label>
                            <input
                                type="text"
                                id="addressline"
                                placeholder="Enter your address"
                                className="w-full text-sm px-3 py-2 bg-blue-50 border border-gray-300 rounded outline-none focus:border-blue-700"
                                {...register("addressline", { required: true })}
                            />
                        </div>

                        {/* City */}
                        <div className="grid gap-1">
                            <label htmlFor="addressCity" className="text-gray-700 font-medium">
                                City :
                            </label>
                            <input
                                type="text"
                                id="addressCity"
                                placeholder="Enter your city"
                                className="w-full text-sm px-3 py-2 bg-blue-50 border border-gray-300 rounded outline-none"
                                {...register("city", { required: true })}
                            />
                        </div>

                        {/*State  */}
                        <div className="grid gap-1">
                            <label htmlFor="addressState" className="text-gray-700 font-medium">
                                State :
                            </label>
                            <input
                                type="text"
                                id="addressState"
                                placeholder="Enter your state"
                                className="w-full text-sm px-3 py-2 bg-blue-50 border border-gray-300 rounded outline-none"
                                {...register("state", { required: true })}
                            />
                        </div>

                        {/*Pincode  */}
                        <div className="grid gap-1">
                            <label htmlFor="addressPincode" className="text-gray-700 font-medium">
                                Pincode :
                            </label>
                            <input
                                type="text"
                                id="addressPincode"
                                placeholder="Enter your pincode"
                                className="w-full text-sm px-3 py-2 bg-blue-50 border border-gray-300 rounded outline-none"
                                {...register("pincode", { required: true })}
                            />
                        </div>

                        {/*Country  */}
                        <div className="grid gap-1">
                            <label htmlFor="addressCountry" className="text-gray-700 font-medium">
                                Country :
                            </label>
                            <input
                                type="text"
                                id="addressCountry"
                                placeholder="Enter your country"
                                className="w-full text-sm px-3 py-2 bg-blue-50 border border-gray-300 rounded outline-none"
                                {...register("country", { required: true })}
                            />
                        </div>

                        {/*Mobile Number */}
                        <div className="grid gap-1">
                            <label htmlFor="addressMobileNo" className="text-gray-700 font-medium">
                                Mobile No. :
                            </label>
                            <input
                                type="number"
                                id="addressMobileNo"
                                placeholder="Enter your mobile number"
                                className="w-full text-sm px-3 py-2 bg-blue-50 border border-gray-300 rounded outline-none"
                                {...register("mobile", { required: true })}
                            />
                        </div>

                        <button className='py-2 px-4 bg-green-600 hover:bg-green-700 transition-all duration-100 ease-in-out text-white font-semibold rounded'>
                            Submit
                        </button>

                    </div>

                </form>
            </div>
        </section>
    )
}

export default AddAddress