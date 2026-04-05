# Douceur — Postres Artesanales

Tienda en línea completa para un negocio de postres artesanales.  
Diseño elegante, moderno y completamente responsivo.

---

## Estructura de archivos

```
douceur/
├── index.html    
├── styles.css    
├── app.js      
└── README.md     
```

---

## Cómo ejecutar el proyecto

### Opción 1 — Abrir directamente (más fácil)

1. Descarga los 3 archivos (`index.html`, `styles.css`, `app.js`) en una misma carpeta.
2. Haz doble clic en `index.html`.
3. Se abrirá en tu navegador. ¡Listo!

> ⚠️ Algunos navegadores bloquean recursos externos al abrir archivos locales.  

---

### Opción 2 — Servidor local con VS Code (recomendado)

1. Instala [VS Code](https://code.visualstudio.com/)
2. Instala la extensión **Live Server** (busca "Live Server" en el panel de extensiones)
3. Abre la carpeta del proyecto en VS Code
4. Haz clic derecho en `index.html` → **"Open with Live Server"**
5. Se abrirá en `http://127.0.0.1:5500`

---

### Opción 3 — Servidor local con Python

Si tienes Python instalado:

```bash
# Python 3
cd /ruta/a/la/carpeta
python -m http.server 8000
```

Luego abre: `http://localhost:8000`

---

## Características incluidas

| Función                         | Estado |
|---------------------------------|--------|
| Catálogo de productos           | ✅     |
| Filtros por categoría           | ✅     |
| Carrito con localStorage        | ✅     |
| Ajuste de cantidad en carrito   | ✅     |
| Total dinámico                  | ✅     |
| Modal de checkout con validación| ✅     |
| Envío de pedido por WhatsApp    | ✅     |
| Generación de PDF (comprobante) | ✅     |
| Modo oscuro                     | ✅     |
| Menú hamburguesa (móvil)        | ✅     |
| Animaciones y scroll reveal     | ✅     |
| Sección de reseñas              | ✅     |
| Integración redes sociales      | ✅     |
| 100% Responsivo                 | ✅     |

---

## Dependencias externas (CDN, sin instalación)

- **Lucide Icons** — Iconos SVG modernos
- **jsPDF** — Generación de PDF en el cliente
- **Google Fonts** — Cormorant Garamond + DM Sans

Todas se cargan automáticamente desde CDN. Solo necesitas conexión a internet la primera vez.

---

## Compatibilidad

- ✅ Chrome / Edge
- ✅ Firefox
- ✅ Safari
- ✅ Celular (iOS y Android)

---

Hecho con ❤️ · Douceur Postres Artesanales · México
