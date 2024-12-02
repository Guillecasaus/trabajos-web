import { NextResponse } from 'next/server';

// Endpoint del backend
const BACKEND_API_URL = 'https://bildy-rpmaya.koyeb.app/api/project';

export async function POST(request) {
  try {
    // Leer el cuerpo de la solicitud
    const body = await request.json();

    // Intentar obtener el token desde las cookies
    const token = request.cookies.get('jwt'); // Ajusta este nombre según cómo guardes el token

    // Validar que el token existe
    if (!token) {
      console.error('No se encontró el token en las cookies.');
      return NextResponse.json(
        { error: 'No se encontró el token de autenticación' },
        { status: 401 }
      );
    }

    console.log('Token obtenido:', token);

    // Verificar que se proporciona un código de cliente
    if (!body.codigoCliente) {
      return NextResponse.json(
        { error: 'El código del cliente es obligatorio para crear un proyecto' },
        { status: 400 }
      );
    }

    // Realizar la solicitud al backend con el token de autorización
    const response = await fetch(BACKEND_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`, // Usa `token.value` para obtener el valor del token
      },
      body: JSON.stringify({
        nombreProyecto: body.nombreProyecto,
        codigoCliente: body.codigoCliente, // Asociar el proyecto al cliente
        direccionCliente: body.direccionCliente,
        emailCliente: body.emailCliente,
        codigoInterno: body.codigoInterno,
      }),
    });

    // Verificar el tipo de contenido de la respuesta
    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      console.error(`Error al enviar solicitud al backend: ${response.status}`);
      // Si el backend no devuelve JSON, obtener la respuesta como texto
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        return NextResponse.json(
          { error: errorData.message || 'Error al crear el proyecto en el backend' },
          { status: response.status }
        );
      } else {
        const errorText = await response.text();
        return NextResponse.json(
          { error: errorText || 'Error inesperado en el backend' },
          { status: response.status }
        );
      }
    }

    // Si la respuesta es JSON válido, procesarla normalmente
    if (contentType && contentType.includes('application/json')) {
      const responseData = await response.json();
      return NextResponse.json(responseData, { status: 201 });
    } else {
      // Si la respuesta no es JSON, manejar como texto exitoso
      const responseText = await response.text();
      return NextResponse.json({ message: responseText }, { status: 201 });
    }
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
