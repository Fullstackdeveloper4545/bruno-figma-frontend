import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { Search, User, ShoppingCart } from 'lucide-react'

const Navbar = () => {
    return (
        <>
            <header>
                <nav>
                    <div className='bg-black text-white p-2 text-center text-[12px]'>
                        Ofertas e Informações Saldos
                    </div>
                    <div className='flex w-full justify-between items-center px-16 py-2'>
                        <div className=' w-2/12 flex justify-evenly'>
                            <Link to="/" className=''>Sobre Nós</Link>
                            <Link to="/blog">Blog</Link>
                            <Link to="/Contactos">Contactos</Link>
                        </div>
                        <div className='w-1/12'>
                            <img src={logo} alt="Logo"/>
                        </div>
                        <div className='flex w-1/12 justify-between'>
                            <Search />
                            <User />
                            <ShoppingCart />
                        </div>
                    </div>
                    <div className='flex justify-center gap-8 py-6 border-t border-gray-300'>
                        <Link to="/sapatilhas" className='focus:text-red-500'>Sapatilhas</Link>
                        <Link to="/roupa" className='focus:text-red-500'>Roupa</Link>
                        <Link to="/relogios-gps" className='focus:text-red-500'>Relógios GPS</Link>
                        <Link to="/equipamento-corrida" className='focus:text-red-500'>Equipamento de Corrida</Link>
                        <Link to="/nutricao-desportiva" className='focus:text-red-500'>Nutrição Desportiva</Link>
                        <Link to="/hyrox" className='focus:text-red-500'>Hyrox</Link>
                        <Link to="/marcas" className='focus:text-red-500'>Marcas</Link>
                        <Link to="/saldos" className='focus:text-red-500'>Saldos</Link>
                    </div>

                </nav>
            </header>
        </>
    )
}

export default Navbar