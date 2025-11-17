# 🚀 Portfolio Personal - Pedro Quintana

Portfolio personal de **Pedro Quintana**, AI & Automation Engineer, construido con Next.js 15 y visualizaciones 3D interactivas.

![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ Características

- 🌍 **Visualización 3D interactiva** con Three.js (planeta Tierra rotando)
- 🎨 **Diseño futurista** con tema oscuro y colores neón (cyan, violet, teal)
- ⚡ **Animaciones fluidas** con Framer Motion
- 📱 **Diseño responsive** optimizado para todos los dispositivos
- 🌙 **Modo oscuro** integrado con next-themes
- 🎯 **Componentes reutilizables** con Shadcn/UI
- 🚀 **Optimizado para rendimiento** con Next.js 15 App Router
- 📦 **Deploy automático** en Netlify

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 15.3.4 (App Router, SSR)
- **Lenguaje**: TypeScript 5
- **UI Library**: React 19.0.0
- **Estilos**: TailwindCSS 4
- **Componentes**: Shadcn/UI + Radix UI

### Visualizaciones 3D
- **Three.js** 0.177.0
- **@react-three/fiber** 9.1.2
- **@react-three/drei** 10.3.0

### Animaciones & UX
- **Framer Motion** 12.19.2
- **Lucide React** (iconografía)
- **Next Themes** (gestión de tema)

### Formularios & Validación
- **React Hook Form** 7.59.0
- **Zod** 3.25.67

### Deploy & CI/CD
- **Plataforma**: Netlify
- **Plugin**: @netlify/plugin-nextjs

## 📁 Estructura del Proyecto

```
mi-portfolio-nuevo/
├── src/
│   ├── app/                    # App Router (Next.js 15)
│   │   ├── page.tsx           # Página principal
│   │   ├── layout.tsx         # Layout raíz
│   │   ├── globals.css        # Estilos globales
│   │   └── proyectos/         # Sección de proyectos
│   │       ├── page.tsx
│   │       └── ProyectosContent.tsx
│   │
│   ├── components/            # Componentes React
│   │   ├── Earth.tsx         # Componente planeta 3D
│   │   ├── EarthWrapper.tsx  # Wrapper con lazy loading
│   │   ├── OrbitalStack.tsx  # Animación orbital del stack
│   │   ├── ThreeBackground.tsx
│   │   ├── theme-provider.tsx
│   │   ├── three/            # Componentes Three.js
│   │   │   ├── Scene.tsx
│   │   │   └── CombinedScene.tsx
│   │   └── ui/               # Shadcn/UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── form.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── textarea.tsx
│   │
│   └── lib/
│       └── utils.ts          # Utilidades (cn, clsx, etc.)
│
├── public/
│   ├── icons/                # Iconos de tecnologías
│   │   ├── javascript.png
│   │   ├── python.png
│   │   ├── powerbi.svg
│   │   ├── n8n.png
│   │   ├── sql.png
│   │   ├── ollama.png
│   │   └── ...
│   │
│   ├── planet/               # Modelo 3D GLTF
│   │   ├── scene.gltf
│   │   ├── scene.bin
│   │   └── textures/
│   │
│   ├── projects/             # Imágenes de proyectos
│   │   ├── powerbi/
│   │   └── n8n/
│   │
│   └── pedro.jpg            # Foto de perfil
│
├── .vscode/                  # Configuración VS Code
├── netlify.toml             # Configuración Netlify
├── components.json          # Configuración Shadcn/UI
├── tailwind.config.ts       # Configuración Tailwind
├── tsconfig.json           # Configuración TypeScript
└── next.config.ts          # Configuración Next.js
```

## 🚀 Inicio Rápido

### Prerrequisitos

- **Node.js** 18.x o superior
- **npm**, **yarn**, **pnpm** o **bun**

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Pedroru101/mi-portfolio-nuevo.git
   cd mi-portfolio-nuevo
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Ejecutar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en navegador**
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo con Turbopack |
| `npm run build` | Genera build de producción |
| `npm start` | Ejecuta servidor de producción |
| `npm run lint` | Ejecuta ESLint para verificar código |

## 🌐 Deploy

El proyecto está configurado para deploy automático en **Netlify**.

### Configuración de Deploy

**netlify.toml** incluye:
- Build command: `npm run build`
- Publish directory: `.next`
- Plugin de Next.js para Netlify
- Headers de seguridad

### Variables de Entorno

Este proyecto **no requiere** variables de entorno para funcionar en modo básico.

## 📝 Secciones del Portfolio

### 🏠 Página Principal (`/`)
- **Hero Section**: Presentación con planeta 3D interactivo
- **Sobre mí**: Descripción profesional y experiencia
- **Stack Tecnológico**: Animación orbital con tecnologías principales
  - JavaScript, Python, Power BI
  - n8n, SQL, Ollama
  - Gmail API, Google Sheets, Excel
- **Proyectos Destacados**:
  1. Sistema de Monitoreo de Medios (n8n + IA)
  2. Dashboard Power BI - Análisis de Rendimiento
  3. Generador de ROI
- **Contacto**: Botón flotante con enlaces a redes

### 📂 Página de Proyectos (`/proyectos`)
- Galería completa de proyectos
- Imágenes y descripciones detalladas
- Filtros por tecnología

## 🎨 Personalización

### Colores del Tema

El tema está definido en `tailwind.config.ts`:

```typescript
colors: {
  neon: {
    cyan: '#00f0ff',
    violet: '#bd00ff',
    teal: '#00ffaa'
  }
}
```

### Componentes UI

Los componentes de Shadcn/UI se pueden personalizar en `src/components/ui/`.

### Modelo 3D

El planeta 3D se carga desde `public/planet/scene.gltf`. Puedes reemplazarlo con cualquier modelo GLTF.

## 🔧 Tecnologías Clave

### Next.js 15 Features Utilizadas
- ✅ App Router (no Pages Router)
- ✅ Server Components por defecto
- ✅ Client Components (`'use client'`)
- ✅ Turbopack para desarrollo rápido
- ✅ Optimización de imágenes

### Mejores Prácticas Implementadas
- ✅ TypeScript para type-safety
- ✅ ESLint para linting
- ✅ Componentes modulares y reutilizables
- ✅ Lazy loading de componentes 3D
- ✅ Responsive design mobile-first
- ✅ Accesibilidad (a11y) con Radix UI

## 📦 Dependencias Principales

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| next | 15.3.4 | Framework React SSR |
| react | 19.0.0 | Biblioteca UI |
| typescript | 5 | Tipado estático |
| tailwindcss | 4 | Framework CSS |
| three | 0.177.0 | Gráficos 3D WebGL |
| framer-motion | 12.19.2 | Animaciones fluidas |
| react-hook-form | 7.59.0 | Gestión de formularios |
| zod | 3.25.67 | Validación de esquemas |

## 🤝 Contribución

Este es un proyecto personal de portfolio. No se aceptan contribuciones externas en este momento.

## 📄 Licencia

© 2025 Pedro Quintana. Todos los derechos reservados.

## 📬 Contacto

- **GitHub**: [@Pedroru101](https://github.com/Pedroru101)
- **LinkedIn**: [Pedro Quintana](https://linkedin.com/in/pedro-quintana)
- **Email**: [Contacto](mailto:contacto@pedroquintana.com)

---

**Nota sobre Netlify**: Este proyecto está optimizado para deploy en Netlify con soporte completo para Next.js 15, incluyendo SSR, ISR y Edge Functions.

Desarrollado con ❤️ usando Next.js 15 + TypeScript + TailwindCSS
