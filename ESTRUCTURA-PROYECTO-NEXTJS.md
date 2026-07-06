# ESTRUCTURA DE PROYECTO NEXT.JS PARA VERCEL

## 📁 ESTRUCTURA DE CARPETAS

```
jeff-gazzola-website/
├── pages/
│   ├── api/
│   │   ├── reservas.js (backend para procesar reservas)
│   │   ├── payment.js (backend para pagos con Stripe)
│   │   └── send-notification.js (notificaciones)
│   ├── _app.js (configuración global)
│   ├── index.js (tu página principal)
│   └── 404.js (página de error)
├── public/
│   ├── images/ (aquí tus fotos)
│   ├── favicon.ico
│   └── robots.txt
├── styles/
│   └── globals.css
├── components/
│   └── Navigation.js (si quieres separar componentes)
├── lib/
│   ├── stripe.js (configuración de Stripe)
│   └── sendEmail.js (funciones de email)
├── .env.local (variables de entorno - NO COMMITS)
├── .env.example (plantilla de variables)
├── .gitignore
├── package.json
├── next.config.js
├── tsconfig.json (opcional)
└── README.md
```

---

## 📦 package.json

```json
{
  "name": "jeff-gazzola-flyboard",
  "version": "1.0.0",
  "description": "Página web profesional para Jeff Gazzola Flyboard",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "lucide-react": "^0.263.0",
    "@stripe/stripe-js": "^1.46.0",
    "stripe": "^12.0.0",
    "resend": "^0.16.0",
    "twilio": "^3.85.0",
    "axios": "^1.5.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.3.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.0.0"
  }
}
```

---

## ⚙️ next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['example.com', 'cdn.example.com'], // Tus dominios de imágenes
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
  swcMinify: true,
  compress: true,
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## 🎨 tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066CC',
        secondary: '#FF6B35',
        accent: '#FFB703',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
```

---

## .env.example (Copiar a .env.local)

```bash
# STRIPE
STRIPE_PUBLIC_KEY=pk_live_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx

# PAYPAL
PAYPAL_CLIENT_ID=AXxxxxxxxxxxxxx

# RESEND (Emails)
RESEND_API_KEY=re_xxxxxxxxxxxxx

# TWILIO (WhatsApp)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155552671

# CONTACTO JEFF
JEFF_EMAIL=jeffreygazzola@gmail.com
JEFF_WHATSAPP=+33648392644
JEFF_PHONE=+33648392644

# EMAIL CONFIG
SMTP_FROM_EMAIL=reservas@jeffgazzola.com
SMTP_HOST=smtp.resend.com
SMTP_PORT=465
SMTP_USER=resend
SMTP_PASSWORD=xxxxxxxxxxxxx

# APP
NEXT_PUBLIC_APP_URL=https://jeff-gazzola.vercel.app
NODE_ENV=production
```

---

## .gitignore

```
# Dependencies
node_modules/
/.pnp
.pnp.js

# Testing
/.coverage

# Next.js
/.next/
/out/

# Production
/build

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
Thumbs.db
```

---

## 📄 pages/_app.js

```javascript
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

---

## 📄 pages/_document.js (Opcional - para meta tags globales)

```javascript
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Clases de flyboard en Cannes con Jeff Gazzola" />
        <meta name="keywords" content="flyboard, cannes, jet ski, agua" />
        <meta property="og:title" content="Jeff Gazzola Flyboard" />
        <meta property="og:description" content="La mejor experiencia de flyboard en el Mediterráneo" />
        <meta property="og:image" content="/og-image.jpg" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

---

## 📄 pages/index.js (Tu página principal)

```javascript
// Importa tu componente principal (el que creé anteriormente)
import JeffGazzola from '../components/JeffGazzola';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Jeff Gazzola - Clases de Flyboard en Cannes</title>
        <meta name="description" content="Aprende flyboard con el mejor instructor del Mediterráneo" />
      </Head>
      <JeffGazzola />
    </>
  );
}
```

---

## 📄 pages/api/reservas.js (Ya creado anteriormente)

[Ver archivo separado: api-reservas.js]

---

## 📄 styles/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Montserrat', sans-serif;
}

/* Smooth animations */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #0066cc;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #0052a3;
}
```

---

