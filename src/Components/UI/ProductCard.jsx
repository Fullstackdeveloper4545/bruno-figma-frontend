import React from 'react'
import productImage from '../../assets/product-card-test-image.png';

const ProductCard = () => {
    return (
        <>
            <div className='w-7/12 pb-20'>
                <div className='pb-10'>
                    <img src={productImage} alt="Product" />
                </div>
                <div className='flex justify-between w-full text-[12px]'>
                    <div>
                        <p>Asics Superblast 2</p>
                        <p className='text-[var(--grey-light-active)]'>Verde Vital e Preto</p>
                    </div>
                    <div>
                        <p>00€</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductCard