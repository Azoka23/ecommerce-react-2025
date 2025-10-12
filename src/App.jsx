// src/App.jsx

// 1. IMPORTACIONES: Solo usamos useState si lo necesitamos en App, pero el hook lo usa.

import { useState } from 'react' // 👈 Dejamos useState por si lo usa el componente Header/Nav
import './App.css'
import './components/Item/Item.css'; 
import './components/ItemList/ItemList.css'; 
import './components/ItemListContainer/ItemListContainer.css'; 
import { Checkout } from './components/Checkout/Checkout';
import { HomeButton } from './components/HomeButton/HomeButton'; 
// Imports de la Tienda
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { ItemListContainer } from './components/ItemListContainer/itemListContainer';
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'; 

// Imports del Carrito (Asumo que la ruta con 'H' mayúscula es correcta)
                      
import ShoppingCart from './components/ShoppingCart/ShoppingCart';    // 👈 IMPORTACIÓN SIN LLAVES (default export)
import './components/ShoppingCart/ShoppingCart.css'; 
import { CartProvider } from './context/CartContext'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { Contacto } from './components/Contacto/Contacto'; 
import { Categorias } from './components/Categorias/Categorias'; 

function App() {
  
  // 👈 1. CLAVE: INICIALIZAR EL HOOK para usar sus variables
  //const { cart, addToCart, clearCart, isCartVisible, toggleCartVisibility } = useCart();

  return (
    <>
    <CartProvider> 
    <BrowserRouter>
      <div className="app-main-layout"> 
        
        {/* 2. HEADER: Pasar la función para abrir el carrito */}
        <Header/>
        
        <Routes>
          <Route path="/" element={<ItemListContainer 
          titulo={"Bienvenidos a la tienda de Cafe"}
           />}
          />
        
          <Route path="/detail/:id"  element={<ItemDetailContainer
          titulo={"Bienvenidos a la tienda de Cafe"}
          />}
        
        />

        
        
        {/*  RUTA Categorías */}
            <Route path="/categorias" element={<Categorias />} />
            
            <Route path="/categorias/:categoriaId" element={<ItemListContainer 
            titulo={"Productos Filtrados"}
             
          />} />
            
             {/*  RUTA  Checkout */}
            <Route path="/checkout" element={<Checkout />} />
            
            {/*  RUTA  Contacto */}
            <Route path="/contacto" element={<Contacto />} />
        </Routes>
        <Footer/>
        <HomeButton /> 
        
        <ShoppingCart
      
        />
        
      </div>
</BrowserRouter>
</CartProvider> 
    </>
  );
}

export default App