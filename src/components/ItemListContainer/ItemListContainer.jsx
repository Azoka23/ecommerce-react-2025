// src/components/ItemListContainer/ItemListContainer.jsx (CORREGIDO)

import React, { useState, useEffect } from 'react';
import { ItemList } from '../ItemList/ItemList';
import { useParams } from 'react-router-dom'; // 👈 1. NECESARIO: Importar useParams
import './ItemListContainer.css'; 

export const ItemListContainer = ({ titulo }) => {
    
    // Leer el parámetro de la URL
    const { categoriaId } = useParams(); 
    
    const [listProducts, setListProducts] = useState([]); 
    
    
    useEffect(() => {
        
        
        fetch("/data/productos.json") 
            .then(res => {
                
                if (!res.ok) {
                    throw new Error("Hubo un problema al buscar productos: " + res.status);
                }
                
                return res.json();
            })
            .then(data => {
                
                let productosFiltrados = data;
                
                
                if (categoriaId) {
                    
                    productosFiltrados = data.filter(
                        (product) => product.type === categoriaId
                    );
                }
                
                setListProducts(productosFiltrados);
            })
            .catch(err => {
                
                console.error("Error en la carga de productos:", err);
            
            });
            
    //  La dependencia debe incluir categoriaId. 
    // Esto hace que el efecto se ejecute cada vez que el filtro cambia en la URL.
    }, [categoriaId]); 



    const displayTitle = categoriaId 
        ? `Categoría: ${categoriaId.toUpperCase()}`
        : titulo;

    return (
        <section className="item-list-container">
            <h1>{displayTitle}</h1>
            
           
            {listProducts.length > 0 ? (
                <ItemList 
                    lista={listProducts} 
                
                />
            ) : (
                
                <p>Cargando productos o no hay productos en esta categoría...</p>
            )}
        </section>
    );
};