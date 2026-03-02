import React from 'react'
import productImage from '../../assets/product-card-test-image.png'

const ProductCard = ({
  image = productImage,
  title = 'Asics Superblast 2',
  color = 'Verde Vital e Preto',
  price = '00€',
  oldPrice,
  discountLabel,
}) => {
  return (
    <div className='w-full pb-12'>
      <div className='relative pb-8'>
        {discountLabel && (
          <span className='absolute top-0 left-0 text-[12px] text-red-500'>{discountLabel}</span>
        )}
        <img src={image} alt={title} className='w-full' />
      </div>
      <div className='flex justify-between w-full text-[12px]'>
        <div>
          <p>{title}</p>
          <p className='text-[var(--grey-light-active)]'>{color}</p>
        </div>
        <div className='text-right'>
          {oldPrice && (
            <p className='text-[11px] line-through text-[var(--grey-light-active)]'>{oldPrice}</p>
          )}
          <p>{price}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
