import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import Navbar from './Components/layout/Navbar'
import Footer from './Components/layout/Footer'
import StoreCard from './Components/UI/StoreCard'
import AnaDiasOne from './assets/ana-dias-1.jpg'
import AnaDiasTwo from './assets/ana-dias-2.jpg'
import StoreFaro from './assets/Faro.png'
import StoreLisboa from './assets/Lisboa.png'
import StoreMatosinhos from './assets/Matosinhos.png'

const AboutUsPage = () => {
    const testimonials = [
        {
            quote:
                'I joined on a whim, but it has become a constant in my growth. Everyone brings such honest energy and I leave every session clearer and more focused.',
            author: 'Taylor B.',
            role: 'Creative Coach',
        },
        {
            quote:
                'It is rare to find a space that is this structured and this human. I have made more progress in 3 months than I had in a year alone.',
            author: 'Samir R.',
            role: 'Indie Developer',
        },
        {
            quote:
                'The feedback is gold. Supportive, but not sugarcoated. I always feel seen and challenged in the best way.',
            author: 'Renee L.',
            role: 'Marketing Strategist',
        },
        {
            quote:
                'I used to overthink every move in my business. Now I have a circle that keeps me grounded, focused, and honestly excited to show up.',
            author: 'Alex M.',
            role: 'Wellness Entrepreneur',
        },
        {
            quote:
                'This is not just another online group. It feels like a team. The accountability and support have helped me stay consistent like never before.',
            author: 'Jordan K.',
            role: 'Freelance Illustrator',
        },
    ]

    const cardClass =
        'bg-black text-white rounded-[18px] p-8 w-[300px] sm:w-[280px] flex flex-col justify-between'

    return (
        <>
            <Navbar />

            <section className='bg-white px-5 py-12 sm:py-16 '>
                <div className='mx-auto max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start'>
                    <div className='w-full'>
                        <img src={AnaDiasTwo} alt='Sobre Nos' className='w-full h-[50%] object-cover' />
                    </div>

                    <div className='pt-2'>
                        <h1 className='m-0 lg:text-[58px] sm:text-[34px] md:text-[38px] text-[#3a231d] font-medium'>
                            Sobre Nos
                        </h1>
                        <p className='mt-4 text-[14px] sm:text-[15px] leading-[1.75] text-[#2c2c2c]'>
                            For too long, healing has been about pushing through, doing more, and trying to fix
                            ourselves. But what if the key to feeling better was not in working harder, but in
                            learning to work with your body instead? For too long, healing has been about
                            pushing through, doing more, and trying to fix ourselves. But what if the key to
                            feeling better was not in working harder, but in learning to work with your body
                            instead? For too long, healing has been about pushing through, doing more, and
                            trying to fix ourselves. But what if the key to feeling better was not in working
                            harder, but in learning to work with your body instead?
                        </p>
                    </div>
                </div>
            </section>

            <section className='bg-white px-5 pb-12 sm:pb-16 '>
                <div className='mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12 items-start'>
                    <div>
                        <h2 className='m-0 text-[30px] sm:text-[34px] lg:text-[38px] text-[#3a231d] font-medium'>
                            Sobre Nos
                        </h2>
                        <p className='mt-4 max-w-[520px] text-[14px] sm:text-[15px] leading-[1.75] text-[#2c2c2c]'>
                            turpis vitae fringilla ex. ac vel felis, Ut ullamcorper quam tempor sollicitudin.
                            nisl. ullamcorper tempor faucibus eu orci felis, tincidunt elementum dui. Ut odio
                            dui. cursus scelerisque malesuada non, scelerisque eu lacus, ultrices non. diam at,
                            ex elementum sapien Praesent sit eu odio ipsum nulla, Nullam turpis
                        </p>

                        <div className='mt-8 w-full max-w-[520px] overflow-hidden bg-[#f2f2f2]'>
                            <img src={AnaDiasOne} alt='Sobre Nos' className='w-full h-full object-cover' />
                        </div>
                    </div>

                    <div className='grid gap-6'>
                        <div className='w-full overflow-hidden bg-[#f2f2f2]'>
                            <img src={AnaDiasTwo} alt='Corredor' className='w-full h-full object-cover' />
                        </div>
                        <div className='w-full overflow-hidden bg-[#f2f2f2]'>
                            <img src={AnaDiasTwo} alt='Treino' className='w-full h-full object-cover' />
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-white px-5 py-12 sm:py-16 '>
                <div className='mx-auto max-w-[1200px] flex flex-col lg:flex-row gap-10 lg:gap-14 items-start'>
                    <div className=' lg:hidden lg:w-[280px] text-center'>
                        <p className='m-0 text-[12px] tracking-[2px] text-[#8b8b8b] uppercase'>Testemunhos</p>
                        <h2 className='m-0 mt-4 text-[28px] sm:text-[32px] lg:text-[36px] leading-[1.15] text-[#1f1f1f] font-medium'>
                            O que os
                           
                            nossos
                            
                            clientes dizem
                        </h2>
                    </div>

                    <div className='flex-1'>
                        <div className='md:hidden lg:w-[280px]'>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={12}
                                loop={true}
                                // grabCursor={true}
                                pagination={{ clickable: true }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                className='mySwiper'
                            >
                                {testimonials.map((item, index) => (
                                    <SwiperSlide key={`${item.author}-${index}`} className='mx-[20px]'>
                                        <article className={cardClass}>
                                            <p className='m-0 text-[18px] leading-[1.7] text-[#f1f1f1]'>{item.quote}</p>
                                            <p className='m-0 mt-6 text-[18px] text-[#c9c9c9]'>
                                                - {item.author} / {item.role}
                                            </p>
                                        </article>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <div className='hidden md:flex flex-wrap gap-5 justify-start'>
                               <div className='lg:w-[280px]'>
                        <p className='m-0 text-[12px] tracking-[2px] text-[#8b8b8b] uppercase'>Testemunhos</p>
                        <h2 className='m-0 mt-4 text-[28px] sm:text-[32px] lg:text-[36px] leading-[1.15] text-[#1f1f1f] font-medium'>
                            O que os
                            <br />
                            nossos
                            <br />
                            clientes dizem
                        </h2>
                    </div>
                            {testimonials.map((item, index) => (
                                <article key={`${item.author}-${index}`} className={cardClass}>
                                    <p className='m-0 text-[18px] leading-[1.7] text-[#f1f1f1]'>{item.quote}</p>
                                    <p className='m-0 mt-6 text-[18px] text-[#c9c9c9]'>
                                        - {item.author} / {item.role}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className='mx-auto max-w-[1366px] px-5 sm:px-8 lg:px-[42px] py-[40px] sm:py-[55px] lg:py-[70px] text-center '>
                <h2 className='m-0 text-[28px] sm:text-[32px] leading-[1.04] font-normal text-[#262626]'>
                    Estamos perto de ti
                </h2>
                <p className='m-0 mt-3 text-[14px] sm:text-[16px] leading-[1.5] tracking-[0.04em] text-[#333]'>
                    Visita-nos numa das nossas lojas físicas e recebe aconselhamento especializado.
                </p>
                <div className='mt-6 md:hidden'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={12}
                        pagination={{ clickable: true }}
                        navigation={true}
                        modules={[Pagination, Navigation]}
                        className='mySwiper'
                    >
                        <SwiperSlide className='py-2'>
                            <StoreCard image={StoreFaro} title='Loja de Faro' />
                        </SwiperSlide>
                        <SwiperSlide className='py-2'>
                            <StoreCard image={StoreLisboa} title='Loja de Lisboa' />
                        </SwiperSlide>
                        <SwiperSlide className='py-2'>
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

            <Footer />
        </>
    )
}

export default AboutUsPage
