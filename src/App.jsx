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

import { OrderConfirmation } from './components/OrderConfirmation/OrderConfirmation';
import { Contacto } from './components/Contacto/Contacto'; 
import { Categorias } from './components/Categorias/Categorias'; 

function App() {
  
  // INICIALIZAR EL HOOK para usar sus variables
  //const { cart, addToCart, clearCart, isCartVisible, toggleCartVisibility } = useCart();

  return (
    <>
   
    <BrowserRouter>
     <CartProvider> 
      <div className="app-main-layout"> 
        
        {/*  HEADER: Pasar la función para abrir el carrito */}
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
          {/*  RUTA  shoppingCart */}
          <Route path="/carrito" element={<ShoppingCart />} /> 
            
             {/*  RUTA  Checkout */}
            <Route path="/checkout" element={<Checkout />} />

{/*  RUTA  Order confirmation */}
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            
            {/*  RUTA  Contacto */}
            <Route path="/contacto" element={<Contacto />} />
        </Routes>
        <Footer/>
        <HomeButton /> 
        
       
        
      </div>
      </CartProvider> 
</BrowserRouter>

    </>
  );
}

export default App