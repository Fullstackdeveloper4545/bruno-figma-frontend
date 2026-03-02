import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import ProductsPage from './ProductsPage.jsx'
import ProductDetailsPage from './ProductDetailsPage.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/productDetails" element={<ProductDetailsPage />} />

      </Routes>
    </Router>
  </StrictMode>,
)
