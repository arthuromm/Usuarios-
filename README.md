### `README.md`

```md
# Pagina Panteras

Este es el frontend para una aplicación web llamada **Pagina Panteras**. El proyecto está desarrollado utilizando **Next.js** y **Bootstrap** para el diseño y la maquetación. Aquí se muestran diferentes páginas como **Blog**, **Universidades**, y **Usuarios**.

## Tecnologías Utilizadas

- **Next.js 13**: Framework de React para aplicaciones web modernas.
- **React**: Librería de JavaScript para construir interfaces de usuario.
- **Bootstrap 5**: Framework de CSS para diseño responsivo y componentes estilizados.
- **Axios**: Librería para hacer peticiones HTTP desde el frontend.

## Requisitos previos

Asegúrate de tener instalado lo siguiente:

- **Node.js** (versión 14 o superior)
- **npm** (generalmente viene con Node.js)

## Configuración del Proyecto

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

### 1. Clonar el repositorio

Clona este repositorio en tu máquina local.

```bash
git clone https://github.com/tu-usuario/pagina-panteras.git
cd pagina-panteras
```

### 2. Instalar dependencias

Instala todas las dependencias necesarias para el proyecto.

```bash
npm install
```

### 3. Ejecutar el proyecto

Ejecuta el siguiente comando para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Esto debería abrir la aplicación en tu navegador en la dirección `http://localhost:3000`.

## Estructura de Carpetas

```
src/
├── app/
│   ├── blog/
│   ├── universidades/
│   ├── usuarios/
│   │   └── [id]/  # Página dinámica para mostrar detalles de usuarios
│   ├── layout.js  # Layout principal con NavBar y scripts de Bootstrap
│   └── page.jsx   # Página de inicio
├── components/
│   └── menu.jsx   # Componente NavBar
└── public/
    └── favicon.ico
```

### Archivos importantes

- **`src/app/layout.js`**: Contiene el layout principal con la inclusión de Bootstrap y el NavBar.
- **`src/components/menu.jsx`**: Contiene la barra de navegación (NavBar).
- **`src/app/usuarios/[id]/page.jsx`**: Página dinámica que muestra la información detallada de los usuarios.

## Código del Layout principal (`src/app/layout.js`)

```javascript
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/components/menu";
import Script from "next/script";

export const metadata = {
  title: "Pagina Panteras",
  description: "Es el Frontend para una aplicacion web"
};

export default function RootLayout({ children }) {
  return (
    <html lang="es"> {/* Añadido el atributo lang para accesibilidad */}
      <body>
        <NavBar />
        {children}
        
        {/* Cargar Popper.js */}
        <Script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
          integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />

        {/* Cargar Bootstrap JS */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
          integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
```

Este archivo configura el layout principal de tu aplicación con **Bootstrap** y el **NavBar**. También se asegura de cargar los scripts necesarios para que Bootstrap funcione correctamente.

## Página Dinámica para Detalles de Usuario (`src/app/usuarios/[id]/page.jsx`)

Este es el código de la página dinámica que muestra los detalles de cada usuario basados en su `id`.

```javascript
"use client"; // Indica que este componente es un Client Component

import axios from "axios";
import { useParams } from "next/navigation"; // Usar useParams para obtener el parámetro de la URL
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap"; // Para mostrar un spinner de carga

export default function Usuario() {
  const { id } = useParams(); // Capturamos el parámetro 'id' de la URL usando useParams
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario

  // useEffect para obtener los datos del usuario cuando el 'id' esté disponible
  useEffect(() => {
    if (id) {
      // Llamada a la API para obtener los detalles del usuario por ID
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((response) => {
          setUser(response.data); // Guardamos los datos del usuario en el estado
        })
        .catch((error) => {
          console.error("Error al obtener el usuario:", error); // Manejamos cualquier error
        });
    }
  }, [id]); // Este efecto se ejecutará cada vez que 'id' cambie

  // Si los datos del usuario aún no están disponibles, mostramos un mensaje de carga
  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </div>
    );
  }

  // Cuando los datos están disponibles, los mostramos
  return (
    <div className="container my-5">
      <div className="card shadow-lg p-3 mb-5 bg-body rounded">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Información del Usuario</h2>
          <div className="row">
            <div className="col-md-6">
              <h5><strong>ID:</strong> {user.id}</h5>
              <h5><strong>Nombre:</strong> {user.name}</h5>
              <h5><strong>Username:</strong> {user.username}</h5>
              <h5><strong>Email:</strong> <a href={`mailto:${user.email}`} className="text-decoration-none">{user.email}</a></h5>
            </div>
            <div className="col-md-6">
              <h5><strong>Teléfono:</strong> {user.phone}</h5>
              <h5><strong>Sitio Web:</strong> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">{user.website}</a></h5>
              <h5><strong>Compañía:</strong> {user.company.name}</h5>
              <h5><strong>Dirección:</strong> {`${user.address.street}, ${user.address.city}`}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Explicación del código:

1. **`useParams`**: Captura el parámetro dinámico `id` desde la URL.
2. **`axios`**: Se utiliza para obtener los detalles del usuario desde la API de JSONPlaceholder.
3. **Estilos de Bootstrap**: Utiliza tarjetas de **Bootstrap** para mostrar los detalles del usuario de forma elegante.
4. **Spinner de Carga**: Se muestra un spinner de carga mientras se obtienen los datos del usuario.

## Características

- **Página de inicio**: Incluye navegación a las secciones del sitio web.
- **Usuarios**: Muestra una lista de usuarios y, al hacer clic en un nombre, se muestran los detalles completos del usuario utilizando rutas dinámicas en Next.js.
- **Universidades**: Página estática que muestra una lista de universidades en México (o puedes personalizarla).
- **Diseño Responsive**: Se utiliza Bootstrap para asegurar que la aplicación sea completamente responsiva en dispositivos móviles, tablets y desktops.

## Scripts de Bootstrap

Se utilizan los siguientes scripts para habilitar la funcionalidad de **Bootstrap**:

```html
<Script
  src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
  integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
  crossOrigin="anonymous"
  strategy="beforeInteractive"
/>
<Script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
  integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9q

BBavbLwCsOGabYfZo0T0to5eqruptLy"
  crossOrigin="anonymous"
  strategy="beforeInteractive"
/>
```

## Dependencias

- **React**: ^18.x
- **Next.js**: ^13.x
- **Axios**: ^1.x
- **Bootstrap**: ^5.3.x
- **react-bootstrap**: ^2.x

## Contribuciones

Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un **fork** del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Agregar nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un **pull request**.

## Contacto

Si tienes alguna duda o sugerencia, no dudes en contactarme:

- **Correo**: [tu-correo@ejemplo.com](arthurelpro2025@gmail.com)
- **GitHub**: [https://github.com/tu-usuario](https://github.com/arthuromm)
```

### Resumen:
Este archivo **`README.md`** contiene toda la información que necesitas para documentar tu proyecto, incluyendo:
- Instrucciones de configuración.
- Estructura del proyecto.
- Código importante (Layout y páginas dinámicas).
- Características principales del proyecto.
- Contacto para contribuciones.

Este formato te ayudará a comunicar claramente cómo usar, configurar y contribuir a tu proyecto. ¡Déjame saber si necesitas más ayuda!
