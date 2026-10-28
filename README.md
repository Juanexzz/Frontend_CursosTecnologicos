# Frontend — NexTech Academy (Cursos Tecnológicos)

Aplicación frontend construida con **Next.js 14 (App Router)**, **TypeScript estricto** y **Tailwind CSS**, correspondiente a la plataforma web de educación tecnológica interactiva **NexTech Academy**. Forma parte del sistema Full-Stack para la Entrega 3.

---

## Enlaces de Despliegue

- **Frontend en producción (Vercel):** `[INSERTAR_URL_FRONTEND_VERCEL]`
- **Backend en producción (Render / Railway):** `[INSERTAR_URL_BACKEND_API]`

---

## Requisitos Previos

- Node.js 18.17.0 o superior (Node 20 recomendado).
- Gestor de paquetes `npm`.
- Instancia del backend de NexTech Academy ejecutándose en local (puerto 4000) o en producción.

---

## Instalación y Ejecución en Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**
   Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env.local
   ```
   Define el valor de `NEXT_PUBLIC_API_HOST`:
   ```env
   NEXT_PUBLIC_API_HOST=http://localhost:4000
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

4. **Comandos de producción (estándar de Next.js):**
   ```bash
   npm run build
   npm run start
   ```

5. **Verificación de calidad (auditorías):**
   ```bash
   npm run type-check   # Verificación estricta de TypeScript
   npm run lint         # Reglas ESLint con error en any
   ```

---

## Variables de Entorno

| Variable | Tipo | Descripción | Ejemplo Local |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_API_HOST` | Pública | URL base del backend sin `/api` ni barra final. **Nota crítica:** En Next.js, las variables con prefijo `NEXT_PUBLIC_` se incrustan en el cliente durante el tiempo de compilación (`next build`). Si cambias esta variable en tu panel de Vercel, es obligatorio ejecutar un nuevo despliegue (Redeploy) para que surta efecto. | `http://localhost:4000` |

> ⚠️ **Seguridad y Git:** Ningún archivo `.env` o `.env.local` debe subirse al repositorio. El `.gitignore` del proyecto excluye estrictamente `.env*`, permitiendo únicamente `.env.example`.

---

## Credenciales de Prueba (Ambiente de Entrega)

Estas credenciales corresponden a los usuarios creados por el seed del backend y deben utilizarse exclusivamente para calificar y auditar los roles en el ambiente de prueba:

| Rol | Correo Electrónico | Contraseña | Permisos y Accesos |
| :--- | :--- | :--- | :--- |
| **Administrador (`admin`)** | `admin@nextech.com` | `Admin1234!` | Acceso completo al catálogo, postulación a cursos, listado de inscripciones y gestión del panel `/admin` (crear, editar, subir portada y eliminar cursos con diálogo de confirmación). |
| **Estudiante (`user`)** | `estudiante@nextech.com` | `User1234!` | Acceso al catálogo, registro de inscripciones en `/inscripcion`, visualización de postulaciones en `/mis-inscripciones`. Si intenta acceder a `/admin`, es redirigido a `/`. |

---

## Mapa de Rutas y Protección

| Ruta | Componente / Vista | Acceso / Protección | Redirección UX si no cumple |
| :--- | :--- | :--- | :--- |
| `/` | `app/page.tsx` | Público | Ninguna |
| `/cursos` | `app/cursos/page.tsx` | Público (con paginación URL `?page=X`) | Ninguna |
| `/cursos/[id]` | `app/cursos/[id]/page.tsx` | Público | Ninguna |
| `/instructores` | `app/instructores/page.tsx` | Público | Ninguna |
| `/login` | `app/login/page.tsx` | Solo invitados | Redirige a `/` si ya hay sesión activa |
| `/registro` | `app/registro/page.tsx` | Solo invitados | Redirige a `/` si ya hay sesión activa |
| `/inscripcion` | `app/inscripcion/page.tsx` | Público (requiere sesión al enviar) | Al enviar sin sesión redirige a `/login?redirect=/inscripcion` |
| `/mis-inscripciones`| `app/mis-inscripciones/page.tsx`| Privado (Requiere sesión activa) | Redirige a `/login?redirect=/mis-inscripciones` |
| `/admin` | `app/admin/page.tsx` | Privado (Requiere rol `admin`) | Redirige a `/login` si no hay sesión, o a `/` si el usuario tiene rol `user` |
| `/*` (404) | `app/not-found.tsx` | Público | Página de error 404 personalizada |

> **Nota de Arquitectura de Seguridad:** La protección se implementa en dos niveles complementarios:
> 1. **Capa Servidor (Edge / SSR):** Mediante el proxy de seguridad (`proxy.ts` / `middleware.ts`) que intercepta las peticiones HTTP y verifica la presencia del token antes de responder con las páginas privadas.
> 2. **Capa Cliente (UX):** Redirecciones automáticas con `useAuth` y respuestas de error HTTP 401 en el cliente centralizado (`http.ts`), el cual remueve la sesión expirada y redirige al usuario a `/login`.

