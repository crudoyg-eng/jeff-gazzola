# 🚀 GUÍA COMPLETA: DEPLOYMENT Y CONFIGURACIÓN

## 📋 ÍNDICE
1. Entender el flujo de notificaciones
2. Deployar en Vercel (FÁCIL - 2 minutos)
3. Configurar métodos de pago
4. Configurar notificaciones por email
5. Configurar notificaciones por WhatsApp
6. Preguntas frecuentes

---

## 1️⃣ FLUJO DE NOTIFICACIONES - ¿QUÉ PASA CUANDO ALGUIEN RESERVA?

```
CLIENTE HACE RESERVA
        ↓
   ↙───┼───↖
  ↓    ↓    ↓
 ✅ Email  ✅ Email  ✅ WhatsApp
 al cliente a Jeff   a Jeff

RESULTADO: 
- Cliente recibe confirmación
- Jeff recibe notificación inmediata
- Todo queda registrado
```

### Detalles de cada notificación:

**EMAIL AL CLIENTE:**
- Confirma que su reserva fue recibida
- Incluye ID de reserva único
- Detalles de la experiencia
- Próximos pasos

**EMAIL A JEFF:**
- Notificación de nueva reserva
- Datos completos del cliente
- Información de pago
- Call-to-action (contactar al cliente)

**WHATSAPP A JEFF:**
- Notificación instantánea en WhatsApp
- Resumen de la reserva
- Número de teléfono del cliente
- Información del pago

---

## 2️⃣ DEPLOYAR EN VERCEL (OPCIÓN RECOMENDADA)

### PASO 1: Crear cuenta en Vercel
1. Ve a https://vercel.com
2. Haz clic en "Sign Up"
3. Conecta con GitHub (es lo más fácil)
4. Verifica tu email

### PASO 2: Subir código a GitHub
```bash
# En tu computadora:
git clone https://github.com/TU_USUARIO/jeff-gazzola.git
cd jeff-gazzola

# O si lo haces desde cero:
git init
git add .
git commit -m "First commit: Jeff Gazzola website"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/jeff-gazzola.git
git push -u origin main
```

### PASO 3: Deployar en Vercel
1. En Vercel.com, haz clic en "New Project"
2. Selecciona tu repositorio de GitHub
3. Haz clic en "Import"
4. Configura:
   - Framework: Next.js (o Vercel recomendará)
   - Root Directory: ./
   - Build Command: `npm run build` o dejar por defecto
5. Haz clic en "Deploy"

**¡LISTO! Tu página estará en vivo en 2 minutos** 🎉

La URL será: `https://jeff-gazzola.vercel.app` (o similar)

---

## 3️⃣ CONFIGURAR MÉTODOS DE PAGO

### OPCIÓN A: Stripe (RECOMENDADO - Tarjetas de crédito)

**1. Crear cuenta en Stripe:**
- Ve a https://stripe.com
- Haz clic en "Sign Up"
- Completa la información de Jeff
- Verifica email

**2. Obtener API Keys:**
- Vuelve a tu dashboard de Stripe
- Vé a "Developers" → "API Keys"
- Copia tu `Publishable Key` y `Secret Key`

**3. Añadir las variables en Vercel:**
- En Vercel, ve a tu proyecto
- Vé a "Settings" → "Environment Variables"
- Añade:
  ```
  STRIPE_PUBLIC_KEY = pk_live_xxxxx (la Publishable Key)
  STRIPE_SECRET_KEY = sk_live_xxxxx (la Secret Key)
  ```
- Haz clic en "Save"

**4. Integrar Stripe en la página:**
```javascript
// Agregar en el componente de pago:
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// Cuando el usuario confirme el pago:
const response = await fetch('/api/payment', {
  method: 'POST',
  body: JSON.stringify({
    amount: monto * 100, // en centavos
    email: email,
    packageName: paquete
  })
});
```

### OPCIÓN B: PayPal

**1. Crear cuenta en PayPal:**
- Ve a https://developer.paypal.com
- Haz clic en "Sign Up"
- Completa datos

**2. Obtener Client ID:**
- Vé a "Apps & Credentials"
- Copia tu "Client ID"

**3. Integrar en la página:**
```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>

<div id="paypal-button-container"></div>

<script>
  paypal.Buttons({
    createOrder: (data, actions) => {
      return actions.order.create({
        purchase_units: [{
          amount: { value: '240.00' }
        }]
      });
    },
    onApprove: (data, actions) => {
      return actions.order.capture();
    }
  }).render('#paypal-button-container');
</script>
```

### OPCIÓN C: WhatsApp (GRATIS - Jeff cobra manualmente)

Este es el más simple. Cuando el cliente elige "WhatsApp":
1. La reserva se registra
2. Jeff recibe notificación por WhatsApp
3. Jeff contacta al cliente para coordinar el pago
4. El cliente envía el dinero por transferencia/otro método

---

## 4️⃣ CONFIGURAR NOTIFICACIONES POR EMAIL

### OPCIÓN A: Resend (RECOMENDADO - Gratis para empezar)

**1. Crear cuenta:**
- Ve a https://resend.com
- Haz clic en "Sign Up"
- Verifica email

**2. Obtener API Key:**
- En tu dashboard, ve a "API Keys"
- Copia tu API Key

**3. Añadir a Vercel:**
- En Vercel, Settings → Environment Variables
- Añade: `RESEND_API_KEY = re_xxxxxxxx`