## 📄 postcss.config.js

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

---

## 📄 lib/stripe.js (Configuración de Stripe)

```javascript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default stripe;
```

---

## 📄 lib/sendEmail.js (Función reutilizable de email)

```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailCliente(email, nombre, reservaData) {
  try {
    await resend.emails.send({
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: `¡Reserva confirmada - ID: ${reservaData.id}`,
      html: `
        <h2>¡Tu reserva ha sido confirmada!</h2>
        <p>Hola ${nombre},</p>
        <p>Gracias por reservar con nosotros.</p>
        <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>ID Reserva:</strong> ${reservaData.id}</p>
          <p><strong>Paquete:</strong> ${reservaData.paquete}</p>
          <p><strong>Fecha:</strong> ${reservaData.fecha}</p>
          <p><strong>Monto:</strong> €${reservaData.monto}</p>
        </div>
        <p>Jeff se contactará contigo en las próximas 24 horas.</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('Error enviando email:', error);
    throw error;
  }
}

export async function sendEmailJeff(reservaData) {
  try {
    await resend.emails.send({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.JEFF_EMAIL,
      subject: `NUEVA RESERVA - ${reservaData.nombre}`,
      html: `
        <h2>Nueva reserva recibida</h2>
        <p><strong>Cliente:</strong> ${reservaData.nombre}</p>
        <p><strong>Email:</strong> ${reservaData.email}</p>
        <p><strong>Teléfono:</strong> ${reservaData.telefono}</p>
        <p><strong>Paquete:</strong> ${reservaData.paquete}</p>
        <p><strong>Fecha:</strong> ${reservaData.fecha}</p>
        <p><strong>Monto:</strong> €${reservaData.monto}</p>
        <p><strong>Método de pago:</strong> ${reservaData.metodoPago}</p>
      `,
    });
    return true;
  } catch (error) {
    console.error('Error enviando email a Jeff:', error);
    throw error;
  }
}
```

---

## 🚀 CÓMO DEPLOYAR ESTO EN VERCEL

### Paso 1: Crear estructura en GitHub
```bash
mkdir jeff-gazzola-website
cd jeff-gazzola-website
git init
```

### Paso 2: Crear archivos
- Copia todos los archivos de arriba en la estructura correcta
- Reemplaza `pages/index.js` con tu componente de React

### Paso 3: Instalar dependencias
```bash
npm install
```

### Paso 4: Probar localmente
```bash
npm run dev
# Visita http://localhost:3000
```

### Paso 5: Push a GitHub
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/jeff-gazzola.git
git push -u origin main
```

### Paso 6: Deploy en Vercel
1. Ve a https://vercel.com
2. Haz clic en "New Project"
3. Importa tu repositorio de GitHub
4. Configura variables de entorno (copiar de .env.example)
5. Haz clic en "Deploy"

**¡LISTO! Tu página estará en vivo en minutos** 🎉

---

## 📊 MONITOREO EN PRODUCCIÓN

### Ver logs en Vercel
```
Dashboard → Tu Proyecto → Deployments → Logs
```

### Analytics
```
Vercel → Analytics → Web Vitals
```

### Errores
```
Vercel → Functions → Runtime Logs
```

---

## 🔧 TIPS DE PERFORMANCE

1. **Imágenes optimizadas**
   ```javascript
   import Image from 'next/image';
   
   <Image 
     src="/photo.jpg" 
     alt="description" 
     width={400} 
     height={300} 
     priority 
   />
   ```

2. **Code splitting automático** - Next.js lo hace por ti

3. **Caching de headers**
   ```javascript
   // En next.config.js
   headers: async () => [{
     source: '/images/(.*)',
     headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000' }]
   }]
   ```

4. **CDN automático** - Vercel usa Cloudflare automáticamente

---

## 🆘 CHECKLIST FINAL

- [ ] Código en GitHub
- [ ] package.json configurado
- [ ] Variables de entorno en Vercel
- [ ] npm install funciona
- [ ] npm run dev funciona localmente
- [ ] Deployed en Vercel
- [ ] Página carga correctamente
- [ ] Formulario funciona
- [ ] Emails se envían
- [ ] Dominio personalizado (opcional)

¡Listo para conquistar el mundo del flyboard! 🚀
