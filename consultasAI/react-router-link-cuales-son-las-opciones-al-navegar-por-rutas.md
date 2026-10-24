# React Router: Opciones al navegar con `<Link>`

En **React Router** (v6 / v7), el componente `<Link>` es la forma declarativa de navegar entre rutas sin recargar la página completa.

---

### 1. `to` (Obligatorio)
Define el destino de la navegación. Puede ser un **string** o un **objeto**:

* **Como string:**
  ```jsx
  <Link to="/perfil">Perfil</Link>
  <Link to="detalles">Ruta relativa</Link>
  <Link to="/buscar?categoria=react#seccion-1">Con query y hash</Link>
  ```
* **Como objeto:** Permite desglosar las partes de la URL de forma más estructurada:
  ```jsx
  <Link 
    to={{
      pathname: "/buscar",
      search: "?categoria=react",
      hash: "#seccion-1"
    }}
  >
    Buscar
  </Link>
  ```

---

### 2. `replace` *(boolean, opcional)*
* **Por defecto:** `false` (usa `history.pushState`).
* **Uso:** Si se establece en `true`, reemplaza la entrada actual en el historial de navegación en lugar de agregar una nueva. El usuario no volverá a la pantalla previa con el botón "Atrás" del navegador.
  ```jsx
  <Link to="/login" replace>
    Iniciar sesión
  </Link>
  ```

---

### 3. `state` *(any, opcional)*
* Permite enviar datos persistentes en el historial de la sesión (`history.state`) sin exponerlos en la URL.
* Es accesible en la ruta destino mediante el hook `useLocation()`.
  ```jsx
  // Enviar:
  <Link to="/pedido" state={{ idPedido: 1234, desdeCheckout: true }}>
    Ver Pedido
  </Link>

  // Recibir en el componente destino:
  import { useLocation } from "react-router-dom";
  
  function Pedido() {
    const { state } = useLocation();
    console.log(state?.idPedido); // 1234
  }
  ```

---

### 4. `relative` *("route" | "path", opcional)*
* Controla cómo se resuelven las rutas relativas (por ejemplo, `to=".."` o `to="subruta"`):
  * `"route"` *(por defecto)*: Resuelve relativo a la jerarquía de rutas anidadas definidas en la configuración de rutas.
  * `"path"`: Resuelve relativo a los segmentos de la URL actual (como funciona la terminal con `cd ..`).
  ```jsx
  // Sube un nivel de URL, ignorando anidaciones de rutas:
  <Link to=".." relative="path">Subir un nivel</Link>
  ```

---

### 5. `preventScrollReset` *(boolean, opcional)*
* Si utilizas el componente `<ScrollRestoration>` de React Router, la navegación normalmente restablece el scroll a la parte superior de la página.
* Ponerlo en `true` preserva la posición actual de desplazamiento.
  ```jsx
  <Link to="?tab=comentarios" preventScrollReset>
    Ver comentarios
  </Link>
  ```

---

### 6. `reloadDocument` *(boolean, opcional)*
* Si se define en `true`, omite el enrutamiento del lado del cliente (SPA) y realiza una recarga de página completa del navegador (como un enlace `<a>` tradicional).
  ```jsx
  <Link to="/logout" reloadDocument>
    Cerrar sesión y recargar
  </Link>
  ```

---

### 7. `viewTransition` *(boolean, opcional)*
* Habilita la integración con la **View Transitions API** del navegador para animar suavemente la transición entre la pantalla actual y la nueva ruta.
  ```jsx
  <Link to="/galeria" viewTransition>
    Ver Galería
  </Link>
  ```

---

### 8. Atributos estándar de `<a>`
`<Link>` renderiza internamente una etiqueta `<a>`, por lo que acepta cualquier atributo HTML estándar:

* `target="_blank"`: Abre la URL en una nueva pestaña.
* `download`: Para descargar un archivo.
* `onClick`: Para interceptar o ejecutar lógica previa antes de navegar (pudiendo usar `e.preventDefault()`).
* `className`, `style`, `aria-*`, `title`, etc.

---

### Equivalencia con navegación programática (`useNavigate`)
Las mismas opciones de navegación se aplican cuando usas el hook `useNavigate()`:

```jsx
const navigate = useNavigate();

navigate("/ruta", {
  replace: true,
  state: { origen: "dashboard" },
  relative: "path",
  preventScrollReset: true,
  viewTransition: true,
});
```

---

### `<NavLink>` vs `<Link>`
Si necesitas aplicar estilos o clases condicionales dependiendo de si la ruta actual coincide con el enlace (por ejemplo, en menús de navegación), utiliza `<NavLink>`, que expone props como:

```jsx
<NavLink 
  to="/mensajes"
  className={({ isActive, isPending }) => 
    isActive ? "nav-active" : isPending ? "nav-pending" : "nav-idle"
  }
>
  Mensajes
</NavLink>
```
