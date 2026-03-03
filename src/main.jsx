import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProductsPage from './ProductsPage.jsx'
import ProductDetailsPage from './ProductDetailsPage.jsx'
import CartPage from './CartPage.jsx'
import CheckoutPage from './CheckoutPage.jsx'
import ThankYouPage from './ThankYouPage.jsx'
import BlogsPage from './BlogsPage.jsx'
import BlogDetails from './BlogDetails.jsx'
import ThankuMessagePage from './ThankuMessagePage.jsx'
import ContactPage from './ContactPage.jsx'
import AboutUsPage from './AboutUsPage.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/productDetails" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route path='/thank-you' element={<ThankYouPage/>}/>
        <Route path='/blogs' element={<BlogsPage/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
        <Route path='/blogDetails' element={<BlogDetails/>}/>
        <Route path='/thanku-message' element={<ThankuMessagePage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/about-us' element={<AboutUsPage/>}/>
      </Routes>
    </Router>
  </StrictMode>,
)
