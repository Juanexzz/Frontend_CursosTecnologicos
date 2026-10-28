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

### 1. Explica el flujo completo de un login: desde que envías el formulario hasta que una ruta protegida responde.

1. **Envío de credenciales:** El usuario ingresa su correo y contraseña en `/login` y envía el formulario. El componente `LoginForm` valida los campos en el cliente y delega la llamada a `authService.login({ email, password })`.
2. **Petición HTTP a la API:** El cliente `http.ts` realiza una petición `POST /api/auth/login` hacia el backend enviando las credenciales en formato JSON.
3. **Autenticación en backend:** El backend valida el formato, busca el usuario por email en PostgreSQL mediante Prisma y verifica el hash de la contraseña usando `bcryptjs`. Si coincide, genera un JWT (con algoritmo HS256, expiración y payload mínimo: `id`, `email`, `role`).
4. **Almacenamiento del token:** Al recibir la respuesta exitosa (200 OK con `{ token, user }`), el servicio ejecuta `tokenStorage.setToken(token)`. Esto guarda el JWT tanto en memoria de ejecución como en la cookie `token` para persistir la sesión.
5. **Actualización de estado global:** El contexto `AuthProvider` actualiza el estado `user` e `isAuthenticated` a `true`, permitiendo que la barra de navegación muestre el nombre del usuario y el botón de salir.
6. **Navegación y respuesta protegida:** El usuario navega a una ruta privada como `/mis-inscripciones`. El middleware en el servidor (`proxy.ts`) verifica la existencia de la cookie `token`. Al cargar el componente, el hook `useMisInscripciones` solicita `GET /api/inscripciones/mis-inscripciones`. El cliente centralizado `http.ts` intercepta la solicitud, extrae el token de `tokenStorage` y añade automáticamente la cabecera `Authorization: Bearer <token>`. El backend procesa el token en el middleware de autenticación y responde con los datos protegidos del usuario.

### 2. ¿Dónde guardas el token en el frontend y qué riesgo tiene esa decisión?

En este proyecto, el token JWT se almacena de forma sincronizada en **memoria JavaScript** (para acceso inmediato y reactivo en las llamadas del cliente HTTP) y en una **cookie de navegador** (`token`, con flags `SameSite=Lax` y `Path=/`).

- **Ventajas:** Permite que la sesión sobreviva al refrescar la página (F5) y que el middleware de Next.js (`proxy.ts` / Edge) pueda leer el token en el servidor antes de renderizar la página, evitando destellos de contenido no autorizado o redirecciones tardías en el cliente.
- **Riesgo asociado:** Al ser accesible desde el cliente (no `HttpOnly`), si la aplicación llegara a sufrir una vulnerabilidad de Cross-Site Scripting (XSS) mediante la inyección de scripts maliciosos de terceros, un atacante podría leer la cookie o la memoria y exfiltrar el token. Se mitiga este riesgo utilizando React y Next.js (que escapan automáticamente los textos en el DOM) y validando rigurosamente todas las entradas de usuario.

### 3. ¿En qué caso tu API responde 401 y en cuál 403? Da un ejemplo real de tu proyecto.

- **Código 401 Unauthorized (Falta o invalidez de autenticación):** Ocurre cuando el cliente no se ha identificado o la identidad provista no es válida.
  - *Ejemplo real:* Cuando un usuario anónimo o con un token expirado/inválido intenta consultar sus inscripciones enviando `GET /api/inscripciones/mis-inscripciones` sin la cabecera `Authorization: Bearer <token>`. La API rechaza la petición con código 401 y el frontend redirige automáticamente al usuario a `/login`.
- **Código 403 Forbidden (Falta de autorización o permisos insuficientes):** Ocurre cuando el usuario está debidamente autenticado (la API sabe quién es), pero su rol no tiene los privilegios necesarios para ejecutar la acción solicitada.
  - *Ejemplo real:* Un usuario autenticado con rol `user` (estudiante) que envía una petición `DELETE /api/cursos/:id` para intentar eliminar un curso del catálogo. El token es legítimo (no da 401), pero el middleware de autorización valida que se requiere el rol `admin`, respondiendo con código 403 y denegando la operación.

### 4. Si usaste IA, ¿para qué la usaste y qué tuviste que corregir?

Utilicé herramientas de IA principalmente como **asistente de diseño, verificación y pruebas de calidad**:
- **Diseño y Maquetación:** Quería que la plataforma tuviera una estética moderna, limpia y profesional inspirada en referentes educativos como **Platzi** (tarjetas de cursos con badges de tecnologías, tonalidades oscuras y claras bien contrastadas, barras de filtros accesibles y dashboards interactivos). Como había conceptos y utilidades avanzadas de diseño en Tailwind CSS que desconocía o me tomaba mucho tiempo estructurar desde cero, utilicé la IA para estructurar los componentes visuales respetando la paleta de colores y la tipografía de la Entrega 1.
- **Verificación y Pruebas Estructurales:** La utilicé para auditar que la arquitectura por features cumpliera estrictamente con el contrato de la API, validar que ninguna llamada `fetch` quedara por fuera de `common/http.ts`, comprobar que las paginaciones por URL funcionaran en sincronía con los filtros y verificar que no quedara ningún tipo `any` en TypeScript.
- **Correcciones realizadas:** Tuve que corregir casos donde la IA proponía consumir estados locales quemados en lugar de sincronizarse con los endpoints de la API, ajustar rutas del middleware que redirigían en bucle en el servidor, corregir nombres de atributos en los formularios para que coincidieran exactamente con los esquemas de Prisma y el contrato (`CONTRATO_API.md`), y asegurar que los diálogos modales cumplieran las reglas de accesibilidad (manejo de foco y tecla Escape).
