import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  MapPin,
  Phone,
  Calendar,
  User,
  Stethoscope,
  HeartPulse,
  ShieldCheck,
  CheckCircle2,
  MessageCircle,
  X,
  ChevronRight,
  Info,
  Building2,
  Sparkles,
  ExternalLink,
  Menu,
  Activity,
  Award,
  Smile,
  Check,
  ArrowRight
} from 'lucide-react';

export default function App() {
  // State for Booking Form
  const [formData, setFormData] = useState({
    nombre: '',
    especialidad: 'Medicina General',
    fecha: '',
    horario: 'Mañana (8:00 a.m. - 12:00 p.m.)',
    telefono: ''
  });

  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State for Exit Intent Popup
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasTriggeredExit, setHasTriggeredExit] = useState(false);
  const sessionTimeRef = useRef(0);

  // State for Social Proof Toast Notifications
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Se ha recibido una nueva solicitud de cita');
  const [bookingSectionInView, setBookingSectionInView] = useState(false);

  // State for Lightbox in Gallery
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Track time on page for exit intent
  useEffect(() => {
    const timer = setInterval(() => {
      sessionTimeRef.current += 1;
    }, 1000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 10 &&
        !hasTriggeredExit &&
        sessionTimeRef.current >= 15
      ) {
        setShowExitPopup(true);
        setHasTriggeredExit(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      clearInterval(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggeredExit]);

  // Social Proof Toast simulation (every 18 seconds after booking section is in view)
  useEffect(() => {
    if (!bookingSectionInView) return;

    const interval = setInterval(() => {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }, 18000);

    return () => clearInterval(interval);
  }, [bookingSectionInView]);

  // Intersection observer for booking section
  const bookingRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBookingSectionInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (bookingRef.current) {
      observer.observe(bookingRef.current);
    }
    return () => {
      if (bookingRef.current) observer.unobserve(bookingRef.current);
    };
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "50765278910"; // Clinic / demo contact phone or WhatsApp
    const text = `Hola, deseo solicitar una cita en Clínica Vida Integral.%0A%0A*Nombre:* ${formData.nombre || 'No especificado'}%0A*Especialidad:* ${formData.especialidad}%0A*Fecha Preferida:* ${formData.fecha || 'Por coordinar'}%0A*Horario:* ${formData.horario}%0A*Teléfono:* ${formData.telefono || 'No especificado'}%0A%0A(Solicitud de demostración - Clínica Vida Integral)`;
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectSpecialty = (spec: string) => {
    setFormData(prev => ({ ...prev, especialidad: spec }));
    scrollToSection('citas');
  };

  const specialtiesList = [
    {
      title: "Medicina General",
      desc: "Consultas médicas generales, evaluaciones y orientación sobre el cuidado de la salud.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Pediatría",
      desc: "Atención orientada al bienestar y desarrollo de niños y adolescentes.",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Ginecología",
      desc: "Servicios de consulta y orientación sobre salud femenina.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Medicina Interna",
      desc: "Evaluación integral y seguimiento médico de adultos.",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Cardiología",
      desc: "Consultas relacionadas con la evaluación y el cuidado cardiovascular.",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Laboratorio Clínico",
      desc: "Servicios ilustrativos de análisis y pruebas de laboratorio.",
      image: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const doctorsList = [
    {
      name: "Dra. Sofía Martínez",
      specialty: "Medicina General",
      bio: "Enfoque en prevención, diagnóstico temprano y atención integral familiar.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Dr. Carlos Mendoza",
      specialty: "Pediatría",
      bio: "Especialista dedicado al crecimiento saludable y cuidado integral infantil.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Dra. Elena Rivas",
      specialty: "Ginecología",
      bio: "Comprometida con la salud integral de la mujer en todas sus etapas.",
      image: "https://images.unsplash.com/photo-1594824813576-96b42b9347d4?auto=format&fit=crop&q=80&w=600"
    },
    {
      name: "Dr. Javier Gómez",
      specialty: "Cardiología",
      bio: "Evaluación y prevención cardiovascular con tecnología y calidez humana.",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const galleryList = [
    { title: "Fachada de la Clínica", url: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=1000" },
    { title: "Recepción Principal", url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000" },
    { title: "Sala de Espera", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1000" },
    { title: "Consultorios Médicos", url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000" },
    { title: "Área de Diagnóstico", url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000" },
    { title: "Instalaciones Interiores", url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=1000" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-['Montserrat']">
      
      {/* DEMO AGENCY TOP BANNER */}
      <div className="bg-[#0f2942] text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-blue-900/40">
        <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        <span>Demostración Comercial creada por <strong>Tu Marca Local</strong> — Páginas Web Profesionales para Negocios</span>
        <a 
          href="https://wa.me/50765278910?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20una%20p%C3%A1gina%20web" 
          target="_blank" 
          rel="noopener noreferrer"
          className="ml-2 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded text-[11px] font-semibold transition"
        >
          Contáctanos
        </a>
      </div>

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0f2942] to-blue-700 flex items-center justify-center text-white shadow-md shadow-blue-900/20">
              <HeartPulse className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0f2942] block">Clínica Vida Integral</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <button onClick={() => scrollToSection('nosotros')} className="hover:text-blue-600 transition">Sobre Nosotros</button>
            <button onClick={() => scrollToSection('especialidades')} className="hover:text-blue-600 transition">Especialidades</button>
            <button onClick={() => scrollToSection('equipo')} className="hover:text-blue-600 transition">Equipo Médico</button>
            <button onClick={() => scrollToSection('galeria')} className="hover:text-blue-600 transition">Instalaciones</button>
            <button onClick={() => scrollToSection('ubicacion')} className="hover:text-blue-600 transition">Ubicación</button>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <div className="text-right hidden xl:block">
              <span className="block text-xs font-medium text-slate-400">Atención Telefónica</span>
              <span className="text-sm font-bold text-[#0f2942]">+507 999-0000</span>
            </div>
            <button 
              onClick={() => scrollToSection('citas')}
              className="bg-[#0f2942] hover:bg-blue-900 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-blue-900/20 transition duration-200 text-sm flex items-center gap-2 group"
            >
              <span>SOLICITAR CITA</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition"
            aria-label="Menú principal"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl py-6 px-6 flex flex-col gap-4 animate-fade-in">
            <button onClick={() => scrollToSection('nosotros')} className="text-left font-semibold text-slate-700 py-2 border-b border-slate-100">Sobre Nosotros</button>
            <button onClick={() => scrollToSection('especialidades')} className="text-left font-semibold text-slate-700 py-2 border-b border-slate-100">Especialidades</button>
            <button onClick={() => scrollToSection('equipo')} className="text-left font-semibold text-slate-700 py-2 border-b border-slate-100">Equipo Médico</button>
            <button onClick={() => scrollToSection('galeria')} className="text-left font-semibold text-slate-700 py-2 border-b border-slate-100">Instalaciones</button>
            <button onClick={() => scrollToSection('ubicacion')} className="text-left font-semibold text-slate-700 py-2 border-b border-slate-100">Ubicación</button>
            <button 
              onClick={() => scrollToSection('citas')}
              className="w-full bg-[#0f2942] text-white font-semibold py-3 rounded-xl text-center shadow-md mt-2"
            >
              SOLICITAR CITA
            </button>
          </div>
        )}
      </header>

      {/* 2. PORTADA PRINCIPAL (HERO SECTION) */}
      <section className="relative bg-gradient-to-b from-blue-50/70 via-white to-slate-50 py-16 lg:py-24 overflow-hidden border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column - Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-100/80 text-blue-800 text-xs font-bold px-3.5 py-1.5 rounded-full tracking-wide">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Tu salud merece atención, confianza y cercanía.</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f2942] tracking-tight leading-tight">
                TU SALUD EN BUENAS MANOS.
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                En Clínica Vida Integral creemos que una buena atención comienza con la confianza. Descubre un espacio diseñado para brindar atención médica cercana, comodidad y orientación profesional.
              </p>

              {/* CTAs and Element 2: Scarcity & Urgency */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-full sm:w-auto">
                  <button 
                    onClick={() => scrollToSection('citas')}
                    className="w-full sm:w-auto bg-[#0f2942] hover:bg-blue-900 text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-blue-900/25 transition duration-200 text-base flex items-center justify-center gap-3 group"
                  >
                    <span>SOLICITAR CITA</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                  </button>
                  {/* Element 2: Cupos Disponibles indicator */}
                  <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200/60 w-fit">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span>Solo 7 espacios disponibles para hoy</span>
                  </div>
                </div>

                <button 
                  onClick={() => scrollToSection('especialidades')}
                  className="w-full sm:w-auto bg-white hover:bg-slate-100 text-[#0f2942] border-2 border-slate-300 font-bold px-8 py-4 rounded-xl transition duration-200 text-base flex items-center justify-center gap-2"
                >
                  CONOCER ESPECIALIDADES
                </button>
              </div>

              {/* 3 Benefits bullets */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-200/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Atención personalizada</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Ambiente cómodo</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">Servicios médicos integrales</span>
                </div>
              </div>

            </div>

            {/* Right Column - Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-3xl blur-lg opacity-30"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                  <img 
                    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000" 
                    alt="Médica atendiendo a paciente en consultorio moderno" 
                    className="w-full h-[420px] object-cover transform hover:scale-105 transition duration-700"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0f2942]/90 via-[#0f2942]/50 to-transparent p-6 text-white">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                        <Smile className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold">Excelencia Médica</p>
                        <p className="text-xs text-slate-200">Santiago de Veraguas, Panamá</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SOBRE NOSOTROS */}
      <section id="nosotros" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Column */}
            <div className="lg:col-span-6">
              <div className="relative">
                <div className="absolute -inset-2 bg-slate-200 rounded-3xl transform -rotate-2"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-xl bg-slate-100">
                  <img 
                    src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000" 
                    alt="Recepción médica moderna" 
                    className="w-full h-[380px] sm:h-[450px] object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Text & Cards Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
                Sobre Nosotros
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2942] tracking-tight">
                CUIDAMOS DE TI EN CADA ETAPA DE TU VIDA.
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Clínica Vida Integral nace del compromiso de ofrecer una experiencia de atención médica cercana, profesional y humana. Nuestro propósito es brindar un ambiente donde cada paciente pueda sentirse escuchado, recibir orientación y encontrar servicios de salud en un mismo lugar.
              </p>

              {/* 4 Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 hover:border-blue-400 transition shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                    <Smile className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0f2942] mb-1">Atención cercana</h3>
                  <p className="text-xs text-slate-600">Trato humano y cálido centrado en las necesidades de cada paciente.</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 hover:border-blue-400 transition shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0f2942] mb-1">Profesionales de la salud</h3>
                  <p className="text-xs text-slate-600">Equipo médico calificado con sólida vocación de servicio.</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 hover:border-blue-400 transition shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-3">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0f2942] mb-1">Comodidad</h3>
                  <p className="text-xs text-slate-600">Instalaciones modernas diseñadas para tu bienestar y tranquilidad.</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 hover:border-blue-400 transition shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold mb-3">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#0f2942] mb-1">Bienestar integral</h3>
                  <p className="text-xs text-slate-600">Enfoque preventivo y terapéutico para toda la familia.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. ESPECIALIDADES MÉDICAS */}
      <section id="especialidades" className="py-20 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100/80 px-3 py-1 rounded-md">
              Nuestros Servicios
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2942] tracking-tight">
              ENCUENTRA LA ATENCIÓN QUE NECESITAS.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Contamos con diversas especialidades médicas para cuidar de ti y de tus seres queridos con altos estándares de calidad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialtiesList.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 hover:shadow-xl transition flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <h3 className="absolute bottom-3 left-4 text-white font-bold text-xl drop-shadow">
                      {item.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-0">
                  <button 
                    onClick={() => selectSpecialty(item.title)}
                    className="w-full bg-slate-100 hover:bg-[#0f2942] hover:text-white text-[#0f2942] font-semibold py-3 px-4 rounded-xl transition duration-200 text-sm flex items-center justify-center gap-2 group/btn"
                  >
                    <span>SOLICITAR CITA</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. EQUIPO MÉDICO */}
      <section id="equipo" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
              Especialistas
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2942] tracking-tight">
              PROFESIONALES QUE INSPIRAN CONFIANZA.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Conoce a nuestro equipo de profesionales de la salud comprometidos con tu bienestar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {doctorsList.map((doc, index) => (
              <div 
                key={index} 
                className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-lg transition flex flex-col justify-between text-center group"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-slate-200">
                    <img 
                      src={doc.image} 
                      alt={doc.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#0f2942] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                      {doc.specialty}
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-bold text-lg text-[#0f2942]">{doc.name}</h3>
                    <p className="text-xs text-blue-600 font-semibold">{doc.specialty}</p>
                    <p className="text-xs text-slate-600 leading-relaxed pt-2">{doc.bio}</p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button 
                    onClick={() => selectSpecialty(doc.specialty)}
                    className="w-full bg-[#0f2942] hover:bg-blue-900 text-white font-semibold py-2.5 px-4 rounded-xl transition duration-200 text-xs shadow-md"
                  >
                    SOLICITAR CITA
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-slate-400 italic">
              * Nota: Perfiles médicos de demostración comercial. No se muestran números de idoneidad ni certificaciones médicas reales.
            </p>
          </div>

        </div>
      </section>

      {/* 6. GALERÍA DE INSTALACIONES */}
      <section id="galeria" className="py-20 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-md border border-emerald-500/30">
              Instalaciones Modernas
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              ESPACIOS PENSADOS PARA TU COMODIDAD.
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Explora nuestra clínica equipada con tecnología de vanguardia e instalaciones diseñadas para brindar una experiencia agradable.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryList.map((item, index) => (
              <div 
                key={index} 
                onClick={() => setActiveImage(item.url)}
                className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group shadow-xl border border-slate-700/60"
              >
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-bold text-white text-base tracking-wide">{item.title}</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-emerald-500 transition">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button 
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-4xl w-full">
              <img src={activeImage} alt="Instalación clínica" className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl" />
            </div>
          </div>
        )}
      </section>

      {/* 7. SOLICITUD DE CITAS (BOOKING SECTION) */}
      <section id="citas" ref={bookingRef} className="py-20 bg-gradient-to-b from-slate-50 to-blue-50/50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3 py-1 rounded-md">
              Reserva en Línea
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2942] tracking-tight">
              TU BIENESTAR COMIENZA CON UNA CONSULTA.
            </h2>
            <p className="text-slate-600 text-base">
              Completa el siguiente formulario para preparar tu solicitud de cita de manera rápida y directa por WhatsApp.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-10">
            <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Nombre completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      required
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleFormChange}
                      placeholder="Ej. María Pérez" 
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-slate-50/50 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Especialidad médica *
                  </label>
                  <div className="relative">
                    <Stethoscope className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                    <select 
                      name="especialidad"
                      value={formData.especialidad}
                      onChange={handleFormChange}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-slate-50/50 outline-none appearance-none cursor-pointer"
                    >
                      <option value="Medicina General">Medicina General</option>
                      <option value="Pediatría">Pediatría</option>
                      <option value="Ginecología">Ginecología</option>
                      <option value="Medicina Interna">Medicina Interna</option>
                      <option value="Cardiología">Cardiología</option>
                      <option value="Laboratorio Clínico">Laboratorio Clínico</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Fecha preferida *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                    <input 
                      type="date" 
                      required
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleFormChange}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-slate-50/50 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Horario preferido *
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                    <select 
                      name="horario"
                      value={formData.horario}
                      onChange={handleFormChange}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-slate-50/50 outline-none appearance-none cursor-pointer"
                    >
                      <option value="Mañana (8:00 a.m. - 12:00 p.m.)">Mañana (8:00 a.m. - 12:00 p.m.)</option>
                      <option value="Tarde (1:00 p.m. - 5:00 p.m.)">Tarde (1:00 p.m. - 5:00 p.m.)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Teléfono de contacto (Opcional)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
                  <input 
                    type="tel" 
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleFormChange}
                    placeholder="Ej. +507 6000-0000" 
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm bg-slate-50/50 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-emerald-600/25 transition duration-200 text-base flex items-center justify-center gap-3 group cursor-pointer"
                >
                  <MessageCircle className="w-6 h-6 text-emerald-100 group-hover:scale-110 transition" />
                  <span>SOLICITAR CITA POR WHATSAPP</span>
                </button>
              </div>

              <div className="space-y-2 pt-2 text-center text-xs text-slate-500">
                <p>⚠️ La solicitud no representa una cita confirmada hasta recibir confirmación por parte de la clínica.</p>
                <p>🔒 No se solicitan diagnósticos ni información médica sensible en este formulario.</p>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* 8. HORARIOS DE ATENCIÓN */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-md">
              Disponibilidad
            </span>
            <h2 className="text-3xl font-extrabold text-[#0f2942]">
              HORARIOS DE ATENCIÓN.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center mx-auto mb-4 font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0f2942] mb-1">Lunes a Viernes</h3>
              <p className="text-slate-600 font-medium">8:00 a. m. a 5:00 p. m.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0f2942] mb-1">Sábados</h3>
              <p className="text-slate-600 font-medium">8:00 a. m. a 12:00 p. m.</p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto mb-4 font-bold">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-[#0f2942] mb-1">Domingos</h3>
              <p className="text-slate-600 font-medium">Cerrado</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. UBICACIÓN Y GOOGLE MAPS */}
      <section id="ubicacion" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-100 px-3 py-1 rounded-md">
              Encuéntranos
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2942] tracking-tight">
              ENCUÉNTRANOS FÁCILMENTE.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Visítanos en nuestra ubicación céntrica en Santiago de Veraguas, Panamá.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column - Details */}
            <div className="lg:col-span-5 bg-white p-8 rounded-3xl shadow-xl border border-slate-200 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#0f2942]">Clínica Vida Integral</h3>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Dirección</h4>
                    <p className="text-slate-600 text-sm">Santiago, Veraguas, Panamá (Ubicación ilustrativa de demostración)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Teléfono</h4>
                    <p className="text-slate-600 text-sm">+507 999-0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Horarios</h4>
                    <p className="text-slate-600 text-sm">Lun - Vie: 8:00 a.m. - 5:00 p.m.<br />Sáb: 8:00 a.m. - 12:00 p.m.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <a 
                  href="https://wa.me/50765278910?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20la%20cl%C3%ADnica"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>CONSULTAR POR WHATSAPP</span>
                </a>

                <a 
                  href="https://maps.google.com/?q=Santiago+de+Veraguas+Panama"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#0f2942] hover:bg-blue-900 text-white font-bold py-3.5 px-4 rounded-xl transition text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>CÓMO LLEGAR (GOOGLE MAPS)</span>
                </a>
              </div>

            </div>

            {/* Right Column - Google Maps Interactive iframe */}
            <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden min-h-[400px]">
              <iframe
                title="Google Maps - Santiago de Veraguas"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31584.2345678!2d-80.9850!3d8.1000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fae854483e58b1f%3A0x8e826b0a049e7b39!2sSantiago%20de%20Veraguas%2C%20Veraguas%20Province%2C%20Panama!5e0!3m2!1ses!2sus!4v1650000000000!5m2!1ses!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '450px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* AGENCY FOOTER / DEMO DISCLOSURE */}
      <footer className="bg-[#0b1d2e] text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-12 border-b border-slate-800">
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Tu Marca Local</h3>
              </div>
              <p className="text-sm text-slate-400 max-w-2xl">
                Creamos páginas web profesionales, rápidas y optimizadas para conversión para clínicas, consultorios y negocios locales que quieren destacar en digital.
              </p>
            </div>

            <div className="md:col-span-4 text-md-right">
              {/* WhatsApp button for agency inquiries with exact required link & text */}
              <a 
                href="https://wa.me/50765278910?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20una%20p%C3%A1gina%20web"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition text-sm"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Consultar sobre tu propia web</span>
              </a>
            </div>
          </div>

          {/* Required specific WhatsApp instruction quote */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center text-sm text-slate-300 max-w-3xl mx-auto">
            <p className="font-medium italic">
              "Comunícate por WhatsApp únicamente si tienes alguna duda sobre cómo obtener una página web similar para tu clínica que no esté explicada en esta demostración."
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-4">
            <p>© {new Date().getFullYear()} Clínica Vida Integral (Demostración Comercial). Todos los derechos reservados.</p>
            <p className="mt-2 sm:mt-0">Desarrollado con estándares profesionales por Tu Marca Local.</p>
          </div>

        </div>
      </footer>

      {/* ========================================== */}
      {/* 5 PERSUASIVE ELEMENTS IMPLEMENTATION        */}
      {/* ========================================== */}

      {/* 1. POP-UP DE INTENCIÓN DE SALIDA */}
      {showExitPopup && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative border border-slate-200 text-center space-y-6">
            <button 
              onClick={() => setShowExitPopup(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mx-auto shadow-sm">
              <Calendar className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-[#0f2942] tracking-tight">
                ¿TODAVÍA NO HAS SOLICITADO TU CITA?
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Conoce nuestras especialidades y solicita información sobre disponibilidad de atención.
              </p>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => {
                  setShowExitPopup(false);
                  scrollToSection('citas');
                }}
                className="w-full bg-[#0f2942] hover:bg-blue-900 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition text-sm flex items-center justify-center gap-2"
              >
                <span>IR A SOLICITAR CITA</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. NOTIFICACIONES DE SOLICITUDES (PRUEBA SOCIAL TOAST) */}
      {showToast && (
        <div className="fixed bottom-6 left-6 z-40 bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl p-4 flex items-center gap-3 animate-slide-left max-w-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Nueva Solicitud</p>
            <p className="text-xs text-slate-600">{toastMessage}</p>
          </div>
        </div>
      )}

      {/* 4. BOTÓN DE ACCIÓN FLOTANTE EN MÓVIL */}
      {bookingSectionInView && (
        <div className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 lg:hidden flex items-center justify-between shadow-2xl">
          <div>
            <p className="text-xs text-slate-500 font-medium">Clínica Vida Integral</p>
            <p className="text-sm font-bold text-[#0f2942]">Agenda tu consulta hoy</p>
          </div>
          <button 
            onClick={() => scrollToSection('citas')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl text-sm shadow-md flex items-center gap-2"
          >
            <span>SOLICITAR CITA</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}



    </div>
  );
}
