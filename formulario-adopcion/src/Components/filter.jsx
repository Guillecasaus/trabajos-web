import React, { useState } from 'react';

function Filtros({ aplicarFiltros }) {
    const [tipo, setTipo] = useState('');
    const [estado, setEstado] = useState('');
    const [edad, setEdad] = useState('');
    const [sexo, setSexo] = useState('');

    function updateFilter(setter, valor) {
        setter(valor);
        aplicarFiltros({ [setter.name]: valor });
    }

    const handleApplyFilters = () => {
        aplicarFiltros({ tipo, estado, edad, sexo });
    };

    return (
        <div className="filtros">
            <h2>Filtrar mascotas</h2>

            <div>
                <label>Tipo:</label>
                <select value={tipo} onChange={(e) => updateFilter(setTipo, e.target.value)}>
                    <option value="">Todas</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                </select>
            </div>

            <div>
                <label>Estado:</label>
                <select value={estado} onChange={(e) => updateFilter(setEstado, e.target.value)}>
                    <option value="">Todos</option>
                    <option value="adopcion">Adopción</option>
                    <option value="disponible">Disponible</option>
                </select>
            </div>

            <div>
                <label>Edad:</label>
                <select value={edad} onChange={(e) => updateFilter(setEdad, e.target.value)}>
                    <option value="">Cualquier edad</option>
                    <option value="Cachorro">Cachorro</option>
                    <option value="Adulto">Adulto</option>
                </select>
            </div>

            <div>
                <label>Sexo:</label>
                <select value={sexo} onChange={(e) => updateFilter(setSexo, e.target.value)}>
                    <option value="">Cualquiera</option>
                    <option value="macho">Macho</option>
                    <option value="hembra">Hembra</option>
                </select>
            </div>
            <button onClick={handleApplyFilters}>Aplicar Filtros</button>
        </div>
    );
}

export default Filtros;
