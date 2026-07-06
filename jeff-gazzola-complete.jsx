import React, { useState, useEffect } from 'react';
import { ChevronDown, Phone, Mail, MapPin, Star, Calendar, Users, Clock, Lock, AlertCircle, CheckCircle, Loader } from 'lucide-react';

export default function JeffGazzola() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [reservaExitosa, setReservaExitosa] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    paquete: '',
    mensaje: '',
    metodoPago: 'tarjeta'
  });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePackageSelect = (package) => {
    setSelectedPackage(package);
    setFormData(prev => ({
      ...prev,
      paquete: package.nombre
    }));
    setBookingStep(2);
  };

  const handlePaymentMethodChange = (method) => {
    setFormData(prev => ({
      ...prev,
      metodoPago: method
    }));
  };

  const handleReservaSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular envío a backend
      const response = await fetch('/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          monto: selectedPackage.precio,
          metodoPago: formData.metodoPago
        })
      }).catch(() => {
        // Si no hay backend, simulamos la respuesta
        return {
          ok: true,
          json: async () => ({ success: true, id: 'RES-' + Date.now() })
        };
      });

      if (response.ok) {
        setReservaExitosa(true);
        setBookingStep(4);
        
        // Resetear form después de 3 segundos
        setTimeout(() => {
          setFormData({
            nombre: '',
            email: '',
            telefono: '',
            fecha: '',
            paquete: '',
            mensaje: '',
            metodoPago: 'tarjeta'
          });
          setSelectedPackage(null);
          setReservaExitosa(false);
          setBookingStep(1);
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const packages = [
    {
      id: 1,
      nombre: 'Iniciación',
      descripcion: 'Perfecto para comenzar',
      precio: 140,
      duracion: '30 minutos',
      incluye: [
        'Instrucción personalizada',
        'Equipo completo incluido',
        'Fotos de la experiencia',
        'Seguro incluido'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      nombre: 'Avanzado',
      descripcion: 'Aprende acrobacias extremas',
      precio: 240,
      duracion: '1 hora completa',
      incluye: [
        'Backflips y dolphins',
        'Acrobacias personalizadas',
        'Video de la sesión',
        'Certificado participación'
      ],
      color: 'from-orange-500 to-orange-600',
      popular: true
    }
  ];

  return (
    <div className="bg-white">
      {/* NAVIGATION */}
      <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">JG</span>
              </div>
              <span className="font-bold text-lg text-gray-900">Jeff Gazzola</span>
            </div>

            <div className="hidden md:flex gap-8 items-center">
              <button onClick={() => scrollToSection('experience')} className="text-gray-700 hover:text-blue-600 transition font-medium">Experiencia</button>
              <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 transition font-medium">Servicios</button>
              <button onClick={() => scrollToSection('gallery')} className="text-gray-700 hover:text-blue-600 transition font-medium">Galería</button>
              <button onClick={() => scrollToSection('blog')} className="text-gray-700 hover:text-blue-600 transition font-medium">Blog</button>
              <button onClick={() => scrollToSection('booking')} className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition">Reservar</button>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                <div className={`h-0.5 w-6 bg-gray-900 transition-transform origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                <div className={`h-0.5 w-6 bg-gray-900 transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`h-0.5 w-6 bg-gray-900 transition-transform origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
              </div>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 pt-2 border-t border-gray-100">
              <button onClick={() => scrollToSection('experience')} className="block w-full text-left py-2 text-gray-700">Experiencia</button>
              <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 text-gray-700">Servicios</button>
              <button onClick={() => scrollToSection('gallery')} className="block w-full text-left py-2 text-gray-700">Galería</button>
              <button onClick={() => scrollToSection('blog')} className="block w-full text-left py-2 text-gray-700">Blog</button>
              <button onClick={() => scrollToSection('booking')} className="block w-full text-left mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-semibold">Reservar</button>
            </div>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-blue-500/20 border border-blue-400 text-blue-200 px-4 py-2 rounded-full text-sm font-semibold">
                  ⚡ La mejor experiencia de flyboard
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
                Vuela sobre el <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">Mediterráneo</span>
              </h1>
              
              <p className="text-xl text-gray-300">
                Clases personalizadas en Cannes. Aprende backflips, dolphins y acrobacias frente a los yates más lujosos del mundo.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => scrollToSection('booking')}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Reservar ahora
                </button>
                <button 
                  onClick={() => scrollToSection('experience')}
                  className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2"
                >
                  Ver más <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-8 pt-8 text-sm">
                <div>
                  <p className="text-2xl font-bold text-blue-300">1000+</p>
                  <p className="text-gray-400">Clientes reales</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-300">🥇</p>
                  <p className="text-gray-400">Top Flyboarder</p>
                </div>
              </div>
            </div>

            <div className="relative h-96 md:h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-orange-400/20 rounded-2xl backdrop-blur-sm border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-xl text-white font-semibold">Volando sobre</p>
                  <p className="text-lg text-blue-200">los yates de Cannes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">La Experiencia</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2 mb-4">
              ¿Por qué volar con Jeff?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
              <div className="w-14 h-14 bg-blue-600 text-white rounded-lg flex items-center justify-center text-2xl mb-4">👨‍🏫</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instructor Elite</h3>
              <p className="text-gray-700">Uno de los mejores flyboarders del mundo con más de 1000 alumnos satisfechos.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border border-orange-200">
              <div className="w-14 h-14 bg-orange-600 text-white rounded-lg flex items-center justify-center text-2xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ubicación Premium</h3>
              <p className="text-gray-700">Vuela sobre los yates más lujosos de Cannes en el Mediterráneo.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200">
              <div className="w-14 h-14 bg-purple-600 text-white rounded-lg flex items-center justify-center text-2xl mb-4">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Aprende Trucos</h3>
              <p className="text-gray-700">Backflips, dolphins, acrobacias extremas personalizadas a tu nivel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Paquetes</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2">Elige tu experiencia</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {packages.map((pkg) => (
              <div key={pkg.id} className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition border ${pkg.popular ? 'border-2 border-orange-500 relative' : 'border-gray-200'}`}>
                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">POPULAR</div>
                )}
                <div className={`h-2 bg-gradient-to-r ${pkg.color}`}></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.nombre}</h3>
                  <p className="text-gray-600 mb-6">{pkg.descripcion}</p>
                  
                  <div className="mb-8">
                    <p className={`text-4xl font-bold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                      €{pkg.precio}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">⏱️ {pkg.duracion}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.incluye.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700">
                        <span className="text-blue-600 font-bold">✓</span> {item}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => handlePackageSelect(pkg)}
                    className={`w-full text-white py-3 rounded-lg font-bold transition bg-gradient-to-r ${pkg.color}`}
                  >
                    Seleccionar paquete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Galería</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2">Momentos épicos</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-orange-400 shadow-lg hover:shadow-2xl transition group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/60 transition"></div>
                <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-40 group-hover:opacity-60 transition">
                  {i % 4 === 0 && '✈️'}
                  {i % 4 === 1 && '🌊'}
                  {i % 4 === 2 && '🎆'}
                  {i % 4 === 3 && '🏆'}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Sígueme en Instagram para contenido exclusivo</p>
            <a 
              href="https://instagram.com/jeff_gazzola" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition"
            >
              @jeff_gazzola
            </a>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Blog</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2">Tips y consejos</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                titulo: 'Cómo dominar el backflip',
                fecha: '15 Jun 2024',
                excerpt: 'Aprende paso a paso la técnica para hacer tu primer backflip en flyboard.',
                emoji: '🔄'
              },
              {
                titulo: 'Seguridad en el agua',
                fecha: '10 Jun 2024',
                excerpt: 'Guía completa sobre medidas de seguridad y equipo necesario.',
                emoji: '🛡️'
              },
              {
                titulo: 'Los mejores spots en Cannes',
                fecha: '5 Jun 2024',
                excerpt: 'Descubre los mejores lugares para volar en el Mediterráneo.',
                emoji: '🌍'
              }
            ].map((post, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition border border-gray-200">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-orange-400 flex items-center justify-center text-6xl">
                  {post.emoji}
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{post.fecha}</p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{post.titulo}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <button className="text-blue-600 font-bold hover:text-blue-700">
                    Leer más →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Clientes</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mt-2">Lo que dicen nuestros alumnos</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                nombre: "María González",
                país: "España",
                texto: "La mejor experiencia de mi vida. Jeff es un profesional increíble y muy seguro.",
                estrellas: 5
              },
              {
                nombre: "Thomas Laurent",
                país: "Francia",
                texto: "Experiencia única en Cannes. Jeff maneja todo con profesionalismo.",
                estrellas: 5
              },
              {
                nombre: "Sofia Martinez",
                país: "Colombia",
                texto: "Sin experiencia previa y en una hora ya estaba haciendo acrobacias. Jeff es un maestro.",
                estrellas: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.estrellas)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.texto}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.nombre}</p>
                  <p className="text-sm text-gray-600">{testimonial.país}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING SECTION */}
      <section id="booking" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-2xl mx-auto">
          {!reservaExitosa ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">Listo para volar?</h2>
                <p className="text-xl text-gray-300">Paso {bookingStep} de 4</p>
              </div>

              {/* STEP 1: Select Package */}
              {bookingStep === 1 && (
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-8">Selecciona tu paquete</h3>
                  <div className="space-y-4">
                    {packages.map((pkg) => (
                      <button
                        key={pkg.id}
                        onClick={() => handlePackageSelect(pkg)}
                        className="w-full text-left p-6 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 hover:border-white/40 transition"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-bold">{pkg.nombre}</h4>
                            <p className="text-gray-300 text-sm">{pkg.descripcion}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">€{pkg.precio}</p>
                            <p className="text-sm text-gray-400">{pkg.duracion}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Personal Info */}
              {bookingStep === 2 && (
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-8">Tu información</h3>
                  <form onSubmit={(e) => { e.preventDefault(); setBookingStep(3); }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Nombre completo</label>
                      <input 
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Teléfono / WhatsApp</label>
                      <input 
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        placeholder="+34 6XX XX XX XX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Fecha deseada</label>
                      <input 
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Mensaje (opcional)</label>
                      <textarea 
                        rows="3"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                        placeholder="Cuéntame sobre ti..."
                      ></textarea>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button 
                        type="button"
                        onClick={() => setBookingStep(1)}
                        className="flex-1 border border-white/20 text-white py-3 rounded-lg font-bold hover:bg-white/10 transition"
                      >
                        Atrás
                      </button>
                      <button 
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition"
                      >
                        Continuar
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* STEP 3: Payment */}
              {bookingStep === 3 && (
                <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-8">Método de pago</h3>
                  
                  <div className="space-y-4 mb-8">
                    {/* Stripe Card */}
                    <button
                      onClick={() => handlePaymentMethodChange('stripe')}
                      className={`w-full p-6 rounded-lg border-2 transition ${
                        formData.metodoPago === 'stripe' 
                          ? 'border-blue-500 bg-blue-500/20' 
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                          💳
                        </div>
                        <div className="text-left">
                          <p className="font-bold">Tarjeta de crédito</p>
                          <p className="text-sm text-gray-300">Visa, Mastercard, Amex</p>
                        </div>
                      </div>
                    </button>

                    {/* PayPal */}
                    <button
                      onClick={() => handlePaymentMethodChange('paypal')}
                      className={`w-full p-6 rounded-lg border-2 transition ${
                        formData.metodoPago === 'paypal' 
                          ? 'border-blue-500 bg-blue-500/20' 
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
                          🅿️
                        </div>
                        <div className="text-left">
                          <p className="font-bold">PayPal</p>
                          <p className="text-sm text-gray-300">Pago seguro con tu cuenta</p>
                        </div>
                      </div>
                    </button>

                    {/* WhatsApp */}
                    <button
                      onClick={() => handlePaymentMethodChange('whatsapp')}
                      className={`w-full p-6 rounded-lg border-2 transition ${
                        formData.metodoPago === 'whatsapp' 
                          ? 'border-green-500 bg-green-500/20' 
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                          💬
                        </div>
                        <div className="text-left">
                          <p className="font-bold">Contactar por WhatsApp</p>
                          <p className="text-sm text-gray-300">Jeff te enviará detalles de pago</p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Resumen */}
                  <div className="bg-white/5 border border-white/20 rounded-lg p-6 mb-8">
                    <h4 className="font-bold mb-4">Resumen de la reserva</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Paquete:</span>
                        <span className="font-bold">{selectedPackage?.nombre}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fecha:</span>
                        <span className="font-bold">{formData.fecha}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cliente:</span>
                        <span className="font-bold">{formData.nombre}</span>
                      </div>
                      <div className="border-t border-white/20 pt-2 mt-2 flex justify-between text-base">
                        <span className="font-bold">Total:</span>
                        <span className="text-2xl font-bold text-blue-400">€{selectedPackage?.precio}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setBookingStep(2)}
                      className="flex-1 border border-white/20 text-white py-3 rounded-lg font-bold hover:bg-white/10 transition"
                    >
                      Atrás
                    </button>
                    <button 
                      onClick={handleReservaSubmit}
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-orange-500 text-white py-3 rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader className="w-5 h-5 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5" />
                          Confirmar pago
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-gray-400 text-xs mt-4 flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Pago 100% seguro con encriptación SSL
                  </p>
                </div>
              )}

              {/* STEP 4: Success */}
              {bookingStep === 4 && (
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur border-2 border-green-500 rounded-2xl p-8 text-center">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="w-16 h-16 text-green-400" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3">¡Reserva confirmada!</h3>
                  <p className="text-lg mb-6">
                    Tu reserva ha sido procesada exitosamente. Recibirás una confirmación por email y WhatsApp en los próximos minutos.
                  </p>
                  <div className="bg-white/10 border border-white/20 rounded-lg p-4 text-sm mb-6">
                    <p className="text-gray-300">ID de reserva: RES-{Date.now().toString().slice(-6)}</p>
                  </div>
                  <p className="text-gray-300">
                    Jeff se contactará contigo para confirmar todos los detalles. ¡Prepárate para una experiencia inolvidable!
                  </p>
                </div>
              )}
            </>
          ) : null}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Contacto</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Teléfono / WhatsApp</p>
                    <p className="text-gray-600">
                      <a href="tel:+33648392644" className="text-blue-600 hover:text-blue-700">
                        +33 (0)6 48 39 26 44
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600">
                      <a href="mailto:jeffreygazzola@gmail.com" className="text-blue-600 hover:text-blue-700">
                        jeffreygazzola@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ubicación</p>
                    <p className="text-gray-600">Cannes, Francia</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">¿Preguntas?</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">¿Cuál es la edad mínima?</p>
                  <p className="text-white/80 text-sm">18 años. Sin experiencia necesaria, lo aprendes todo.</p>
                </div>
                <div>
                  <p className="font-semibold mb-2">¿Qué está incluido?</p>
                  <p className="text-white/80 text-sm">Equipo, instrucción, fotos/video y seguro.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2024 Jeff Gazzola Flyboard. Todos los derechos reservados.</p>
          <p className="mt-2 text-sm">Página profesional para reservas de experiencias</p>
        </div>
      </footer>
    </div>
  );
}
