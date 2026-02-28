import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import './App.css'
import Navbar from './Components/layout/Navbar'
import ProductCard from './Components/UI/ProductCard'
import CategoryCard from './Components/UI/CategoryCard'

function App() {

  return (
    <>
      <Navbar />

      {/* Hero Section */}

      <section>
        <div className='hero-bg h-[90vh] '>
          <div className='w-3/12 text-white flex flex-col justify-center h-[90vh] ml-[10%]'>
            <h1 className='text-[46px]  '>Corre mais longe. Corre melhor.</h1>
            <p className='w-9/12 py-4 text-[14px]'>Equipamento técnico para corrida e trail running, testado por atletas e escolhido para quem leva a performance a sério.</p>
            <button className='bg-white py-2 w-6/12 text-black '>COMPRAR AGORA</button>
          </div>
        </div>
      </section>

      {/* section */}

      <section className='mt-[10vh] flex flex-col items-center '>
        <div className='text-center'>
          <h1 className='text-[24px] '>Escolhas dos atletas</h1>
          <p className='py-4'>Os modelos e equipamentos mais procurados por quem corre todos os dias - estrada, trilho e ultra trail.</p>
        </div>

        <div className='w-[95vw] mx-auto'>
          <Swiper
            slidesPerView={5}
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
            <SwiperSlide>
              <ProductCard />
            </SwiperSlide>
          </Swiper>
        </div>
            <button className='py-2 px-10 bg-black text-white my-10'>COMPRAR AGORA</button>
      </section>


      <section >
        <h1 className='text-[24px] text-center'>Tudo o que precisas para correr melhor</h1>
        <div className='flex flex-wrap justify-center gap-4 mt-10'>
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />      
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
        
        </div>
      </section>
    </>
  )
}

export default App
