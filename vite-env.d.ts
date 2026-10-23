/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Agrega aquí todas tus variables VITE_
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
