import React, { useState, useEffect } from 'react';
import api from '../../apis';

const MapaCalor = () => {
    const [base64String, setBase64String] = useState('');
  
    useEffect(() => {
      const fetchImagen = async () => {
        try {
          const headers = { "Content-Type": "application/json" };

          const response = await api.get(`/mapadecalor`, { headers });

          if (response.data.imagen_base64) {
            setBase64String(response.data.imagen_base64);
          } else {
            console.error('No se recibió ninguna imagen válida desde el servidor.');
          }
        } catch (error) {
          console.error('Error al obtener la imagen desde el servidor:', error);
        }
      };
  
      fetchImagen();
    }, []); 
  
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
