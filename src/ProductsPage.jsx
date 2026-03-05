import React, { useEffect, useMemo, useState } from 'react'
import Navbar from './Components/layout/Navbar'
import Footer from './Components/layout/Footer'
import ProductCard from './Components/UI/ProductCard'
import productImage from './assets/product-card-test-image.png'
import { getJson, resolveAssetUrl } from './lib/api'
import { ChevronDown } from 'lucide-react'


const fallbackProducts = [
  {
    id: 'fallback-1',
    title: 'Adidas Adizero Boston 13 W',
    color: 'Branco e Rosa',
    price: '132.00 EUR',
    oldPrice: '188.00 EUR',
    discountLabel: '30% off',
    image: productImage,
  },
  {
    id: 'fallback-2',
    title: 'Adidas Adizero Takumi SEN 10 W',
    color: 'Azul',
    price: '135.00 EUR',
    image: productImage,
  },
  {
    id: 'fallback-3',
    title: 'Adizero Adios Pro 4 W',
    color: 'Branco e Laranja',
    price: '97.00 EUR',
    image: productImage,
  },
]

const colorSwatches = [
  { name: 'Preto', color: '#111111' },
  { name: 'Azul', color: '#1f4f8f' },
  { name: 'Castanho', color: '#9a5b2a' },
  { name: 'Verde', color: '#5f6b4f' },
  { name: 'Cinzento', color: '#d9d9d9', light: true },
  { name: 'Laranja', color: '#d8892b' },
  { name: 'Rosa', color: '#f0c7bd' },
  { name: 'Vermelho', color: '#c62828' },
  { name: 'Bege', color: '#b8a892' },
]

