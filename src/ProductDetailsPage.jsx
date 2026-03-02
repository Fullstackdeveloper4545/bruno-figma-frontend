import React, { useState } from 'react'
import Navbar from './Components/layout/Navbar'
import Footer from './Components/layout/Footer'
import productImage from './assets/product-card-test-image.png'
import ProductCard from './Components/UI/ProductCard'
import IconEntrega from './assets/image4.png'
import IconDevolucao from './assets/image5.png'

function ProductDetailsPage() {
  const [selectedColor, setSelectedColor] = useState('coral')
  const [quantity, setQuantity] = useState(1)

  return (
    <>
      <Navbar />
      <section className='mt-[6vh] mb-[10vh]'>
        <div className='w-[90vw] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='border border-black/5 flex items-center justify-center'>
              <img src={productImage} alt='Adidas Adizero Boston 13 W' className='w-full' />
            </div>
            <div className='border border-black/5 flex items-center justify-center'>
              <img src={productImage} alt='Adidas Adizero Boston 13 W' className='w-full' />
            </div>
            <div className='border border-black/5 flex items-center justify-center'>
              <img src={productImage} alt='Adidas Adizero Boston 13 W' className='w-full' />
            </div>
            <div className='border border-black/5 flex items-center justify-center'>
              <img src={productImage} alt='Adidas Adizero Boston 13 W' className='w-full' />
            </div>
          </div>

          <div>
            <p className='text-[12px] text-black/60'>Sapatilhas | Sapatilhas de Corrida</p>
            <div className='flex items-start justify-between gap-4 mt-2'>
              <h1 className='text-[24px] font-semibold whitespace-nowrap'>Adidas Adizero Boston 13 W</h1>
              <div className='text-right flex gap-4'>
                <p className='text-[24px] line-through text-black/40'>238€</p>
                <p className='text-[24px] font-semibold'>167€</p>
              </div>
            </div>

            <div className='mt-6'>
              <div className='flex items-center justify-between'>
                <span className='text-[12px] font-semibold'>Tamanhos</span>
                <button className='text-[11px] text-black/60'>Guia de Tamanhos</button>
              </div>
              <div className='mt-3 grid grid-cols-6 gap-2 text-[11px]'>
                {['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47'].map((size) => (
                  <button
                    key={size}
                    className='border border-black/10 py-2 focus:bg-black focus:text-white focus:border-black'
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className='mt-6'>
              <span className='text-[12px] font-semibold'>Cor</span>
              <div className='mt-3 flex items-center gap-3'>
                {[
                  { id: 'coral', color: '#c98d7c' },
                  { id: 'aqua', color: '#7fd0d8' },
                  { id: 'orange', color: '#f16f5b' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    className={`h-6 w-6 rounded-full border ${
                      selectedColor === c.id ? 'ring-2 ring-black ring-offset-2' : 'border-black/10'
                    }`}
                    style={{ backgroundColor: c.color }}
                    aria-label={`Cor ${c.id}`}
                  />
                ))}
              </div>
            </div>

            <div className='mt-6 flex items-center justify-between border border-black/10'>
              <button
                className='px-4 py-2 text-[14px]'
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
              <span className='text-[12px]'>{quantity}</span>
              <button
                className='px-4 py-2 text-[14px]'
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
            </div>

            <button className='mt-4 w-full bg-black text-white py-3 text-[12px] tracking-[2px]'>COMPRAR</button>

            <div className='mt-6 space-y-4 text-[12px]'>
              <div className='flex items-start gap-3'>
                <img className='h-8 w-8' src={IconEntrega} alt='Entregas grátis' />
                <div>
                  <p className='font-semibold text-[14px]'>Entregas grátis</p>
                  <p className='text-black/60'>Em encomendas acima de 100€</p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <img className='h-8 w-8' src={IconDevolucao} alt='Devoluções' />
                <div>
                  <p className='font-semibold text-[14px]'>Devoluções</p>
                  <p className='text-black/60'>Devoluções simples e rápidas</p>
                </div>
              </div>
            </div>

            <div className='mt-8'>
              <h3 className='text-[13px] font-semibold'>Descrição de Produto</h3>
              <p className='text-[12px] text-black/70 mt-3'>
                hendrerit ultrices amet, massa tincidunt laoreet varius nisl, quis dui. id gravida ex Lorem viverra
                risus consectetur non, ex. in urna ipsum hendrerit sit eu
              </p>
              <p className='text-[12px] text-black/70 mt-3'>
                Ex. sapien odio nisl. lobortis, elementum fringilla Praesent porta nisl. dui Donec elit. lacus Nunc ex
                facilisis una. sit maximus ex commodo turpis amet, dui
              </p>
              <p className='text-[12px] text-black/70 mt-3'>
                cursus venenatis Ut sit tincidunt faucibus quis Quisque Nullam orci Donec luctus Nullam malesuada ipsum
                felis, gravida Nam sapien fringilla urna. scelerisque
              </p>
            </div>
          </div>
        </div>

        <div className='w-[90vw] mx-auto mt-12'>
          <details className='border-t border-black/10 py-4'>
            <summary className='cursor-pointer text-[16px] font-semibold flex items-center justify-between'>
              Descrição
              <span className='text-[14px]'>⌄</span>
            </summary>
          </details>
          <details className='border-t border-black/10 py-4'>
            <summary className='cursor-pointer text-[16px] font-semibold flex items-center justify-between'>
              Detalhes
              <span className='text-[14px]'>⌄</span>
            </summary>
          </details>
          <details className='border-t border-b border-black/10 py-4'>
            <summary className='cursor-pointer text-[16px] font-semibold flex items-center justify-between'>
              Tecnologia
              <span className='text-[14px]'>⌄</span>
            </summary>
          </details>
        </div>
      </section>

      <div className='w-[90vw] mx-auto mt-14'>
          <h3 className='text-[16px] font-semibold mb-6'>Produtos Recomendados</h3>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {[
              { title: 'Asics Superblast 2', color: 'Verde Vital e Preto' },
              { title: 'Hoka Mach 6 W - JTL', color: 'Verde' },
              { title: 'Adizero Takumi SEN 10 W', color: 'Azul' },
              { title: 'Adizero Adios Pro 4 W', color: 'Branco e Laranja' },
            ].map((p, idx) => (
              <ProductCard key={idx} title={p.title} color={p.color} price='00?' image={productImage} />
            ))}
          </div>
        </div>
      <Footer />
    </>
  )
}

export default ProductDetailsPage
