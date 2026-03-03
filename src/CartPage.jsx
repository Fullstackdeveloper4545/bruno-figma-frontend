import React from 'react'
import Navbar from './Components/layout/Navbar';
import Footer from './Components/layout/Footer';

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: 'Adizero Takumi SEN 10 W',
      color: 'Azul',
      qty: 1,
      price: '50,00€',
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 2,
      name: 'Adizero Adios Pro 4 W',
      color: 'Branco e Laranja',
      qty: 1,
      price: '50,00 €',
      image:
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <>
      <Navbar />

      <section className='bg-white min-h-[520px] px-5 pt-[34px] pb-6 font-["Poppins",sans-serif]'>
        <div className='max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-9 items-start'>
          <div className='lg:pr-7 lg:border-r lg:border-[#e1e1e1]'>
            <div className='flex items-end gap-2.5 mb-[22px]'>
              <h1 className='m-0 text-[32px] leading-[1.05] tracking-[0.25px] font-medium text-[#111111]'>
                CARRINHO
              </h1>
              <span className='mb-1 text-[#9ca3af] text-[12px] font-medium'>(2 produtos)</span>
            </div>

            <div className='grid gap-[22px] mb-[62px]'>
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className='grid grid-cols-[22px_80px_1fr_auto] items-center gap-x-3'
                >
                  <button
                    type='button'
                    className='border-0 bg-transparent text-[#a1a1aa] text-[17px] leading-none p-0 cursor-pointer'
                    aria-label='Remover item'
                  >
                    x
                  </button>

                  <div className='w-20 h-[62px] bg-[#f4f4f5] overflow-hidden'>
                    <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                  </div>

                  <div className='grid gap-1.5 min-w-0'>
                    <h2 className='m-0 text-[13px] font-normal text-[#202020] leading-[1.3]'>{item.name}</h2>
                    <p className='m-0 text-[12px] text-[#9aa3af]'>{item.color}</p>
                  </div>

                  <div className='flex items-center gap-[18px]'>
                    <span className='w-6 h-6 rounded-full border border-[#b7b7b7] text-[#6b7280] inline-flex items-center justify-center text-[13px]'>
                      {item.qty}
                    </span>
                    <span className='text-[22px] font-normal text-[#1f1f1f] tracking-[0.2px]'>
                      {item.price}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            <div className='max-w-[500px]'>
              <p className='m-0 mb-2 text-[12px] tracking-[0.3px] text-[#222]'>
                Tem um cupao? Insira o seu codigo.
              </p>
              <div className='flex items-center gap-2.5'>
                <input
                  type='text'
                  placeholder='Codigo de cupao'
                  className='w-full max-w-[240px] border-0 border-b border-[#c7c7c7] text-[11px] py-1.5 outline-none bg-transparent'
                />
                <button
                  type='button'
                  className='border-0 bg-[#212326] text-white text-[10px] tracking-[0.8px] py-[7px] px-4 cursor-pointer'
                >
                  APLICAR
                </button>
              </div>
            </div>
          </div>

          <aside className='pt-8 lg:pt-[50px] pl-0 lg:pl-1'>
            <h2 className='m-0 text-[28px] font-medium leading-[1.1] mb-[22px] text-[#171717]'>TOTAL</h2>
            <div className='grid gap-2.5 mb-[18px] pb-[14px] border-b border-[#d7d7d7]'>
              <p className='m-0 text-[14px] text-[#202020]'>Nome do Produto</p>
              <p className='m-0 text-[14px] text-[#202020]'>Nome do Produto</p>
            </div>

            <div className='flex justify-between items-center mb-10'>
              <span className='text-[22px] text-[#1a1a1a] leading-none'>TOTAL</span>
              <span className='text-[21px] text-[#1a1a1a]'>0 €</span>
            </div>

            <button
              type='button'
              className='w-full border-0 bg-[#212326] text-white text-[11px] tracking-[1px] py-[11px] px-[14px] cursor-pointer'
            >
              EFETUAR PAGAMENTO
            </button>
          </aside>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CartPage
