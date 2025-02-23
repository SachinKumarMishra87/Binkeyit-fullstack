import React from 'react'
import NoDataImage from '../assets/nothing_here_yet.webp'

const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center p-4 gap-2'>
        <img src={NoDataImage} alt="NoData" 
        className='w-60 '
        />
        <p className='text-neutral-500 text-xl'>No Data Found</p>
    </div>
  )
}

export default NoData