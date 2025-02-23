import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Axios from '../utils/Axios'
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError"
import { updateAvtar } from "../store/userSlice";
import { IoCloseSharp } from "react-icons/io5";

const UserProfileAvtarEdit = ({ close }) => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleUploadAvtarImg = async (e) => {
        const file = e.target.files[0];

        if (!file) {
            return
        }

        const formData = new FormData()
        formData.append('avtar', file)
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.uploadAvtar,
                data: formData
            })
            const { data: responseData } = response
            dispatch(updateAvtar(responseData.data.avtar))

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center">
            <div className="bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center">
                <div className="text-neutral-800 w-fit block ml-auto">
                    <IoCloseSharp onClick={close} size={22} />
                </div>
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
                <form onSubmit={handleSubmit}>
                    <label htmlFor="uploadProfile">

                        <div className="border border-blue-600 hover:bg-primary-200 px-4 py-1 rounded text-sm my-3 cursor-pointer">
                            {
                                loading ? "Loading..." : "Upload"
                            }
                        </div>
                    </label>
                    <input onChange={handleUploadAvtarImg} type="file" id="uploadProfile" className="hidden" />
                </form>
            </div>
        </section>
    )
}

export default UserProfileAvtarEdit