function toNumber(value, fallback = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

function formatPrice(value) {
  const amount = toNumber(value, 0)
  return `${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} EUR`
}

function parseAttributes(raw) {
  if (!raw) return {}
  if (typeof raw === 'object') return raw
  if (typeof raw !== 'string') return {}
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function extractColor(attributes) {
  const source = parseAttributes(attributes)
  const entries = Object.entries(source)
  if (entries.length === 0) return 'Cor disponivel'
  const hit = entries.find(([key]) => ['cor', 'color', 'colour'].includes(String(key).toLowerCase()))
  if (hit) return String(hit[1] || 'Cor disponivel')
  return 'Cor disponivel'
}

function mapProductToCard(product, index) {
  const variants = Array.isArray(product?.variants) ? product.variants : []
  const primaryVariant = variants.find((variant) => variant?.is_active !== false) || variants[0] || null
  const price = toNumber(primaryVariant?.price ?? product?.base_price, 0)
  const compareAt = toNumber(primaryVariant?.compare_at_price, 0)
  const hasDiscount = compareAt > price && compareAt > 0
  const discountPct = hasDiscount ? Math.round(((compareAt - price) / compareAt) * 100) : 0
  const image = Array.isArray(product?.images) && product.images[0]?.image_url
    ? resolveAssetUrl(product.images[0].image_url)
    : productImage

  return {
    id: product?.id || `api-product-${index}`,
    title: product?.name_pt || product?.name_es || product?.sku || `Produto ${index + 1}`,
    color: extractColor(primaryVariant?.attribute_values),
    price: formatPrice(price),
    oldPrice: hasDiscount ? formatPrice(compareAt) : null,
    discountLabel: hasDiscount ? `${discountPct}% off` : null,
    image,
  }
}

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const [selectedColor, setSelectedColor] = useState(null)

  useEffect(() => {
    let active = true

    const loadProducts = async () => {
      try {
        const rows = await getJson('/api/products')
        if (!active) return
        const mapped = Array.isArray(rows) ? rows.map(mapProductToCard) : []
        setProducts(mapped)
        setError('')
      } catch (err) {
        if (!active) return
        setProducts([])
        setError(err instanceof Error ? err.message : 'Failed to load products')
      }
    }

    void loadProducts()

    return () => {
      active = false
    }
  }, [])

  const visibleProducts = useMemo(
    () => (products.length > 0 ? products : fallbackProducts),
    [products]
  )

  const toggleColor = (name) => {
    setSelectedColor((prev) => (prev === name ? null : name))
  }

  return (
    <>
      <Navbar />
      <section className='mt-[4vh] mb-[10vh]'>
        <div className='w-[90vw] mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10'>
          <aside className='border-r border-black/10 pr-6 lg:sticky lg:top-6 lg:h-fit'>
            <div className='text-[13px] py-4 border-b border-black/10'>{visibleProducts.length} produtos</div>

            <div className='lg:hidden'>
              <details className='py-4 border-b border-black/10'>
                <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                  Filtros
                  <span className='text-[12px]'><ChevronDown /></span>
                </summary>
                <div className='mt-4 space-y-4'>
                  <details className='py-2 border-t border-black/10'>
                    <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                      Categoria
                      <span className='text-[12px]'><ChevronDown /></span>
                    </summary>
                    <div className='mt-4 space-y-3 text-[12px]'>
                      <label className='flex items-center gap-3'>
                        <input type='checkbox' className='h-4 w-4' />
                        Sapatilhas de Corrida
                      </label>
                      <label className='flex items-center gap-3'>
                        <input type='checkbox' className='h-4 w-4' />
                        Sapatilhas de Corrida de Trail
                      </label>
                      <label className='flex items-center gap-3'>
                        <input type='checkbox' className='h-4 w-4' />
                        Sapatilhas de Atletismo
                      </label>
                      <label className='flex items-center gap-3'>
                        <input type='checkbox' className='h-4 w-4' />
                        Sapatilhas de Carbono
                      </label>
                    </div>
                  </details>

                  <details className='py-2 border-t border-black/10'>
                    <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                      GÃªnero
                      <span className='text-[12px]'><ChevronDown /></span>
                    </summary>
                    <div className='mt-4 space-y-3 text-[12px]'>
                      <label className='flex items-center gap-3'>
                        <input type='checkbox' className='h-4 w-4' />
                        Mulher
                      </label>
                      <label className='flex items-center gap-3'>
                        <input type='checkbox' className='h-4 w-4' />
                        Homem
                      </label>
                      <label className='flex items-center gap-3'>
                        <input type='checkbox' className='h-4 w-4' />
                        Unisexo
                      </label>
                    </div>
                  </details>

                  <details className='py-2 border-t border-black/10'>
                    <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                      Tamanho
                      <span className='text-[12px]'><ChevronDown /></span>
                    </summary>
                    <div className='mt-4 grid grid-cols-3 gap-2 text-[12px]'>
                      {['36', '38', '40', '42', '44', '46', '48', '50'].map((size) => (
                        <button
                          key={size}
                          className='border border-black/10 py-2 focus:bg-black focus:text-white focus:border-black'
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </details>

                  <details className='py-2 border-t border-black/10'>
                    <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                      Cor
                      <span className='text-[12px]'><ChevronDown /></span>
                    </summary>
                    <div className='mt-4 grid grid-cols-3 gap-4 text-[11px]'>
                      {colorSwatches.map((c) => {
                        const isSelected = selectedColor === c.name
                        return (
                        <button
                          key={c.name}
                          type='button'
                          aria-pressed={isSelected}
                          onClick={() => toggleColor(c.name)}
                          className='group flex flex-col items-center gap-2 outline-none'
                        >
                          <span
                            className={`h-6 w-6 rounded-full transition-shadow ${
                              isSelected
                                ? 'ring-2 ring-black ring-offset-2 ring-offset-white'
                                : c.light
                                  ? 'ring-1 ring-black/10'
                                  : ''
                            } group-focus-visible:ring-2 group-focus-visible:ring-black group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-white`}
                            style={{ backgroundColor: c.color }}
                          />
                          <span className={isSelected ? 'font-semibold' : ''}>{c.name}</span>
                        </button>
                      )})}
                      <button className='text-left col-span-3 text-[11px] text-black/60'>Ver mais +</button>
                    </div>
                  </details>

                  <details className='py-2 border-t border-black/10'>
                    <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                      Marcas
                      <span className='text-[12px]'><ChevronDown /></span>
                    </summary>
                    <div className='mt-4 space-y-3 text-[12px]'>
                      {['Adidas', 'Asics', 'Nike', 'Hoka', 'Puma', 'New Balance', 'Garmin', 'Brooks'].map((brand) => (
                        <label key={brand} className='flex items-center gap-3'>
                          <input type='checkbox' className='h-4 w-4' />
                          {brand}
                        </label>
                      ))}
                    </div>
                  </details>
                </div>
              </details>
            </div>

            <div className='hidden lg:block'>
            <details open className='py-4 border-b border-black/10'>
              <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                Categoria
                <span className='text-[12px]'><ChevronDown /></span>
              </summary>
              <div className='mt-4 space-y-3 text-[12px]'>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='h-4 w-4' />
                  Sapatilhas de Corrida
                </label>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='h-4 w-4' />
                  Sapatilhas de Corrida de Trail
                </label>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='h-4 w-4' />
                  Sapatilhas de Atletismo
                </label>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='h-4 w-4' />
                  Sapatilhas de Carbono
                </label>
              </div>
            </details>

            <details open className='py-4 border-b border-black/10'>
              <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                GÃªnero
                <span className='text-[12px]'><ChevronDown /></span>
              </summary>
              <div className='mt-4 space-y-3 text-[12px]'>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='h-4 w-4' />
                  Mulher
                </label>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='h-4 w-4' />
                  Homem
                </label>
                <label className='flex items-center gap-3'>
                  <input type='checkbox' className='h-4 w-4' />
                  Unisexo
                </label>
              </div>
            </details>

            <details open className='py-4 border-b border-black/10'>
              <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                Tamanho
                <span className='text-[12px]'><ChevronDown /></span>
              </summary>
              <div className='mt-4 grid grid-cols-3 gap-2 text-[12px]'>
                {['36', '38', '40', '42', '44', '46', '48', '50'].map((size) => (
                  <button
                    key={size}
                    className='border border-black/10 py-2 focus:bg-black focus:text-white focus:border-black'
                  >
                    {size}
                  </button>
                ))}
              </div>
            </details>

            <details open className='py-4 border-b border-black/10'>
              <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                Cor
                <span className='text-[12px]'><ChevronDown /></span>
              </summary>
              <div className='mt-4 grid grid-cols-3 gap-4 text-[11px]'>
                {colorSwatches.map((c) => {
                  const isSelected = selectedColor === c.name
                  return (
                  <button
                    key={c.name}
                    type='button'
                    aria-pressed={isSelected}
                    onClick={() => toggleColor(c.name)}
                    className='group flex flex-col items-center gap-2 outline-none'
                  >
                    <span
                      className={`h-6 w-6 rounded-full transition-shadow ${
                        isSelected
                          ? 'ring-2 ring-black ring-offset-2 ring-offset-white'
                          : c.light
                            ? 'ring-1 ring-black/10'
                            : ''
                      } group-focus-visible:ring-2 group-focus-visible:ring-black group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-white`}
                      style={{ backgroundColor: c.color }}
                    />
                    <span className={isSelected ? 'font-semibold' : ''}>{c.name}</span>
                  </button>
                )})}
                <button className='text-left col-span-3 text-[11px] text-black/60'>Ver mais +</button>
              </div>
            </details>

            <details open className='py-4'>
              <summary className='cursor-pointer text-[14px] font-semibold flex items-center justify-between'>
                Marcas
                <span className='text-[12px]'><ChevronDown /></span>
              </summary>
              <div className='mt-4 space-y-3 text-[12px]'>
                {['Adidas', 'Asics', 'Nike', 'Hoka', 'Puma', 'New Balance', 'Garmin', 'Brooks'].map((brand) => (
                  <label key={brand} className='flex items-center gap-3'>
                    <input type='checkbox' className='h-4 w-4' />
                    {brand}
                  </label>
                ))}
              </div>
            </details>
            </div>
          </aside>

          <div className='lg:max-h-[calc(100vh-140px)] lg:overflow-y-auto lg:pr-2'>
            <div className='mb-4'>
              <p className='text-[12px] text-black/60'>Home / Sapatilhas</p>
              <h1 className='text-[32px] font-semibold'>Sapatilhas</h1>
              {error ? <p className='mt-1 text-[12px] text-red-600'>Live products unavailable. Showing fallback items.</p> : null}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12'>
              {visibleProducts.map((product, index) => (
                <ProductCard
                  key={`${product.id || product.title}-${index}`}
                  image={product.image}
                  title={product.title}
                  color={product.color}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  discountLabel={product.discountLabel}
                  to={`/productDetails/${encodeURIComponent(String(product.id || index))}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default ProductsPage
