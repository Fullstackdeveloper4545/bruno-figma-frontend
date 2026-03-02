import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Components/layout/Navbar'
import Footer from './Components/layout/Footer'

const ThankYouPage = () => {
  const items = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=400&q=80',
    },
  ]

  return (
    <>
    <Navbar/>
    <section className='bg-white min-h-[70vh] font-["Poppins",sans-serif]'>
      <div className='pt-16 pb-12 text-center px-4'>
        <h1 className='m-0 text-[58px] font-medium leading-none text-[#111111]'>
          OBRIGADO PELA SUA ENCOMENDA!
        </h1>
        <p className='mt-6 mb-0 text-[14px] text-[#111111] tracking-[0.2px]'>
          Confirme o seu pagamento e os seus itens serao preparados para envio.
        </p>
      </div>

      <div className='bg-[#7399a5] py-12'>
        <div className='flex items-center justify-center gap-4 px-4'>
          {items.map((item) => (
              <div key={item.id} className='w-[132px] h-[100px] bg-[#f1f1f1] overflow-hidden'>
              <img src={item.image} alt='Produto' className='w-full h-full object-cover' />
            </div>
          ))}
        </div>
        <p className='m-0 mt-5 text-center text-[10px] text-white tracking-[2px]'>2 ITENS</p>
      </div>

      <div className='py-16 flex justify-center px-4'>
        <Link
          to='/'
          className='w-full max-w-[328px] bg-[#242529] text-white text-[10px] tracking-[1px] py-3 text-center'
          >
          VOLTAR À LOJA
        </Link>
      </div>
    </section>
    <Footer/>
            </>
  )
}

export default ThankYouPage
