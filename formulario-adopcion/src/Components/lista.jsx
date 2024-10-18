import React from 'react';

function ListaMascotas({ mascotas, filtros, seleccionarMascota }) {
    function aplicarFiltros(mascota) {
        const { tipo, estado, edad, sexo } = filtros;
        return (
            (!tipo || mascota.tipo === tipo) &&
            (!estado || mascota.estado === estado) &&
            (!edad || mascota.edad === edad) &&
            (!sexo || mascota.genero === sexo) 
        );
    }

    const mascotasFiltradas = mascotas.filter(aplicarFiltros);

    return (
        <div className="lista-mascotas">
            <h2>Mascotas disponibles</h2>
            <div className="mascotas-grid">
                {mascotasFiltradas.length === 0 ? (
                    <p>No hay mascotas que coincidan con los filtros seleccionados.</p>
                ) : (
                    mascotasFiltradas.map((mascota) => (
                        <div key={mascota.id} className="mascota-card" onClick={() => seleccionarMascota(mascota)}>
                            <img src={mascota.imagen} alt={mascota.nombre} />
                            <h3>{mascota.nombre}</h3>
                            <p>Tipo: {mascota.tipo}</p>
                            <p>Estado: {mascota.estado}</p>
                            <p>Edad: {mascota.edad}</p>
                            <p>Sexo: {mascota.genero}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ListaMascotas;
