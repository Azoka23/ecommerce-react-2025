// src/services/Products.js

// 🛑 CLAVE: Tu URL de MockAPI con el recurso 'products'
const BASE_URL = "https://6900bbebff8d792314bb350a.mockapi.io/products"; 

// --- 1. FUNCIÓN PARA LEER TODOS LOS PRODUCTOS Y/O FILTRAR POR CATEGORÍA (READ) ---
// 🛑 MODIFICADA para aceptar categoryId
export const getProducts = async (categoryId = null) => {
    
    // 1. Construir la URL con el filtro si existe
    let url = BASE_URL;
    
    if (categoryId) {
        // MockAPI permite buscar por campo: ?type=valor
        url = `${BASE_URL}?type=${categoryId}`; 
    }
    
    const res = await fetch(url); // 🛑 Usamos la URL ajustada

    if (!res.ok) {
        // El error es más detallado, incluyendo la URL que falló
        throw new Error(`No se pudo obtener la lista de productos de: ${url}`);
    }
    
    return res.json();
};

// --- 2. FUNCIÓN PARA CREAR UN PRODUCTO (CREATE) ---
// Estructura adaptada de tus notas
export const createProduct = async (product) => {
    
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        // Enviamos el objeto producto como una cadena JSON
        body: JSON.stringify(product), 
    });

    if (!res.ok) {
        throw new Error("No se pudo crear el producto.");
    }

    // El resultado es el nuevo producto, incluyendo el ID asignado por MockAPI
    const result = await res.json();
    return result;
};

// --- 3. FUNCIÓN PARA ACTUALIZAR UN PRODUCTO (UPDATE) ---
export const updateProduct = async (id, updatedFields) => {
    
    const URL_WITH_ID = `${BASE_URL}/${id}`; 
    
    const res = await fetch(URL_WITH_ID, {
        method: "PUT", // Método para modificar recursos existentes
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
    });

    if (!res.ok) {
        throw new Error(`No se pudo actualizar el producto con ID: ${id}`);
    }

    const result = await res.json();
    return result;
};

// --- 4. FUNCIÓN PARA ELIMINAR UN PRODUCTO (DELETE) ---
export const deleteProduct = async (id) => {
    
    const URL_WITH_ID = `${BASE_URL}/${id}`;
    
    const res = await fetch(URL_WITH_ID, {
        method: "DELETE", // Método para eliminar recursos
    });

    if (!res.ok) {
        throw new Error(`No se pudo eliminar el producto con ID: ${id}`);
    }

    // Devuelve un indicador de éxito
    return { success: true, id }; 
    };



// --- 5. FUNCIÓN PARA LEER UN SOLO PRODUCTO POR ID (READ ONE) ---
export const getProductById = async (id) => {
    
    // 🛑 CLAVE: MockAPI busca un solo recurso con la URL base / ID
    const URL_WITH_ID = `${BASE_URL}/${id}`; 
    
    const res = await fetch(URL_WITH_ID);

    if (!res.ok) {
        throw new Error(`No se pudo obtener el producto con ID: ${id}. URL: ${URL_WITH_ID}`);
    }
    
    // Devuelve el objeto de producto individual
    return res.json(); 
};


