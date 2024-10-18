import React, { useState } from 'react';
import Mensaje from './Mensaje';

 const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState(''); 

    const handleUsuarioChange = (e) => setUsuario(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const download = async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            return data; 
    }

    const validateLogin = (data) => {
        const usuarioEncontrado = data.find(user => user.email === usuario); 

        if (!usuarioEncontrado) {
            setMensaje('Usuario incorrecto'); 
        } else if (usuarioEncontrado.username !== password) {
            setMensaje('Contraseña incorrecta'); 
        } else {
            setMensaje("Contraseña y usuario correctos "); 
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await download(); 
        if (data) {
            validateLogin(data); 
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="usuario">Usuario:</label>
                    <input type="text" id="usuario" value={usuario} onChange={handleUsuarioChange}/>
                </div>
                <div>
                    <label htmlFor="contraseña">Contraseña:</label>
                    <input type="password" id="contraseña" value={password} onChange={handlePasswordChange}/>
                </div>
                <button>Iniciar sesión</button>
            </form>
            <Mensaje mensaje={mensaje} />
        </div>
    );
};
 export default Login;