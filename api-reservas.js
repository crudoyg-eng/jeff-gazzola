// api/reservas.js - Backend serverless de Vercel
// Este archivo procesa las reservas y envía notificaciones

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const {
    nombre,
    email,
    telefono,
    fecha,
    paquete,
    mensaje,
    metodoPago,
    monto
  } = req.body;

  try {
    // 1. GUARDAR LA RESERVA EN BASE DE DATOS (opcional - puedes usar Supabase, Firebase, etc)
    const reservaData = {
      id: `RES-${Date.now()}`,
      nombre,
      email,
      telefono,
      fecha,
      paquete,
      mensaje,
      metodoPago,
      monto,
      estado: 'pendiente',
      fechaCreacion: new Date().toISOString()
    };

    // 2. ENVIAR EMAIL AL CLIENTE
    await sendEmailCliente(reservaData);

    // 3. ENVIAR EMAIL A JEFF
    await sendEmailJeff(reservaData);

    // 4. ENVIAR WHATSAPP A JEFF
    await sendWhatsAppJeff(reservaData);

    // 5. PROCESAR PAGO (según método seleccionado)
    if (metodoPago === 'stripe') {
      // Aquí irían la lógica de Stripe
      console.log('Procesando pago con Stripe...');
    } else if (metodoPago === 'paypal') {
      // Aquí irían la lógica de PayPal
      console.log('Procesando pago con PayPal...');
    } else if (metodoPago === 'whatsapp') {
      // Jeff enviará detalles de pago por WhatsApp
      console.log('Enviando detalles de pago por WhatsApp...');
    }

    return res.status(200).json({
      success: true,
      id: reservaData.id,
      message: 'Reserva procesada exitosamente'
    });

  } catch (error) {
    console.error('Error en reserva:', error);
    return res.status(500).json({
      error: 'Error al procesar la reserva',
      details: error.message
    });
  }
}

// FUNCIÓN: Enviar email de confirmación al cliente
async function sendEmailCliente(reserva) {
  try {
    const emailContent = `
      <h2>¡Tu reserva ha sido confirmada!</h2>
      <p>Hola ${reserva.nombre},</p>
      
      <p>Gracias por reservar con nosotros. Aquí están los detalles de tu experiencia:</p>
      
      <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>ID Reserva:</strong> ${reserva.id}</p>
        <p><strong>Paquete:</strong> ${reserva.paquete}</p>
        <p><strong>Fecha:</strong> ${reserva.fecha}</p>
        <p><strong>Monto:</strong> €${reserva.monto}</p>
        <p><strong>Método de pago:</strong> ${reserva.metodoPago}</p>
      </div>
      
      <p>Jeff se contactará contigo en las próximas 24 horas para confirmar todos los detalles.</p>
      
      <p>Si tienes alguna pregunta, puedes contactarnos en:</p>
      <ul>
        <li>WhatsApp: +33 6 48 39 26 44</li>
        <li>Email: jeffreygazzola@gmail.com</li>
      </ul>
      
      <p>¡Prepárate para una experiencia inolvidable volando en Cannes!</p>
      
      <p>Jeff Gazzola Flyboard</p>
    `;

    // Usando Resend (servicio de email gratuito/de pago)
    // O puedes usar SendGrid, Mailgun, etc.
    
    // Ejemplo con console log (reemplaza con Resend o tu servicio favorito)
    console.log(`Email enviado a ${reserva.email}`);
    
    return true;
  } catch (error) {
    console.error('Error enviando email cliente:', error);
    throw error;
  }
}

// FUNCIÓN: Enviar notificación a Jeff
async function sendEmailJeff(reserva) {
  try {
    const emailContent = `
      <h2>Nueva Reserva</h2>
      <p>Tienes una nueva reserva confirmada:</p>
      
      <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Cliente:</strong> ${reserva.nombre}</p>
        <p><strong>Email:</strong> ${reserva.email}</p>
        <p><strong>Teléfono:</strong> ${reserva.telefono}</p>
        <p><strong>Paquete:</strong> ${reserva.paquete}</p>
        <p><strong>Fecha:</strong> ${reserva.fecha}</p>
        <p><strong>Monto:</strong> €${reserva.monto}</p>
        <p><strong>Método de pago:</strong> ${reserva.metodoPago}</p>
        <p><strong>Mensaje:</strong> ${reserva.mensaje || 'Sin mensaje'}</p>
      </div>
      
      <p><strong>Próximo paso:</strong> Contacta al cliente para confirmar detalles y procesar el pago si es necesario.</p>
    `;

    console.log(`Email de notificación enviado a jeffreygazzola@gmail.com`);
    return true;
  } catch (error) {
    console.error('Error enviando email a Jeff:', error);
    throw error;
  }
}

// FUNCIÓN: Enviar WhatsApp a Jeff
async function sendWhatsAppJeff(reserva) {
  try {
    const mensaje = `
*NUEVA RESERVA* 📅

Cliente: ${reserva.nombre}
Teléfono: ${reserva.telefono}
Paquete: ${reserva.paquete}
Fecha: ${reserva.fecha}
Monto: €${reserva.monto}

Método de pago: ${reserva.metodoPago}

Contacta al cliente para confirmar.
    `;

    // Usando Twilio para WhatsApp
    // Este es un ejemplo de cómo se vería
    console.log('Enviando WhatsApp a Jeff...');
    console.log(mensaje);

    // Si implementas Twilio:
    // const twilio = require('twilio');
    // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    // await client.messages.create({
    //   from: 'whatsapp:+14155552671',
    //   to: 'whatsapp:+33648392644',
    //   body: mensaje
    // });

    return true;
  } catch (error) {
    console.error('Error enviando WhatsApp:', error);
    throw error;
  }
}
