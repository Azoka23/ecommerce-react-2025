// src/App.jsx
import './App.css'
import './components/Item/Item.css'; 
import './components/ItemList/ItemList.css'; 
import './components/ItemListContainer/ItemListContainer.css'; 
import './components/ShoppingCart/ShoppingCart.css'; 

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CartProvider } from './context/CartContext.jsx'; 
import { AuthProvider } from './context/AuthContext.jsx'; 
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'; 

import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'; 
import ShoppingCart from './components/ShoppingCart/ShoppingCart';    
import { Checkout } from './components/Checkout/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation/OrderConfirmation';
import { Contacto } from './components/Contacto/Contacto';
import { Login } from './components/Login/Login.jsx'; 
import { Register } from './components/Register/Register';
import { AdminDashboard } from './adminComponents/AdminDashboard/AdminDashboard';
import {ShopLayout}  from "./adminComponents/AdminLayout/ShopLayout";
import { AdminLayout } from "./adminComponents/AdminLayout/AdminLayout";
import { ProductFormContainer } from "./adminComponents/ProductFormContainer/ProductFormContainer";
 import { ProductList } from "./adminComponents/ProductList/ProductList";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>

          <Routes>

            {/* 🟤 LAYOUT TIENDA (Header + Footer + HomeButton) */}
            <Route element={<ShopLayout />}>
              <Route path="/" element={<ItemListContainer titulo="Bienvenidos a la tienda de Cafe" />} />
              <Route path="/detail/:id" element={<ItemDetailContainer />} />
              <Route path="/categoria/:categoriaId" element={<ItemListContainer />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/carrito" element={<ProtectedRoute element={<ShoppingCart />} />} />
              <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            </Route>

            {/* 🔐 LAYOUT ADMIN (SIN Header/Footer) */}
            <Route
              path="/admin"
              element={<ProtectedRoute element={<AdminLayout />} requiredRole="administrador" />}
            >
              <Route index element={<AdminDashboard />} />
            

<Route path="productos/crear" element={<ProductFormContainer />} />
<Route path="productos/editar/:id" element={<ProductFormContainer />} />
<Route path="productos/lista" element={<ProductList />} />

            </Route>

            {/* RUTAS SIN LAYOUT (login y register no llevan header ni sidebar) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

          </Routes>

        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

