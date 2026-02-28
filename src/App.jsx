import React, { useState } from 'react'

import './App.css'
import Navbar from './Components/layout/Navbar'
import ProductCard from './Components/UI/ProductCard'

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

      <section className='mt-[10vh]'>
        <div className='text-center'>
          <h1 className='text-[24px] '>Escolhas dos atletas</h1>
          <p className='py-4'>Os modelos e equipamentos mais procurados por quem corre todos os dias - estrada, trilho e ultra trail.</p>
        </div>

        <div className='flex justify-center gap-4 mt-8'>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />

          
        </div>

      </section>
    </>
  )
}

export default App
