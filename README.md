# React + TypeScript + Vite + Jest - Personalizado por FM

Entiendo que esta no es la mejor práctica, pero para evitar complicaciones en la configuración o pérdida de tiempo, he hardcodeado la clave de Google que estoy utilizando. Sin embargo, planeo eliminarla en los próximos días.

**Desarrollo Local:**

- Ejecutar la aplicación: `npm run dev` (acceder en http://127.0.0.1:5173/)

**Pruebas:**

- Ejecutar pruebas: `npm run test`

## Descripción del Proyecto

Este proyecto está construido con Vite, React, TypeScript y Jest. Aquí tienes algunas características clave y decisiones de diseño:

- **Uso de Vite:** El proyecto aprovecha Vite, elegido por su rapidez y el deseo de explorar sus capacidades.
- **Componentes Reutilizables:** Una carpeta dedicada contiene componentes reutilizables para evitar la duplicación de código en toda la aplicación.
- **Estructura de Carpetas:**
  - `Home`: Contiene la página inicial donde se construye la primera pantalla.
  - `App`: Pensada para implementar rutas, autenticación y otras consideraciones de nivel superior.
- **Custom Hook (useHome):** La lógica para el componente `Home` se abstrae en un hook personalizado (`useHome`). Esto ayuda a gestionar la complejidad del código en `Home.tsx` y facilita pruebas unitarias más efectivas.
- **Pruebas Unitarias:** Aunque el esfuerzo para simular la autocompletación de Google para las pruebas presentó desafíos, se han implementado algunas pruebas unitarias. Las limitaciones de tiempo restringieron la extensión de las pruebas, dadas las obligaciones continuas con entregables y despliegues a producción.