**4. Usar en el backend:**
```javascript
// En api/reservas.js:
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Enviar email al cliente:
await resend.emails.send({
  from: 'reservas@jeffgazzola.com',
  to: cliente_email,
  subject: '¡Tu reserva de flyboard está confirmada!',
  html: `<h2>¡Hola ${nombre}!</h2><p>Tu reserva ha sido procesada...</p>`
});

// Enviar email a Jeff:
await resend.emails.send({
  from: 'reservas@jeffgazzola.com',
  to: 'jeffreygazzola@gmail.com',
  subject: 'Nueva reserva - ' + nombre,
  html: `<h2>Nueva reserva de ${nombre}</h2>...`
});
```

### OPCIÓN B: SendGrid

**1. Crear cuenta:**
- Ve a https://sendgrid.com
- Haz clic en "Sign Up Free"

**2. Obtener API Key:**
- Vé a "Settings" → "API Keys"
- Crea una nueva key
- Copia la key

**3. Añadir a Vercel y usar similar a Resend

---

## 5️⃣ CONFIGURAR WHATSAPP A JEFF

### Opción A: Twilio (Más fácil - de pago)

**1. Crear cuenta en Twilio:**
- Ve a https://www.twilio.com/console
- Haz clic en "Sign Up"
- Verifica número de teléfono

**2. Obtener credenciales:**
- En el dashboard, copia:
  - Account SID
  - Auth Token
  - Tu número de WhatsApp Business

**3. Añadir a Vercel:**
```
TWILIO_ACCOUNT_SID = ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN = your_auth_token
TWILIO_WHATSAPP_NUMBER = whatsapp:+14155552671
```

**4. Enviar mensaje en el backend:**
```javascript
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

await client.messages.create({
  from: process.env.TWILIO_WHATSAPP_NUMBER,
  to: `whatsapp:+33648392644`, // Número de Jeff
  body: `Nueva reserva de ${nombre}...`
});
```

### Opción B: N8N (Gratis - Más complejo)

Permite automatizar notificaciones sin código.
- Ve a https://n8n.io
- Crea un flujo que escuche tu API
- Envía WhatsApp cuando hay una nueva reserva

---

## 🎯 RESUMEN DEL SETUP COMPLETO

### Lo MÍNIMO que necesitas para empezar:

```
1. Vercel (GRATIS)
   └─ Página web en vivo

2. Resend (GRATIS para 100 emails/día)
   └─ Emails automáticos

3. WhatsApp manual
   └─ Jeff contacta al cliente manualmente
   
4. PayPal o Stripe (cuando quieras cobrar)
   └─ Pagos en línea

TIEMPO TOTAL: 30 minutos
COSTO: €0 (inicialmente)
```

### Upgrade profesional:

```
1. Vercel + GitHub
   └─ Página profesional

2. Stripe
   └─ Pagos con tarjeta de crédito

3. Resend + Twilio
   └─ Emails + WhatsApp automáticos

4. Base de datos (Supabase)
   └─ Guardar todas las reservas

TIEMPO TOTAL: 2-3 horas
COSTO: ~€50-100/mes (según uso)
```

---

## 📝 VARIABLES DE ENTORNO A CONFIGURAR EN VERCEL

```bash
# Emails
RESEND_API_KEY=re_xxxxx
SMTP_FROM_EMAIL=reservas@jeffgazzola.com

# Pagos
STRIPE_PUBLIC_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
PAYPAL_CLIENT_ID=ABC123xxxxx

# WhatsApp
TWILIO_ACCOUNT_SID=ACxxxxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_WHATSAPP_NUMBER=+1415555xxxx

# Jeff
JEFF_WHATSAPP=+33648392644
JEFF_EMAIL=jeffreygazzola@gmail.com
```

---

## ✅ CHECKLIST DE DEPLOYMENT

- [ ] Código en GitHub
- [ ] Proyecto importado en Vercel
- [ ] Página en vivo (puedes visitar la URL)
- [ ] Vercel variables configuradas
- [ ] Resend (o SendGrid) configurado
- [ ] Stripe (o PayPal) configurado
- [ ] Twilio configurado (opcional)
- [ ] Prueba una reserva
- [ ] Verifica que recibas email y WhatsApp
- [ ] Configura dominio personalizado (opcional)

---

## 🆘 TROUBLESHOOTING

**P: No recibo notificaciones de email**
R: Verifica que las variables en Vercel están correctas. Ve a Vercel → Logs y busca errores.

**P: El pago no funciona**
R: Asegúrate de que STRIPE_SECRET_KEY está en las variables. Recuerda usar credentials de Stripe.

**P: No puedo conectar Twilio**
R: Verifica que +33648392644 está registrado como número de WhatsApp Business en Twilio.

**P: La página carga lenta**
R: Optimiza imágenes, usa Next.js Image component. Vercel comprime automáticamente.

---

## 📞 PRÓXIMOS PASOS

1. **Hoy:** Deployar en Vercel (5 minutos)
2. **Mañana:** Configurar Resend para emails (10 minutos)
3. **Esta semana:** Configurar Stripe para pagos (20 minutos)
4. **Semana 2:** Configurar Twilio para WhatsApp (15 minutos)
5. **Semana 3:** Comprar dominio personalizado (jeff-gazzola.com)

---

## 💡 TIPS PROFESIONALES

- Usa un template de email HTML profesional (puedes copiar de Strapi o Sendgrid)
- Guarda todas las reservas en una base de datos (Supabase es gratis)
- Usa Google Analytics para rastrear conversiones
- Configura un sitemap.xml para SEO
- Envía una encuesta de satisfacción después de cada experiencia
- Automatiza recordatorios 24h antes de cada reserva

¿Necesitas ayuda con algún paso? Avísame. 🚀
