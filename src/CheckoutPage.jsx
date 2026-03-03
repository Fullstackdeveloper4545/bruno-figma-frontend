import React from 'react'
import Navbar from './Components/layout/Navbar'
import Footer from './Components/layout/Footer'

const CheckoutPage = () => {
  return (
    <>
      <Navbar />

      <section className='bg-white px-5 py-10 font-["Poppins",sans-serif]'>
        <div className='w-[85%] mx-auto max-w-[1180px]'>
          <h1 className='m-0 text-[32px] tracking-[1px] text-[#111]'>CHECKOUT</h1>
          <p className='mt-2 text-[14px] tracking-[1.5px] text-[#8b93a7] uppercase'>
            Carrinho | Pagamento
          </p>
        </div>

        <div className='w-[85%] mx-auto max-w-[1180px] mt-8 grid grid-cols-1 lg:grid-cols-[1fr_1px_360px] gap-8 items-start'>
          <div>
            <div className='flex items-center justify-between mb-6'>
              <label className='text-[16px] tracking-[1.2px] text-[#222] uppercase'>Email</label>
              <p className='text-[14px] text-[#8b93a7]'>
                Já tem uma conta? <span className='text-[#111] underline cursor-pointer'>Log in</span>
              </p>
            </div>
            <input
              type='email'
              placeholder='you@email.com'
              className='w-full max-w-[520px] border-0 border-b border-[#d6d6d6] pb-2 outline-none text-[12px]'
            />

            <div className='mt-10'>
              <h2 className='m-0 text-[16px] tracking-[1.2px] text-[#222] uppercase font-semibold'>
                Escolha um método de envio
              </h2>

              <div className='mt-4 grid gap-4'>
                <button
                  type='button'
                  className='w-full border border-[#d7dbe5] p-4 flex items-center gap-4 text-left hover:border-[#111] transition'
                >
                  <div className='w-9 h-9 border border-[#cbd3e4] rounded flex items-center justify-center text-[18px]'>
                    🏬
                  </div>
                  <div className='flex-1'>
                    <p className='m-0 text-[14px] text-[#111]'>Recolha em Loja</p>
                    <p className='m-0 text-[14px] text-[#8b93a7]'>0 €</p>
                  </div>
                </button>

                <button
                  type='button'
                  className='w-full border border-[#d7dbe5] p-4 flex items-center gap-4 text-left hover:border-[#111] transition'
                >
                  <div className='w-9 h-9 border border-[#cbd3e4] rounded flex items-center justify-center text-[16px] font-semibold text-[#d81920]'>
                    ctt
                  </div>
                  <div className='flex-1'>
                    <p className='m-0 text-[14px] text-[#111]'>Envio CTT</p>
                    <p className='m-0 text-[14px] text-[#8b93a7]'>0 €</p>
                  </div>
                </button>

                <button
                  type='button'
                  className='w-full border border-[#d7dbe5] p-4 flex items-center gap-4 text-left hover:border-[#111] transition'
                >
                  <div className='w-9 h-9 border border-[#cbd3e4] rounded flex items-center justify-center text-[18px]'>
                    🚚
                  </div>
                  <div className='flex-1'>
                    <p className='m-0 text-[14px] text-[#111]'>Envio Transportadora</p>
                    <p className='m-0 text-[14px] text-[#8b93a7]'>0 €</p>
                  </div>
                </button>
              </div>
            </div>

            <div className='mt-12'>
              <h2 className='m-0 text-[16px] tracking-[1.2px] text-[#222] uppercase font-semibold'>
                Detalhes de envio
              </h2>

              <div className='mt-4 grid gap-4'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <input
                    type='text'
                    placeholder='Nome'
                    className='border border-[#cfd6e4] px-4 py-3 text-[13px] outline-none'
                  />
                  <input
                    type='text'
                    placeholder='Apelido'
                    className='border border-[#cfd6e4] px-4 py-3 text-[13px] outline-none'
                  />
                </div>

                <input
                  type='text'
                  placeholder='Telemovel'
                  className='border border-[#cfd6e4] px-4 py-3 text-[13px] outline-none'
                />
                <input
                  type='text'
                  placeholder='Pais/Regiao'
                  className='border border-[#cfd6e4] px-4 py-3 text-[13px] outline-none'
                />

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <input
                    type='text'
                    placeholder='Cidade'
                    className='border border-[#cfd6e4] px-4 py-3 text-[13px] outline-none'
                  />
                  <input
                    type='text'
                    placeholder='Codigo Postal'
                    className='border border-[#cfd6e4] px-4 py-3 text-[13px] outline-none'
                  />
                </div>

                <input
                  type='text'
                  placeholder='Morada'
                  className='border border-[#cfd6e4] px-4 py-3 text-[13px] outline-none'
                />
                <input
                  type='text'
                  placeholder='N de Porta, Apartamento (OPCIONAL)'
                  className='border border-[#cfd6e4] px-4 py-3 text-[13px] outline-none'
                />

                <div className='mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  <button
                    type='button'
                    className='border border-[#2b2b2b] text-[#111] text-[12px] tracking-[1px] py-3'
                  >
                    VOLTAR
                  </button>
                  <button
                    type='button'
                    className='bg-[#2b2b2b] text-white text-[12px] tracking-[1px] py-3'
                  >
                    CONTINUAR
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className='hidden lg:block w-px bg-[#e2e5ec] h-[50%]' />

          <aside>
            <h2 className='m-0 text-[28px] tracking-[1px] text-[#111] uppercase'>O seu carrinho</h2>

            <div className='mt-6 grid gap-6'>
              <div className='flex gap-4 items-start'>
                <img
                  src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=120&q=80'
                  alt='Adidas Adizero Takumi SEN'
                  className='w-[66px] h-[66px] object-cover bg-[#f3f4f6]'
                />
                <div>
                  <p className='m-0 text-[16px] text-[#111]'>Adidas Adizero Takumi SEN</p>
                  <p className='m-0 text-[14px] text-[#8b93a7]'>Características do Produto</p>
                </div>
              </div>

              <div className='flex gap-4 items-start'>
                <img
                  src='https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=120&q=80'
                  alt='Adizero Adios Pro 4 W'
                  className='w-[66px] h-[66px] object-cover bg-[#f3f4f6]'
                />
                <div>
                  <p className='m-0 text-[16px] text-[#111]'>Adizero Adios Pro 4 W</p>
                  <p className='m-0 text-[14px] text-[#8b93a7]'>Características do Produto</p>
                </div>
              </div>
            </div>

            <div className='mt-6 flex items-center gap-3'>
              <input
                type='text'
                placeholder='CÓDIGO'
                className='flex-1 border border-[#c7cbd7] px-3 py-2 text-[14px] tracking-[1px]'
              />
              <button
                type='button'
                className='bg-[#2b2b2b] text-white text-[14px] tracking-[1px] px-5 py-2'
              >
                APLICAR
              </button>
            </div>

            <div className='mt-6 border-t border-[#e2e5ec] pt-4 text-[16px] text-[#111] grid gap-2'>
              <div className='flex justify-between'>
                <span>Portes de envio</span>
                <span>0 €</span>
              </div>
              <div className='flex justify-between font-semibold'>
                <span>Total</span>
                <span>0 €</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default CheckoutPage
