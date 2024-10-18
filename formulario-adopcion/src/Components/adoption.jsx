import { useState, useEffect } from 'react';

function useAdopcion() {
    const [mascotas, setMascotas] = useState([]);
    const [filtros, setFiltros] = useState({
        tipo: '',
        estado: '',
        edad: '',
        sexo: '',
    });
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

    useEffect(() => {
        const obtenerMascotas = async () => {
            console.log("Función obtenerMascotas llamada");
            try {
                const respuesta = await fetch('https://huachitos.cl/api/animales');
                const data = await respuesta.json();
                console.log('Respuesta de la API:', data);
        
                if (Array.isArray(data.data)) {
                    setMascotas(data.data); 
                } else {
                    console.error('La respuesta no contiene un array de mascotas:', data);
                }
            } catch (error) {
                console.error('Error al obtener mascotas:', error);
            }
        };
        obtenerMascotas(); 
    }, []);
    
    

    function aplicarFiltros(nuevosFiltros) {
        setFiltros((prevFiltros) => ({
            ...prevFiltros,
            ...nuevosFiltros,
        }));
    }

    function seleccionarMascota(mascota) {
        setMascotaSeleccionada(mascota);
    }

    return {
        mascotas,
        filtros,
        mascotaSeleccionada,
        aplicarFiltros,
        seleccionarMascota,
    };
}

export default useAdopcion;
