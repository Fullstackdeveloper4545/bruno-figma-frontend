import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react'

const Navbar = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <header>
                <nav>
                    <div className='bg-black text-white p-2 text-center text-[12px]'>
                        Ofertas e InformaÃ§Ãµes Saldos
                    </div>
                    <div className='flex w-full justify-between items-center px-4 md:px-16 py-2'>
                        <div className='hidden md:flex w-2/12 justify-evenly'>
                            <Link to="/" className=''>Sobre NÃ³s</Link>
                            <Link to="/blog">Blog</Link>
                            <Link to="/Contactos">Contactos</Link>
                        </div>
                        <div className='w-4/12 md:w-1/12 flex justify-center'>
                            <img src={logo} alt="Logo" className='h-8 md:h-10 object-contain' />
                        </div>
                        <div className='hidden md:flex w-1/12 justify-between'>
                            <Search />
                            <User />
                            <ShoppingCart />
                        </div>
                        <button
                            className='md:hidden'
                            onClick={() => setOpen((v) => !v)}
                            aria-label='Toggle menu'
                        >
                            {open ? <X /> : <Menu />}
                        </button>
                    </div>
                    <div className='hidden md:flex justify-center gap-8 py-6 border-t border-gray-300'>
                        <Link to="/sapatilhas" className='focus:text-red-500'>Sapatilhas</Link>
                        <Link to="/roupa" className='focus:text-red-500'>Roupa</Link>
                        <Link to="/relogios-gps" className='focus:text-red-500'>RelÃ³gios GPS</Link>
                        <Link to="/equipamento-corrida" className='focus:text-red-500'>Equipamento de Corrida</Link>
                        <Link to="/nutricao-desportiva" className='focus:text-red-500'>NutriÃ§Ã£o Desportiva</Link>
                        <Link to="/hyrox" className='focus:text-red-500'>Hyrox</Link>
                        <Link to="/marcas" className='focus:text-red-500'>Marcas</Link>
                        <Link to="/saldos" className='focus:text-red-500'>Saldos</Link>
                    </div>

                    {open && (
                        <div className='md:hidden border-t border-gray-300 px-4 py-4 space-y-4'>
                            <div className='flex gap-6'>
                                <Search />
                                <User />
                                <ShoppingCart />
                            </div>
                            <div className='flex flex-col gap-3'>
                                <Link to="/" onClick={() => setOpen(false)}>Sobre NÃ³s</Link>
                                <Link to="/blog" onClick={() => setOpen(false)}>Blog</Link>
                                <Link to="/Contactos" onClick={() => setOpen(false)}>Contactos</Link>
                            </div>
                            <div className='flex flex-col gap-3 pt-2 border-t border-gray-300'>
                                <Link to="/sapatilhas" onClick={() => setOpen(false)}>Sapatilhas</Link>
                                <Link to="/roupa" onClick={() => setOpen(false)}>Roupa</Link>
                                <Link to="/relogios-gps" onClick={() => setOpen(false)}>RelÃ³gios GPS</Link>
                                <Link to="/equipamento-corrida" onClick={() => setOpen(false)}>Equipamento de Corrida</Link>
                                <Link to="/nutricao-desportiva" onClick={() => setOpen(false)}>NutriÃ§Ã£o Desportiva</Link>
                                <Link to="/hyrox" onClick={() => setOpen(false)}>Hyrox</Link>
                                <Link to="/marcas" onClick={() => setOpen(false)}>Marcas</Link>
                                <Link to="/saldos" onClick={() => setOpen(false)}>Saldos</Link>
                            </div>
                        </div>
                    )}

                </nav>
            </header>
        </>
    )
}

export default Navbar
