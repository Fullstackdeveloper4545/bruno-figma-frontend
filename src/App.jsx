import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import './App.css'
import Navbar from './Components/layout/Navbar'
import Footer from './Components/layout/Footer'
import ProductCard from './Components/UI/ProductCard'
import CategoryCard from './Components/UI/CategoryCard'
import StoreCard from './Components/UI/StoreCard'
import CommunityCard from './Components/UI/CommunityCard'
import StoreFaro from './assets/Faro.png'
import StoreLisboa from './assets/Lisboa.png'
import StoreMatosinhos from './assets/Matosinhos.png'
import AnaDias1 from './assets/ana-dias-1.jpg'
import AnaDias2 from './assets/ana-dias-2.jpg'

function App() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section>
        <div className='hero-bg h-[90vh]'>
          <div className='w-full md:w-3/12 text-white flex flex-col justify-center h-[90vh] md:ml-[10%] px-6 md:px-0'>
            <h1 className='text-[32px] md:text-[46px]'>Corre mais longe. Corre melhor.</h1>
            <p className='w-full md:w-9/12 py-4 text-[14px]'>
              Equipamento tÃ©cnico para corrida e trail running, testado por atletas e escolhido
              para quem leva a performance a sÃ©rio.
            </p>
            <button className='bg-white py-2 w-full md:w-6/12 text-black'>COMPRAR AGORA</button>
          </div>
        </div>
      </section>

      {/* Escolhas dos atletas */}
      <section className='mt-[10vh] flex flex-col items-center'>
        <div className='text-center'>
          <h1 className='text-[24px]'>Escolhas dos atletas</h1>
          <p className='py-4'>
            Os modelos e equipamentos mais procurados por quem corre todos os dias - estrada,
            trilho e ultra trail.
          </p>
        </div>

        <div className='w-[95vw] mx-auto'>
          <Swiper
            slidesPerView={1}
            spaceBetween={12}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 12 },
              768: { slidesPerView: 3, spaceBetween: 12 },
              1024: { slidesPerView: 5, spaceBetween: 0 },
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper'
          >
            {[...Array(10)].map((_, idx) => (
              <SwiperSlide key={`athlete-${idx}`}>
                <ProductCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <button className='py-2 px-10 bg-black text-white my-10'>COMPRAR AGORA</button>
      </section>

      {/* Categorias */}
      <section>
        <h1 className='text-[24px] text-center'>Tudo o que precisas para correr melhor</h1>

        <div className='mt-6 w-full md:hidden'>
          <Swiper
            slidesPerView={1}
            spaceBetween={12}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper '
          >
            {[...Array(6)].map((_, idx) => (
              <SwiperSlide key={`cat-mobile-${idx}`} className='py-4'>
                <CategoryCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='hidden md:flex flex-wrap justify-center gap-4 mt-10'>
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
          <CategoryCard />
        </div>
      </section>

      {/* Performance comprovada */}
      <section className='mt-[10vh] flex flex-col items-center'>
        <div className='text-center'>
          <h1 className='text-[24px]'>Performance comprovada</h1>
          <p className='py-4'>
            Selecionamos apenas marcas e modelos que cumprem os nossos criterios de qualidade,
            durabilidade e eficiencia.
          </p>
        </div>

        <div className='w-[95vw] mx-auto'>
          <Swiper
            slidesPerView={1}
            spaceBetween={12}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 12 },
              768: { slidesPerView: 3, spaceBetween: 12 },
              1024: { slidesPerView: 5, spaceBetween: 0 },
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper'
          >
            {[...Array(10)].map((_, idx) => (
              <SwiperSlide key={`perf-${idx}`}>
                <ProductCard />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Promo Section */}
      <section className='mt-[10vh]'>
        <div className='promo-bg h-[50vh] w-[90vw] mx-auto flex items-center justify-center'>
          <div className='text-center text-white px-8 py-6'>
            <h2 className='text-[32px]'>Corre para as oportunidades</h2>
            <p className='py-3 text-[16px]'>
              Ate 30% de desconto em artigos selecionados. So por tempo limitado.
            </p>
            <button className='bg-white text-black px-10 py-2 tracking-[2px] text-[14px]'>
              COMPRAR AGORA
            </button>
          </div>
        </div>
      </section>

      {/* Marcas */}
      <section className='mt-[10vh] mb-[10vh]'>
        <h2 className='text-[32px] text-center mb-6'>Marcas</h2>

        <div className='w-[90vw] mx-auto md:hidden'>
          <Swiper
            slidesPerView={1}
            spaceBetween={12}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper'
          >
            {[
              './src/assets/adidas.png',
              './src/assets/asics.png',
              './src/assets/nike.png',
              './src/assets/hoka.png',
              './src/assets/puma.png',
              './src/assets/newBalance.png',
              './src/assets/garmin.png',
              './src/assets/brooks.png',
            ].map((src, idx) => (
              <SwiperSlide key={`brand-${idx}`}>
                <div className='flex items-center justify-center py-6'>
                  <img className='h-16 object-contain' src={src} alt='Brand' />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className='hidden md:flex w-[90vw] mx-auto flex-wrap items-center justify-between gap-y-6'>
          <img className='h-16 object-contain' src='./src/assets/adidas.png' alt='Adidas' />
          <img className='h-16 object-contain' src='./src/assets/asics.png' alt='Asics' />
          <img className='h-16 object-contain' src='./src/assets/nike.png' alt='Nike' />
          <img className='h-16 object-contain' src='./src/assets/hoka.png' alt='Hoka' />
          <img className='h-16 object-contain' src='./src/assets/puma.png' alt='Puma' />
          <img className='h-16 object-contain' src='./src/assets/newBalance.png' alt='New Balance' />
          <img className='h-16 object-contain' src='./src/assets/garmin.png' alt='Garmin' />
          <img className='h-16 object-contain' src='./src/assets/brooks.png' alt='Brooks' />
        </div>
      </section>

      {/* Lojas */}
      <section className='mx-auto max-w-[1366px] px-5 sm:px-8 lg:px-[42px] py-[40px] sm:py-[55px] lg:py-[70px] text-center'>
        <h2 className='m-0 text-[28px] sm:text-[32px] leading-[1.04] font-normal text-[#262626]'>
          Estamos perto de ti
        </h2>
        <p className='m-0 mt-3 text-[14px] sm:text-[16px] leading-[1.5] tracking-[0.04em] text-[#333]'>
          Visita-nos numa das nossas lojas fisicas e recebe aconselhamento especializado.
        </p>

        <div className='mt-6 md:hidden'>
          <Swiper
            slidesPerView={1}
            spaceBetween={12}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper py-2'
          >
            <SwiperSlide className='py-2'>
              <StoreCard image={StoreFaro} title='Loja de Faro' />
            </SwiperSlide>
            <SwiperSlide  className='py-2'>
              <StoreCard image={StoreLisboa} title='Loja de Lisboa' />
            </SwiperSlide>
            <SwiperSlide  className='py-2'>
              <StoreCard image={StoreMatosinhos} title='Loja de Matosinhos' />
            </SwiperSlide>
          </Swiper>
        </div>

        <div className='mt-6 hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
          <StoreCard image={StoreFaro} title='Loja de Faro' />
          <StoreCard image={StoreLisboa} title='Loja de Lisboa' />
          <StoreCard image={StoreMatosinhos} title='Loja de Matosinhos' />
        </div>
      </section>

      {/* Comunidade */}
      <section className='mt-[10vh] mb-[10vh] flex flex-col items-center'>
        <div className='text-center'>
          <h2 className='text-[32px]'>Ana Dias sempre contigo</h2>
          <p className='py-3 text-[16px]'>
            A tua corrida e a nossa inspiracao. Partilha os teus momentos, treinos e conquistas
            com #anadiasrun e faz parte da nossa comunidade.
          </p>
        </div>
        <div className='w-[95vw] mx-auto'>
          <Swiper
            slidesPerView={1}
            spaceBetween={12}
            loop={true}
            grabCursor={true}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='ana-dias-swiper'
          >
            <SwiperSlide  className='py-2'>
              <CommunityCard image={AnaDias1} alt='Ana Dias Run 1' />
            </SwiperSlide>
            <SwiperSlide className='py-2'>
              <CommunityCard image={AnaDias2} alt='Ana Dias Run 2' />
            </SwiperSlide>
            <SwiperSlide className='py-2'>
              <CommunityCard image={AnaDias1} alt='Ana Dias Run 3' />
            </SwiperSlide>
            <SwiperSlide className='py-2'>
              <CommunityCard image={AnaDias2} alt='Ana Dias Run 4' />
            </SwiperSlide>
            <SwiperSlide className='py-2'>
              <CommunityCard image={AnaDias1} alt='Ana Dias Run 5' />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Beneficios */}
      <section className='mt-[10vh] mb-[10vh]'>
        <div className='w-[90vw] mx-auto md:hidden'>
          <Swiper
            slidesPerView={1}
            spaceBetween={12}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper'
          >
            <SwiperSlide className='py-2'>
              <div className='text-center px-6'>
                <img className='h-10 mx-auto mb-4' src='./src/assets/image1.png' alt='Envios' />
                <h3 className='text-[14px] font-semibold'>Envios Rapidos e Fiaveis</h3>
                <p className='text-[12px] mt-2'>
                  Encomendas expedidas em 24/48h para Portugal Continental, com tracking e
                  acompanhamento em tempo real.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className='py-2'>
              <div className='text-center px-6'>
                <img className='h-10 mx-auto mb-4' src='./src/assets/image2.png' alt='Trocas' />
                <h3 className='text-[14px] font-semibold'>Trocas e Devolucoes Simples</h3>
                <p className='text-[12px] mt-2'>
                  Processo de trocas e devolucoes claro, rapido e sem complicacoes, porque a tua
                  satisfacao vem primeiro.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className='py-2'>
              <div className='text-center px-6'>
                <img className='h-10 mx-auto mb-4' src='./src/assets/image3.png' alt='Compra' />
                <h3 className='text-[14px] font-semibold'>Compra Segura e Transparente</h3>
                <p className='text-[12px] mt-2'>
                  Pagamentos seguros, precos claros e informacao detalhada em todos os produtos,
                  sem surpresas.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        <div className='hidden md:flex w-[90vw] mx-auto flex-wrap items-start justify-between gap-y-10 text-center'>
          <div className='w-full md:w-1/3 px-6'>
            <img className='h-10 mx-auto mb-4' src='./src/assets/image1.png' alt='Envios' />
            <h3 className='text-[14px] font-semibold'>Envios Rapidos e Fiaveis</h3>
            <p className='text-[12px] mt-2'>
              Encomendas expedidas em 24/48h para Portugal Continental, com tracking e
              acompanhamento em tempo real.
            </p>
          </div>
          <div className='w-full md:w-1/3 px-6'>
            <img className='h-10 mx-auto mb-4' src='./src/assets/image2.png' alt='Trocas' />
            <h3 className='text-[14px] font-semibold'>Trocas e Devolucoes Simples</h3>
            <p className='text-[12px] mt-2'>
              Processo de trocas e devolucoes claro, rapido e sem complicacoes, porque a tua
              satisfacao vem primeiro.
            </p>
          </div>
          <div className='w-full md:w-1/3 px-6'>
            <img className='h-10 mx-auto mb-4' src='./src/assets/image3.png' alt='Compra' />
            <h3 className='text-[14px] font-semibold'>Compra Segura e Transparente</h3>
            <p className='text-[12px] mt-2'>
              Pagamentos seguros, precos claros e informacao detalhada em todos os produtos, sem
              surpresas.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default App
