// src/components/ItemDetailContainer/ItemDetailContainer.jsx

import React, { useState, useEffect } from 'react';
import { ItemDetail } from '../ItemDetail/ItemDetail';
import { useParams } from 'react-router-dom';


export const ItemDetailContainer = () => { 
    
    //  Obtener el ID de la URL
    const { id } = useParams(); 

    //  Estado del Producto
    const [itemDetail, setItemDetail] = useState(null);
    const itemId = id; 
    
    //  Efecto para la carga de datos
    useEffect(() => {
        
        
        fetch("/data/productos.json") 
            .then(res => {
                
                if (!res.ok) {
                    throw new Error("Error HTTP: " + res.status);
                }
                return res.json();
            })
            .then(products => {
                
                //const foundProduct = products.find(p => p.id === itemId);
const foundProduct = products.find(p => String(p.id) === String(itemId));

                setTimeout(() => {
                    if (foundProduct) {
                        setItemDetail(foundProduct);
                    } else {
                        console.error(`Producto con ID ${itemId} no encontrado.`);
                    }
                }, 1500); 
            })
            .catch(err => {
                console.error("Error al cargar detalle:", err);
            });
            
    }, [itemId]); 


    
    return (
        <section className="item-detail-container">
            
            
            {itemDetail ? (
                
                <ItemDetail 
                    {...itemDetail} 
                     
                />
            ) : (
                <h2>Cargando detalle del producto...</h2>
            )}
        </section>
    );
};
