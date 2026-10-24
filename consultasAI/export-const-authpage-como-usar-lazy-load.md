# Cómo usar Lazy Load con Exportaciones Nombradas (`export const`)

Por defecto, `React.lazy()` espera que el módulo importado tenga una exportación por defecto (`export default`). Cuando tienes una **exportación nombrada** como:

```jsx
// AuthPage.jsx
export const AuthPage = () => {
  return <div>Página de Autenticación</div>;
};
```

El módulo devuelto por `import("./AuthPage")` tiene la forma `{ AuthPage: Component }` en lugar de `{ default: Component }`.

A continuación se presentan las mejores formas de resolver esto:

---

## Opción 1: Mapear la Promesa con `.then()` (Estándar en React)

Es la solución más directa y utilizada cuando trabajas con `React.lazy`. Interceptas la promesa que retorna `import()` y transformas el objeto para que contenga la propiedad `default`:

```jsx
import { lazy, Suspense } from "react";

// Mapeas la exportación nombrada "AuthPage" a la propiedad "default"
const AuthPage = lazy(() =>
  import("./AuthPage").then((module) => ({ default: module.AuthPage }))
);

export function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <AuthPage />
    </Suspense>
  );
}
```

---

## Opción 2: Usando la propiedad `lazy` de React Router (v6.4+ y v7)

Si estás usando un enrutador de datos en React Router (`createBrowserRouter`), la propiedad `lazy` de la ruta espera un objeto con la propiedad `Component`. 

Puedes mapear directamente la exportación nombrada:

```jsx
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/auth",
    lazy: async () => {
      const { AuthPage } = await import("./pages/AuthPage");
      return { Component: AuthPage };
    },
  },
]);
```

> **Nota:** Si en el archivo `AuthPage.jsx` exportas un alias llamado `Component`:
> ```jsx
> export const AuthPage = () => { ... };
> export const Component = AuthPage; // o export { AuthPage as Component };
> ```
> Entonces en tu router puedes usar simplemente:
> ```jsx
> {
>   path: "/auth",
>   lazy: () => import("./pages/AuthPage"),
> }
> ```

---

## Opción 3: Re-exportar como default en un archivo intermedio

Si prefieres mantener el código de `React.lazy()` limpio sin llamadas a `.then()`:

```jsx
// AuthPageLazy.jsx (o index.js)
export { AuthPage as default } from "./AuthPage";
```

Luego se consume de la forma habitual:
```jsx
const AuthPage = lazy(() => import("./AuthPageLazy"));
```

---

## Resumen de Comparación

| Método | Dónde usarlo | Ventaja |
|---|---|---|
| `import(...).then(m => ({ default: m.AuthPage }))` | En cualquier componente con `React.lazy` | No requiere modificar el archivo original ni crear archivos extra |
| `lazy: async () => ({ Component: (await import(...)).AuthPage })` | En rutas de React Router (v6.4+) | Nativo de React Router, no necesita `React.lazy` ni `<Suspense>` manual |
| `export { AuthPage as Component }` | En el archivo de origen | Máxima limpieza al importar con React Router |
