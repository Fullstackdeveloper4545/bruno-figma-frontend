import React from 'react'
import Navbar from './Components/layout/Navbar'
import Footer from './Components/layout/Footer'
import ProductCard from './Components/UI/ProductCard'
import productImage from './assets/product-card-test-image.png'

const products = [
  {
    title: 'Adidas Adizero Boston 13 W',
    color: 'Branco e Rosa',
    price: '132€',
    oldPrice: '188€',
    discountLabel: '30% off',
    image: productImage,
  },
  {
    title: 'Adidas Adizero Takumi SEN 10 W',
    color: 'Azul',
    price: '135€',
    image: productImage,
  },
  {
    title: 'Adizero Adios Pro 4 W',
    color: 'Branco e Laranja',
    price: '97€',
    image: productImage,
  },
  {
    title: 'Adidas Adizero Boston 13 W',
    color: 'Branco e Rosa',
    price: '132€',
    oldPrice: '188€',
    discountLabel: '30% off',
    image: productImage,
  },
  {
    title: 'Adidas Adizero Takumi SEN 10 W',
    color: 'Azul',
    price: '135€',
    image: productImage,
  },
  {
    title: 'Adizero Adios Pro 4 W',
    color: 'Branco e Laranja',
    price: '97€',
    image: productImage,
  },
   {
    title: 'Adizero Adios Pro 4 W',
    color: 'Branco e Laranja',
    price: '97€',
    image: productImage,
  },
   {
    title: 'Adizero Adios Pro 4 W',
    color: 'Branco e Laranja',
    price: '97€',
    image: productImage,
  },
]

function ProductsPage() {
  return (
    <>
      <Navbar />
      <section className='mt-[4vh] mb-[10vh]'>
        <div className='w-[90vw] mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10'>
          <aside className='border-r border-black/10 pr-6 lg:sticky lg:top-6 lg:h-fit'>
            <div className='text-[13px] py-4 border-b border-black/10'>150 produtos</div>

            <details open className='py-4 border-b border-black/10'>
              <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                Categoria
                <span className='text-[12px]'>⌃</span>
              </summary>
              <div className='mt-4 space-y-3 text-[12px]'>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='h-4 w-4' />
                  Sapatilhas de Corrida
                </label>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='h-4 w-4' />
                  Sapatilhas de Corrida de Trail
                </label>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='h-4 w-4' />
                  Sapatilhas de Atletismo
                </label>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='h-4 w-4' />
                  Sapatilhas de Carbono
                </label>
              </div>
            </details>

            <details open className='py-4 border-b border-black/10'>
              <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                Gênero
                <span className='text-[12px]'>⌃</span>
              </summary>
              <div className='mt-4 space-y-3 text-[12px]'>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='h-4 w-4' />
                  Mulher
                </label>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='h-4 w-4' />
                  Homem
                </label>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='h-4 w-4' />
                  Unisexo
                </label>
              </div>
            </details>

            <details open className='py-4 border-b border-black/10'>
              <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                Tamanho
                <span className='text-[12px]'>⌃</span>
              </summary>
              <div className='mt-4 grid grid-cols-3 gap-2 text-[12px]'>
                {['36', '38', '40', '42', '44', '46', '48', '50'].map((size) => (
                  <button
                    key={size}
                    className='border border-black/10 py-2 focus:bg-black focus:text-white focus:border-black'
                  >
                    {size}
                  </button>
                ))}
              </div>
            </details>

            <details open className='py-4 border-b border-black/10'>
              <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                Cor
                <span className='text-[12px]'>⌃</span>
              </summary>
              <div className='mt-4 grid grid-cols-3 gap-4 text-[11px]'>
                {[
                  { name: 'Preto', color: '#111111' },
                  { name: 'Azul', color: '#1f4f8f' },
                  { name: 'Castanho', color: '#9a5b2a' },
                  { name: 'Verde', color: '#5f6b4f' },
                  { name: 'Cinzento', color: '#d9d9d9', ring: true },
                  { name: 'Laranja', color: '#d8892b' },
                  { name: 'Rosa', color: '#f0c7bd' },
                  { name: 'Vermelho', color: '#c62828' },
                  { name: 'Bege', color: '#b8a892' },
                ].map((c) => (
                  <button key={c.name} className='flex flex-col items-center gap-2'>
                    <span
                      className={`h-6 w-6 rounded-full ${c.ring ? 'ring-1 ring-black/10' : ''}`}
                      style={{ backgroundColor: c.color }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
                <button className='text-left col-span-3 text-[11px] text-black/60'>Ver mais +</button>
              </div>
            </details>

            <details open className='py-4'>
              <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                Marcas
                <span className='text-[12px]'>⌃</span>
              </summary>
              <div className='mt-4 space-y-3 text-[12px]'>
                {['Adidas', 'Asics', 'Nike', 'Hoka', 'Puma', 'New Balance', 'Garmin', 'Brooks'].map((brand) => (
                  <label key={brand} className='flex items-center gap-3'>
                    <input type='checkbox' className='h-4 w-4' />
                    {brand}
                  </label>
                ))}
              </div>
            </details>
          </aside>

          <div className='lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto lg:pr-2'>
            <div className='mb-4'>
              <p className='text-[12px] text-black/60'>Home / Sapatilhas</p>
              <h1 className='text-[32px] font-semibold'>Sapatilhas</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
              {products.map((product, index) => (
                <ProductCard
                  key={`${product.title}-${index}`}
                  image={product.image}
                  title={product.title}
                  color={product.color}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  discountLabel={product.discountLabel}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default ProductsPage
