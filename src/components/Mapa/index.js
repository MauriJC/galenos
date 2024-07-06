import React, { useState, useEffect } from 'react';

const MapaCalor = () => {
    const [base64String, setBase64String] = useState('');
  
    useEffect(() => {
      const fetchImagen = async () => {
        try {
          const response = await fetch('http://localhost:3001/mapadecalor');
          const data = await response.json();
          if (data.imagen_base64) {
            setBase64String(data.imagen_base64);
          } else {
            console.error('No se recibió ninguna imagen válida desde el servidor.');
          }
        } catch (error) {
          console.error('Error al obtener la imagen desde el servidor:', error);
        }
      };
  
      fetchImagen();
    }, []); // La dependencia vacía [] asegura que useEffect se ejecute solo una vez al montar el componente
  
    return (
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          {base64String && (
              <img
                  src={`data:image/png;base64,${base64String}`}
                  alt="Mapa de Calor"
                  style={{ maxWidth: '100%', height: 'auto' }}
              />
          )}
      </div>
  );
};
  
  export default MapaCalor;