import React from 'react'

function StoreCard({ image, title }) {
  return (
    <div className='w-[28vw] min-w-[280px] max-w-none'>
      <div className='w-full h-[720px] overflow-hidden'>
        <img className='w-full h-full object-cover grayscale' src={image} alt={title} />
      </div>
      <p className='text-center text-[22px] mt-3'>{title}</p>
    </div>
  )
}

export default StoreCard
