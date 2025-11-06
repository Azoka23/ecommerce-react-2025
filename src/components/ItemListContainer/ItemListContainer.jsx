// src/components/ItemListContainer/ItemListContainer.jsx (CORREGIDO)

// src/components/ItemListContainer/ItemListContainer.jsx - ¡VERSIÓN FINAL CON SERVICIO MOCKAPI!

import React, { useState, useEffect } from 'react';
import { ItemList } from '../ItemList/ItemList';
import { useParams } from 'react-router-dom';
import { getProducts } from '../../services/Products'; // 🛑 CLAVE: Importar la función getProducts
import './ItemListContainer.css'; 

export const ItemListContainer = ({ titulo }) => {
    
    const { categoriaId } = useParams(); 
    const [listProducts, setListProducts] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); // Manejo de carga
    const [error, setError] = useState(null);       // Manejo de errores
    
    
    useEffect(() => {
        setIsLoading(true); 
        setError(null);    
        
        // 🛑 Lógica limpia: Llamamos al servicio con el filtro
        getProducts(categoriaId) // Le pasamos directamente el categoryId (puede ser null)
            .then(data => {
                setListProducts(data);
            })
            .catch(err => {
                // Captura y muestra el error de red o del API
                console.error("Error al cargar productos en el componente:", err);
                setError("No se pudieron cargar los productos. Intenta más tarde.");
            })
            .finally(() => {
                setIsLoading(false); // Finalizar la carga
            });
            
    // Se ejecuta cada vez que el filtro de la URL cambia (Home o /categoria/X)
    }, [categoriaId]); 


    const displayTitle = categoriaId 
        ? `Categoría: ${categoriaId.toUpperCase()}`
        : titulo;

    return (
        <section className="item-list-container">
            <h1>{displayTitle}</h1>
            
            {isLoading && <p>Cargando productos...</p>}
            
            {error && <p className="error-message">⚠️ Error: {error}</p>}
           
            {/* Mostrar lista solo si no está cargando y no hay error */}
            {!isLoading && !error && listProducts.length > 0 && (
                <ItemList 
                    lista={listProducts} 
                />
            )}
            
            {/* Mensaje cuando no hay productos */}
            {!isLoading && !error && listProducts.length === 0 && (
                <p>No hay productos disponibles en esta categoría.</p>
            )}
        </section>
    );
};