---

## Estructura del Proyecto por Features

La arquitectura del proyecto sigue el patrón de separación por módulos de dominio y componentes reutilizables (`src/features`):

```text
Frontend_CursosTecnologicos/
├── app/                                → Capa de enrutamiento y composición de vistas (App Router)
│   ├── admin/                          → Dashboard administrativo (layout, page)
│   ├── cursos/                         → Catálogo y detalle dinámico (layout, loading, page, [id])
│   ├── inscripcion/                    → Formulario de admisión y FAQ (layout, page)
│   ├── instructores/                   → Perfiles y asignaturas de docentes (page)
│   ├── login/                          → Autenticación de usuarios (layout, page)
│   ├── mis-inscripciones/              → Historial del estudiante autenticado (layout, page)
│   ├── registro/                       → Registro de cuentas nuevas (layout, page)
│   ├── error.tsx                       → Manejador global de excepciones no controladas
│   ├── globals.css                     → Estilos base, fuentes y directivas de Tailwind CSS
│   ├── layout.tsx                      → Layout raíz con Providers, Navbar y Footer
│   ├── loading.tsx                     → Skeleton loader global
│   └── not-found.tsx                   → Vista 404 personalizada
│
├── public/                             → Archivos estáticos
│   └── assets/img/                     → Ilustraciones SVG y logotipo original de Entrega 1
│
├── src/
│   └── features/
│       ├── auth/                       → Feature de Autenticación y Cuentas
│       │   ├── domain/user.types.ts    → Tipos e interfaces de usuario, roles y credenciales
│       │   ├── services/               → auth.service.ts y tokenStorage.ts (cookies / memoria)
│       │   ├── hooks/useAuth.tsx       → React Context y hook global de sesión reactiva
│       │   └── components/             → LoginForm.tsx, RegisterForm.tsx
│       │
│       ├── cursos/                     → Feature del Catálogo e Ítems Tecnológicos
│       │   ├── domain/curso.types.ts   → Tipos de Curso, Categorías, Paginación y DTOs
│       │   ├── services/curso.service.ts → CRUD del catálogo contra endpoints `/api/cursos`
│       │   ├── hooks/                  → useCursos (con filtros y paginación) y useCurso (detalle)
│       │   └── components/             → CursoCard, CursoGrid, CursoFilters, AdminCourseTable, AdminCourseModal
│       │
│       ├── inscripciones/              → Feature de Postulaciones e Interacción
│       │   ├── domain/inscripcion.types.ts → Tipos de Inscripción, Estados y DTOs
│       │   ├── services/inscripcion.service.ts → Servicio cliente contra `/api/inscripciones`
│       │   ├── hooks/                  → useCrearInscripcion y useInscripciones
│       │   └── components/             → EnrollmentForm.tsx, MyInscripcionesList.tsx, AdminInscripcionesTable.tsx
│       │
│       └── common/                     → Componentes y utilidades transversales
│           ├── config.ts               → Validación de variables de entorno (API_HOST)
│           ├── http.ts                 → Cliente HTTP fetch centralizado con inyección de Bearer y manejo de 401
│           └── components/             → Navbar, Footer, Button, Input, ConfirmDialog, Pagination, Spinner, EmptyState, ErrorState
│
├── middleware.ts                       → Middleware de Next.js delegando a proxy.ts
├── proxy.ts                            → Lógica de validación de rutas y sesión en servidor
├── next.config.js                      → Configuración de Next.js y dominios de imágenes remotas
├── tailwind.config.ts                  → Paleta de colores y extensiones de diseño
└── tsconfig.json                       → Configuración TypeScript con modo strict habilitado
```

---

## Captura de Red (Network Authorization)

A continuación se muestra la evidencia de la petición HTTP protegida hacia la API con el encabezado `Authorization: Bearer <token>`:

![Petición de red con cabecera Authorization](docs/network-authorization.png)

*(Ubicación del archivo de captura: `docs/network-authorization.png`)*

---

## Decisiones Técnicas

*(Sección para redacción personal según las instrucciones del docente)*

### 1. Explica el flujo completo de un login: desde que envías el formulario hasta que una ruta protegida responde.

_Escribe aquí tu respuesta con tus propias palabras..._

### 2. ¿Dónde guardas el token en el frontend y qué riesgo tiene esa decisión?

_Escribe aquí tu respuesta con tus propias palabras..._

### 3. ¿En qué caso tu API responde 401 y en cuál 403? Da un ejemplo real de tu proyecto.

_Escribe aquí tu respuesta con tus propias palabras..._

### 4. Si usaste IA, ¿para qué la usaste y qué tuviste que corregir?

_Escribe aquí tu respuesta con tus propias palabras..._
