import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProductsPage from './ProductsPage.jsx'
import ProductDetailsPage from './ProductDetailsPage.jsx'
<<<<<<< HEAD
=======
import CheckoutPage from './CheckoutPage.jsx'
import ThankYouPage from './ThankYouPage.jsx'
import BlogsPage from './BlogsPage.jsx'
>>>>>>> d1204b0 (frontend)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<ProductsPage />} />
<<<<<<< HEAD
        <Route path="/productDetails" element={<ProductDetailsPage />} />

=======
        <Route path="/blog" element={<BlogsPage />} />
        <Route path="/productDetails" element={<ProductDetailsPage />} />
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path='/thank-you' element={<ThankYouPage/>}/>
        <Route path='/blogs' element={<BlogsPage/>}/>
>>>>>>> d1204b0 (frontend)
      </Routes>
    </Router>
  </StrictMode>,
)
