export default function Home() {
  return (
    <div className="bg-white">
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-900 to-slate-900 text-white min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-6xl font-bold mb-6">Vuela sobre el Mediterráneo</h1>
          <p className="text-2xl text-gray-300 mb-8">Clases de flyboard en Cannes</p>
          <p className="text-xl mb-8">Con Jeff Gazzola - Instructor Elite</p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 mb-8">
            Reservar ahora
          </button>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 p-6 rounded-lg">
              <p className="text-3xl font-bold text-blue-300">1000+</p>
              <p className="text-gray-300">Clientes satisfechos</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <p className="text-3xl font-bold text-orange-300">€140-240</p>
              <p className="text-gray-300">Nuestros precios</p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg">
              <p className="text-3xl font-bold text-green-300">✅ Seguro</p>
              <p className="text-gray-300">100% profesional</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Nuestros Servicios</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-blue-600">
              <h3 className="text-2xl font-bold mb-2">Iniciación</h3>
              <p className="text-gray-600 mb-4">Perfecto para comenzar</p>
              <p className="text-4xl font-bold text-blue-600 mb-4">€140</p>
              <p className="text-gray-600 mb-4">⏱️ 30 minutos</p>
              <ul className="space-y-2">
                <li>✓ Instrucción personalizada</li>
                <li>✓ Equipo completo</li>
                <li>✓ Fotos incluidas</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-orange-500 relative">
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">POPULAR</div>
              <h3 className="text-2xl font-bold mb-2">Avanzado</h3>
              <p className="text-gray-600 mb-4">Aprende acrobacias extremas</p>
              <p className="text-4xl font-bold text-orange-600 mb-4">€240</p>
              <p className="text-gray-600 mb-4">⏱️ 1 hora completa</p>
              <ul className="space-y-2">
                <li>✓ Backflips y dolphins</li>
                <li>✓ Acrobacias personalizadas</li>
                <li>✓ Video de la sesión</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Contacto</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-6"><strong>📱 Teléfono/WhatsApp:</strong><br/><a href="tel:+33648392644" className="text-blue-600 hover:underline">+33 6 48 39 26 44</a></p>
              <p className="text-lg mb-6"><strong>📧 Email:</strong><br/><a href="mailto:jeffreygazzola@gmail.com" className="text-blue-600 hover:underline">jeffreygazzola@gmail.com</a></p>
              <p className="text-lg"><strong>📍 Ubicación:</strong><br/>Cannes, Francia</p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-orange-500 text-white p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-4">¿Listo para volar?</h3>
              <p className="mb-6">Edad mínima: 18 años. Sin experiencia necesaria. ¡Lo aprendes todo!</p>
              <button className="bg-white text-blue-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 w-full">
                Reservar ahora
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-gray-400 py-8 px-4 text-center">
        <p>© 2024 Jeff Gazzola Flyboard. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
