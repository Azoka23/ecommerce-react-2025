import './Item.css';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext'; 

export const Item=({ id, name, type, price, stock, image, children }) => {
    
    // Importo la función addToCart del Contexto
    const { addToCart } = useCartContext(); 
    const isOutOfStock = stock === 0;

    // Manejador del Evento de Agregar al Carrito
    const handleAddToCart = () => {
        //Crea el objeto asegurando que el ID sea String
        const productToAdd = { id: String(id), name, price, image, stock }; 
        
        // Enviamos el producto y la cantidad '1' (que es correcto para esta vista)
        addToCart(productToAdd, 1); 
    };
    
    return(
        <article className="product-card"> 
            
            <h2>{name} </h2>
            <p className="item-type">Tipo: {type}</p>
            <p className="item-price">Precio: **${price}**</p>
            
            <p className="item-stock" style={{ color: isOutOfStock ? 'red' : 'green' }}>
                Stock: {isOutOfStock ? 'Agotado' : stock}
            </p>
            
            <Link to={`/detail/${id}`}> 
                <button className="add-button" >
                    Ver Detalle
                </button>
            </Link>

            <button 
                className="add-button" 
                disabled={isOutOfStock}
                onClick={handleAddToCart}
            >
                {isOutOfStock ? 'SIN STOCK' : 'Enviar al Carrito'}
            </button>
        </article>
    );
};