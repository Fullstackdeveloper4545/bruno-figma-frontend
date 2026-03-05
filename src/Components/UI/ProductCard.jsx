import React from 'react'
import { Link } from 'react-router-dom'
import productImage from '../../assets/product-card-test-image.png'

const ProductCard = ({
  image = productImage,
  title = 'Asics Superblast 2',
  color = 'Verde Vital e Preto',
  price = '00 EUR',
  oldPrice,
  discountLabel,
  to,
}) => {
  const cardContent = (
    <>
      <div className='relative pb-8'>
        {discountLabel ? (
          <span className='absolute top-0 left-0 text-[12px] text-red-500'>{discountLabel}</span>
        ) : null}
        <img src={image} alt={title} className='w-full' />
      </div>
      <div className='flex justify-between w-full text-[12px]'>
        <div className='min-w-0'>
          <p className='truncate'>{title}</p>
          <p className='truncate text-[var(--grey-light-active)]'>{color}</p>
        </div>
        <div className='text-right'>
          {oldPrice ? (
            <p className='text-[11px] line-through text-[var(--grey-light-active)]'>{oldPrice}</p>
          ) : null}
          <p>{price}</p>
        </div>
      </div>
    </>
  )

  if (to) {
    return (
      <Link to={to} className='block w-full pb-12 cursor-pointer' aria-label={`Open ${title}`}>
        {cardContent}
      </Link>
    )
  }

  return <div className='w-full pb-12'>{cardContent}</div>
}

export default ProductCard
