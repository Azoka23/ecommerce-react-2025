// src/App.jsx



import { useState } from 'react' // 👈 Dejamos useState por si lo usa el componente Header/Nav
import './App.css'
import './components/Item/Item.css'; 
import './components/ItemList/ItemList.css'; 
import './components/ItemListContainer/ItemListContainer.css'; 
import { Checkout } from './components/Checkout/Checkout';
import { HomeButton } from './components/HomeButton/HomeButton';
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'; 
import ShoppingCart from './components/ShoppingCart/ShoppingCart';    
import './components/ShoppingCart/ShoppingCart.css'; 
import { CartProvider } from './context/CartContext'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx'; 
import { Login } from './components/Login/Login'; 
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'; 
import { OrderConfirmation } from './components/OrderConfirmation/OrderConfirmation';
import { Contacto } from './components/Contacto/Contacto'; 
import { Categorias } from './components/Categorias/Categorias'; 

function App() {
  
  return (
    <BrowserRouter>
      
      <AuthProvider>
        <CartProvider> 
          <div className="app-main-layout"> 
            
            <Header/>
            
            <Routes>
              {/* =================================================== */}
              {/* RUTAS PÚBLICAS */}
              {/* =================================================== */}
              
              <Route 
                path="/" 
                element={<ItemListContainer titulo={"Bienvenidos a la tienda de Cafe"} />}
              />
              
              <Route 
                path="/detail/:id"  
                element={<ItemDetailContainer titulo={"Bienvenidos a la tienda de Cafe"} />}
              />

              <Route path="/categorias" element={<Categorias />} />
              <Route path="/categorias/:categoriaId" element={<ItemListContainer titulo={"Productos Filtrados"} />} />
              <Route path="/contacto" element={<Contacto />} />

              
              <Route path="/login" element={<Login />} /> 
              
              {/* =================================================== */}
              {/* RUTAS PROTEGIDAS (Usamos ProtectedRoute) */}
              {/* =================================================== */}
              
             
              <Route 
                  path="/carrito" 
                  element={<ProtectedRoute element={<ShoppingCart />} />} 
              /> 
              
              
              <Route 
                  path="/checkout" 
                  element={<ProtectedRoute element={<Checkout />} />} 
              />

              {/* RUTA Order confirmation (Normalmente pública, ya que el carrito ya se vació) */}
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
              
            </Routes>
            
            <Footer/>
            <HomeButton /> 
          </div>
        </CartProvider> 
      </AuthProvider>
    </BrowserRouter>
  );
}
export default App