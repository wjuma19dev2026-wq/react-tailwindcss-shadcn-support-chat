# ¿Qué es y cómo funciona `Suspense` en React?

`<Suspense>` es un componente nativo de React que permite coordinar el estado de carga de componentes hijos que dependen de operaciones asíncronas, mostrando una interfaz provisional (*fallback*) como un spinner o un skeleton mientras el contenido se resuelve.

---

## 1. Sintaxis Básica

```jsx
import { Suspense } from "react";

<Suspense fallback={<LoadingSpinner />}>
  <PerfilUsuario />
</Suspense>
```

* **`fallback`**: Elemento JSX que se renderiza inmediatamente mientras los componentes hijos estén en estado pendiente (*suspended*).
* **`children`**: Los componentes que realizan operaciones asíncronas. Una vez que terminan de cargar, el `fallback` desaparece y se monta el contenido final.

---

## 2. ¿Cómo funciona por debajo?

El mecanismo interno de Suspense funciona de la siguiente manera:

1. Un componente hijo intenta renderizarse y necesita un recurso que aún no está listo.
2. El componente **"suspende" la renderización** arrojando internamente una `Promise` (similar a cómo se arroja un error con `throw`).
3. El `<Suspense>` más cercano en el árbol atrapa esa promesa, detiene el render del hijo y muestra el `fallback`.
4. Cuando la `Promise` se resuelve (`resolve`), React vuelve a intentar renderizar el componente hijo, esta vez con los datos o código ya disponibles.

---

## 3. Principales Casos de Uso

### A. Carga diferida de componentes (*Code Splitting* con `React.lazy`)
Permite dividir el bundle para descargar el código del componente solo cuando el usuario lo necesita:

```jsx
import React, { Suspense, lazy } from "react";

// El archivo del componente se descarga bajo demanda
const Dashboard = lazy(() => import("./Dashboard"));

function App() {
  return (
    <Suspense fallback={<p>Cargando módulo...</p>}>
      <Dashboard />
    </Suspense>
  );
}
```

---

### B. Suspense con React Router (`defer` y `<Await>`)
En React Router (v6/v7 con Data Routers), se combina con `defer()` y `<Await>` para renderizar partes críticas de la página de inmediato mientras las partes secundarias más lentas se cargan en streaming:

```jsx
import { Suspense } from "react";
import { useLoaderData, Await } from "react-router-dom";

export function Perfil() {
  const { datosCriticos, estadisticasLentas } = useLoaderData();

  return (
    <div>
      {/* Datos críticos disponibles al instante */}
      <h1>{datosCriticos.nombre}</h1>

      {/* Datos secundarios no bloqueantes */}
      <Suspense fallback={<p>Cargando estadísticas...</p>}>
        <Await resolve={estadisticasLentas}>
          {(stats) => <Estadisticas data={stats} />}
        </Await>
      </Suspense>
    </div>
  );
}
```

---

### C. Consumo de Promesas con el hook `use` (React 19)
En las versiones más recientes de React, puedes suspender directamente al consumir una promesa dentro de un componente usando la función `use()`:

```jsx
import { use, Suspense } from "react";

function DetalleProducto({ promiseProducto }) {
  // `use` suspende automáticamente el componente hasta que la promesa resuelva
  const producto = use(promiseProducto);
  return <h2>{producto.titulo}</h2>;
}

export function App() {
  const promiseProducto = fetchProducto();

  return (
    <Suspense fallback={<p>Cargando producto...</p>}>
      <DetalleProducto promiseProducto={promiseProducto} />
    </Suspense>
  );
}
```

---

## 4. Patrones y Buenas Prácticas

### 1. Granularidad (Límites Anidados)
Puedes anidar múltiples límites de Suspense para que diferentes partes de la interfaz carguen de forma independiente:

```jsx
<Suspense fallback={<PageHeaderSkeleton />}>
  <Header />
  <div className="layout">
    <Suspense fallback={<SidebarSkeleton />}>
      <Sidebar />
    </Suspense>
    <Suspense fallback={<FeedSkeleton />}>
      <Feed />
    </Suspense>
  </div>
</Suspense>
```

### 2. Manejo de Errores: Combinar con `ErrorBoundary`
`<Suspense>` solo gestiona el **tiempo de espera** (carga). Si la operación asíncrona falla (la promesa se rechaza), el error debe ser capturado por un **`ErrorBoundary`**:

```jsx
<ErrorBoundary fallback={<p>Error al cargar el contenido.</p>}>
  <Suspense fallback={<Spinner />}>
    <ComponenteAsincrono />
  </Suspense>
</ErrorBoundary>
```

### 3. Evitar parpadeos con transiciones (`useTransition`)
Cuando actualizas un estado que causa que un componente vuelva a suspenderse, puedes envolver la actualización en `startTransition` para mantener la interfaz actual en pantalla hasta que los nuevos datos estén listos:

```jsx
const [isPending, startTransition] = useTransition();

function cambiarTab(nuevoTab) {
  startTransition(() => {
    setTab(nuevoTab);
  });
}
```
