# ¿Qué es Lazy Loading (Carga Diferida)?

**Lazy Loading** (o carga diferida / perezosa) es un patrón de diseño y optimización de rendimiento web que consiste en **retrasar la carga de un recurso** (archivos JavaScript, componentes, imágenes, videos o datos) hasta el momento exacto en que el usuario realmente lo necesita o está a punto de visualizarlo.

Su contraparte es el **Eager Loading** (carga inmediata), donde todo se descarga al inicio, aumentando drásticamente los tiempos de carga inicial.

---

## 1. Principales Ventajas

* **Menor tiempo de carga inicial:** Reduce el tamaño del paquete inicial (bundle JS) que el navegador debe descargar y parsear.
* **Ahorro de ancho de banda:** No descarga recursos de secciones o pestañas que el usuario quizá nunca visite.
* **Mejora en Core Web Vitals:** Optimiza métricas clave como el FCP (*First Contentful Paint*) y el TTI (*Time to Interactive*).

---

## 2. Lazy Loading en React (`React.lazy`)

Permite dividir el código (*Code Splitting*) a nivel de componente mediante importaciones dinámicas (`import()`). 

El código del componente no se descarga en el bundle principal, sino en un archivo separado (*chunk*) que se solicita por red solo cuando el componente se va a renderizar. Debe envolverse siempre con `<Suspense>`.

```jsx
import React, { Suspense, lazy } from "react";

// El código de "GraficoComplejo" solo se descarga cuando se renderice
const GraficoComplejo = lazy(() => import("./GraficoComplejo"));

function Dashboard() {
  const [mostrarGrafico, setMostrarGrafico] = React.useState(false);

  return (
    <div>
      <button onClick={() => setMostrarGrafico(true)}>
        Ver Estadísticas
      </button>

      {mostrarGrafico && (
        <Suspense fallback={<div>Cargando gráfico...</div>}>
          <GraficoComplejo />
        </Suspense>
      )}
    </div>
  );
}
```

---

## 3. Lazy Loading en React Router (Propiedad `lazy`)

A partir de React Router v6.4+ y v7, puedes aplicar lazy loading no solo al componente de la ruta, sino también a sus funciones `loader`, `action` y `ErrorBoundary`:

```jsx
// router.jsx
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "admin",
        // Carga diferida de la página y sus funciones de datos
        lazy: () => import("./pages/AdminPage"),
      },
    ],
  },
]);
```

En el archivo de la página (`AdminPage.jsx`):
```jsx
// AdminPage.jsx
export async function loader() {
  return fetchAdminData();
}

export function Component() {
  return <h1>Panel de Administración</h1>;
}

export function ErrorBoundary() {
  return <p>Error al cargar el panel de admin</p>;
}
```
*React Router descargará el archivo `AdminPage.jsx` solo cuando el usuario navegue hacia `/admin`.*

---

## 4. Lazy Loading Nativo en HTML (Imágenes e Iframes)

Los navegadores modernos soportan carga diferida de forma nativa con el atributo `loading="lazy"`:

```html
<!-- Solo descarga la imagen cuando está cerca de entrar en el viewport -->
<img src="foto-grande.jpg" alt="Paisaje" loading="lazy" width="800" height="600" />

<!-- Aplica igual a iframes (videos de YouTube, mapas, etc.) -->
<iframe src="https://maps.google.com/..." loading="lazy"></iframe>
```

> **Regla de oro con imágenes:** Nunca uses `loading="lazy"` en la imagen principal o "Hero image" de la pantalla inicial (LCP), ya que retrasaría la carga inicial visible.

---

## 5. ¿Cuándo usarlo y cuándo no?

### ✅ Cuándo usar Lazy Loading:
1. **Rutas secundarias:** Páginas a las que no todos los usuarios entran de inmediato (e.g. Configuración, Perfil, Panel de Admin).
2. **Modales y Diálogos pesados:** Ventanas emergentes con formularios complejos o visores PDF.
3. **Librerías voluminosas:** Editores de texto enriquecido (Rich Text / WYSIWYG), librerías de gráficos (Chart.js, D3) o generadores de reportes.
4. **Imágenes "Below the fold":** Cualquier contenido visual que requiera scroll para ser visto.

### ❌ Cuándo NO usar Lazy Loading:
1. **La pantalla principal o vista inicial:** Retrasará la primera impresión del usuario.
2. **Componentes muy pequeños:** El costo de hacer una petición de red adicional supera el beneficio del ahorro de bytes.
