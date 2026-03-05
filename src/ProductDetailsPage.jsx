import React, { useEffect, useMemo, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from './Components/layout/Navbar'
import Footer from './Components/layout/Footer'
import productImage from './assets/product-card-test-image.png'
import ProductCard from './Components/UI/ProductCard'
import IconEntrega from './assets/image4.png'
import IconDevolucao from './assets/image5.png'
import { getJson, resolveAssetUrl } from './lib/api'
import { addCartItem } from './lib/cart'

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

function mapProductForDetails(product, index = 0) {
  const variants = Array.isArray(product?.variants) ? product.variants : []
  const images = Array.isArray(product?.images)
    ? product.images.map((item) => resolveAssetUrl(item?.image_url || '')).filter(Boolean)
    : []
  const primaryVariant = variants.find((variant) => variant?.is_active !== false) || variants[0] || null
  const price = toNumber(primaryVariant?.price ?? product?.base_price, 0)
  const compareAt = toNumber(primaryVariant?.compare_at_price, 0)
  const colorsMap = new Map()

  for (const variant of variants) {
    const attrs = parseAttributes(variant?.attribute_values)
    for (const [key, value] of Object.entries(attrs)) {
      const normalizedKey = String(key || '').toLowerCase()
      if (!normalizedKey.includes('cor') && !normalizedKey.includes('color')) continue
      const colorName = String(value || '').trim()
      if (!colorName) continue
      const id = colorName.toLowerCase()
      if (!colorsMap.has(id)) {
        colorsMap.set(id, { id, label: colorName, color: '#999999' })
      }
    }
  }

  return {
    id: String(product?.id || `fallback-${index}`),
    categoryId: product?.category_id != null ? String(product.category_id) : null,
    primaryVariantId: primaryVariant?.id != null ? String(primaryVariant.id) : null,
    sku: primaryVariant?.sku || product?.sku || null,
    title: product?.name_pt || product?.name_es || product?.sku || `Produto ${index + 1}`,
    category: product?.category_name_pt || product?.category_name_es || 'Sapatilhas',
    description:
      product?.description_pt ||
      product?.description_es ||
      'Produto sem descricao detalhada no momento.',
    price,
    compareAt,
    images: images.length > 0 ? images : [productImage, productImage, productImage, productImage],
    colors:
      Array.from(colorsMap.values()).length > 0
        ? Array.from(colorsMap.values())
        : [
            { id: 'coral', label: 'Coral', color: '#c98d7c' },
            { id: 'aqua', label: 'Aqua', color: '#7fd0d8' },
            { id: 'orange', label: 'Orange', color: '#f16f5b' },
          ],
    cardColor: Array.from(colorsMap.values())[0]?.label || 'Cor disponivel',
    image: images[0] || productImage,
  }
}

function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [recommended, setRecommended] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadProduct = async () => {
      try {
        setLoading(true)
        setError('')
        const rows = await getJson('/api/products')
        if (!active) return

        const mapped = Array.isArray(rows) ? rows.map(mapProductForDetails) : []
        if (mapped.length === 0) {
          setProduct(null)
          setRecommended([])
          setError('No products available.')
          return
        }

        const routeId = String(id || '').trim()
        const current =
          mapped.find((item) => String(item.id) === routeId) ||
          mapped.find((item) => encodeURIComponent(String(item.id)) === routeId) ||
          mapped[0]

        setProduct(current)
        setRecommended(mapped.filter((item) => item.id !== current.id).slice(0, 10))
      } catch (err) {
        if (!active) return
        setProduct(null)
        setRecommended([])
        setError(err instanceof Error ? err.message : 'Failed to load product details')
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadProduct()

    return () => {
      active = false
    }
  }, [id])

  useEffect(() => {
    if (!product) return
    setSelectedColor(product.colors[0]?.id || '')
    setQuantity(1)
  }, [product])

  const hasDiscount = useMemo(
    () => Boolean(product && product.compareAt > product.price),
    [product]
  )

  const handleAddToCart = () => {
    if (!product) return
    const selected = product.colors.find((entry) => entry.id === selectedColor)
    addCartItem({
      id: `${product.id}:${selected?.id || 'default'}`,
      productId: product.id,
      variantId: product.primaryVariantId,
      categoryId: product.categoryId,
      sku: product.sku,
      name: product.title,
      color: selected?.label || 'Cor disponivel',
      qty: quantity,
      unitPrice: Number(product.price || 0),
      image: product.images?.[0] || productImage,
    })
    navigate('/cart')
  }

  return (
    <>
      <Navbar />
      <section className='mt-[6vh] mb-[10vh]'>
        <div className='w-[90vw] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10'>
          <div className='grid grid-cols-2 gap-4'>
            {(product?.images || [productImage, productImage, productImage, productImage]).map((img, index) => (
              <div key={`${img}-${index}`} className='border border-black/5 flex items-center justify-center'>
                <img src={img} alt={product?.title || 'Product image'} className='w-full' />
              </div>
            ))}
          </div>

          <div>
            <p className='text-[12px] text-black/60'>Sapatilhas | {product?.category || 'Categoria'}</p>
            <div className='flex items-start justify-between gap-4 mt-2'>
              <h1 className='text-[24px] font-semibold'>{product?.title || 'Produto'}</h1>
              <div className='text-right flex gap-4'>
                {hasDiscount ? <p className='text-[24px] line-through text-black/40'>{formatPrice(product.compareAt)}</p> : null}
                <p className='text-[24px] font-semibold'>{formatPrice(product?.price || 0)}</p>
              </div>
            </div>

            {loading ? <p className='mt-3 text-[12px] text-black/60'>Loading product details...</p> : null}
            {error ? <p className='mt-3 text-[12px] text-red-600'>{error}</p> : null}

            <div className='mt-6'>
              <div className='flex items-center justify-between'>
                <span className='text-[12px] font-semibold'>Tamanhos</span>
                <button className='text-[11px] text-black/60'>Guia de Tamanhos</button>
              </div>
              <div className='mt-3 grid grid-cols-6 gap-2 text-[11px]'>
                {['36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47'].map((size) => (
                  <button
                    key={size}
                    className='border border-black/10 py-2 focus:bg-black focus:text-white focus:border-black'
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className='mt-6'>
              <span className='text-[12px] font-semibold'>Cor</span>
              <div className='mt-3 flex items-center gap-3'>
                {(product?.colors || []).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    className={`h-6 w-6 rounded-full border ${
                      selectedColor === c.id ? 'ring-2 ring-black ring-offset-2' : 'border-black/10'
                    }`}
                    style={{ backgroundColor: c.color }}
                    aria-label={`Cor ${c.label}`}
                  />
                ))}
              </div>
            </div>

            <div className='mt-6 flex items-center justify-between border border-black/10'>
              <button className='px-4 py-2 text-[14px]' onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                -
              </button>
              <span className='text-[12px]'>{quantity}</span>
              <button className='px-4 py-2 text-[14px]' onClick={() => setQuantity((q) => q + 1)}>
                +
              </button>
            </div>

            <button
              className='mt-4 w-full bg-black text-white py-3 text-[12px] tracking-[2px]'
              onClick={handleAddToCart}
              type='button'
            >
              ADICIONAR AO CARRINHO
            </button>

            <div className='mt-6 space-y-4 text-[12px]'>
              <div className='flex items-start gap-3'>
                <img className='h-8 w-8' src={IconEntrega} alt='Entregas gratis' />
                <div>
                  <p className='font-semibold text-[14px]'>Entregas gratis</p>
                  <p className='text-black/60'>Em encomendas acima de 100 EUR</p>
                </div>
              </div>
              <div className='flex items-start gap-3'>
                <img className='h-8 w-8' src={IconDevolucao} alt='Devolucoes' />
                <div>
                  <p className='font-semibold text-[14px]'>Devolucoes</p>
                  <p className='text-black/60'>Devolucoes simples e rapidas</p>
                </div>
              </div>
            </div>

            <div className='mt-8'>
              <h3 className='text-[13px] font-semibold'>Descricao de Produto</h3>
              <p className='text-[12px] text-black/70 mt-3'>{product?.description || 'Sem descricao.'}</p>
            </div>
          </div>
        </div>

        <div className='w-[90vw] mx-auto mt-12'>
          <details className='border-t border-black/10 py-4'>
            <summary className='cursor-pointer text-[16px] font-semibold flex items-center justify-between'>
              Descricao
              <span className='text-[14px]'>⌄</span>
            </summary>
          </details>
          <details className='border-t border-black/10 py-4'>
            <summary className='cursor-pointer text-[16px] font-semibold flex items-center justify-between'>
              Detalhes
              <span className='text-[14px]'>⌄</span>
            </summary>
          </details>
          <details className='border-t border-b border-black/10 py-4'>
            <summary className='cursor-pointer text-[16px] font-semibold flex items-center justify-between'>
              Tecnologia
              <span className='text-[14px]'>⌄</span>
            </summary>
          </details>
        </div>
      </section>

      <div className='w-[90vw] mx-auto mt-14'>
        <h3 className='text-[16px] font-semibold mb-6'>Produtos Recomendados</h3>
        <div>
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
            {(recommended.length > 0 ? recommended : [mapProductForDetails({}, 0)]).map((item, idx) => (
              <SwiperSlide key={`${item.id}-${idx}`}>
                <ProductCard
                  title={item.title}
                  color={item.cardColor}
                  price={formatPrice(item.price)}
                  oldPrice={item.compareAt > item.price ? formatPrice(item.compareAt) : null}
                  image={item.image}
                  to={`/productDetails/${encodeURIComponent(String(item.id || idx))}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductDetailsPage
