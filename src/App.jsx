import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Music, Mic, Drum, Guitar, Disc, User, Users, Star, Music2, MessageCircle, Send, X, Play, Pause, Volume2, VolumeX, Maximize, Facebook } from 'lucide-react';
import './index.css';

const navLinks = [
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Shows', href: '#shows' },
  { name: 'Música en Vivo', href: '#musica' },
  { name: 'Galería', href: '#galeria' },
];

const showServices = [
  { title: 'BAILARINES', desc: 'Bailarines profesionales que llenan tu evento de energía y magia.', icon: <User size={32} /> },
  { title: 'EDECANES', desc: 'Imagen, elegancia y presencia que destaca tu marca.', icon: <Star size={32} /> },
  { title: 'SHOW DE BAILE', desc: 'Rutinas impactantes que crean momentos inolvidables.', icon: <Users size={32} /> },
  { title: 'MODELAJE', desc: 'Estilo, presencia y profesionalismo para tu evento.', icon: <User size={32} /> },
  { title: 'HAPPENINGS', desc: 'Sorpresas creativas que hacen único tu evento.', icon: <Star size={32} /> },
];

const musicServices = [
  { title: 'PIANISTAS', desc: 'Elegancia y armonía que crean ambientes únicos.', icon: <Music size={32} /> },
  { title: 'MÚSICA EN VIVO', desc: 'Voces que enamoran y llenan tu evento de emoción.', icon: <Mic size={32} /> },
  { title: 'BANDAS', desc: 'Energía, ritmo y el mejor ambiente para tu fiesta.', icon: <Drum size={32} /> },
  { title: 'MARIACHIS', desc: 'Tradición y pasión que hacen cada ocasión inolvidable.', icon: <Guitar size={32} /> },
  { title: 'GRUPOS ACÚSTICOS', desc: 'Sofisticación y estilo para momentos especiales.', icon: <Disc size={32} /> },
  { title: 'Y MÁS OPCIONES', desc: 'Tenemos el show perfecto para tu evento.', icon: <Music2 size={32} /> },
];

const eventsList = ['BODAS', 'XV AÑOS', 'EVENTOS CORPORATIVOS', 'FIESTAS PRIVADAS', 'Y MÁS'];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({ name: '', date: '', location: '' });
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef(null);

  const phone = "529981348065";

  const messages = [
    { sender: 'bot', text: '¡Hola! Bienvenido a ADDE OCHA. ¿En qué podemos ayudarte?' },
    { sender: 'bot', text: 'Para brindarte una atención personalizada, ¿podrías indicarnos tu nombre completo?' }
  ];

  const [chatHistory, setChatHistory] = useState(messages);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isOpen]);

  const handleSend = () => {
    if (!inputVal.trim()) return;

    const newHistory = [...chatHistory, { sender: 'user', text: inputVal }];
    let nextStep = step;
    let newFormData = { ...formData };

    if (step === 0) {
      newFormData.name = inputVal;
      newHistory.push({ sender: 'bot', text: `¡Gracias ${inputVal}! ¿Cuál es la fecha estimada de tu evento?` });
      nextStep = 1;
    } else if (step === 1) {
      newFormData.date = inputVal;
      newHistory.push({ sender: 'bot', text: 'Perfecto. ¿En qué ubicación o salón se llevará a cabo?' });
      nextStep = 2;
    } else if (step === 2) {
      newFormData.location = inputVal;
      const finalMsg = `¡Excelente! Hemos recopilado tu información:\nNombre: ${newFormData.name}\nFecha: ${newFormData.date}\nUbicación: ${newFormData.location}\n\nHaz clic en el botón abajo para enviarnos estos datos por WhatsApp y continuar tu cotización.`;
      newHistory.push({ sender: 'bot', text: finalMsg });
      nextStep = 3;
    }

    setChatHistory(newHistory);
    setFormData(newFormData);
    setStep(nextStep);
    setInputVal('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const generateWaLink = () => {
    const text = `Hola ADDE OCHA, solicito información de contacto.\n\nMis datos:\nNombre: ${formData.name}\nFecha del evento: ${formData.date}\nUbicación: ${formData.location}`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <motion.button 
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ position: 'fixed', bottom: '2rem', right: '2rem', width: '60px', height: '60px', borderRadius: '30px', backgroundColor: 'var(--gold)', color: 'var(--dark)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 10px 25px rgba(212,175,55,0.4)', zIndex: 100, border: 'none', cursor: 'pointer' }}
      >
        <MessageCircle size={30} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            style={{ position: 'fixed', bottom: '6rem', right: '2rem', width: '350px', backgroundColor: 'var(--white)', borderRadius: '20px', boxShadow: '0 15px 40px rgba(0,0,0,0.2)', zIndex: 100, overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '500px' }}
          >
            <div style={{ backgroundColor: 'var(--dark)', color: 'var(--gold)', padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageCircle size={24} />
                <h4 style={{ margin: 0, fontFamily: 'var(--font-heading)' }}>Asistente ADDE OCHA</h4>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--gold)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '1rem', flex: 1, overflowY: 'auto', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '300px' }}>
              {chatHistory.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end', backgroundColor: msg.sender === 'bot' ? 'var(--dark-alt)' : 'var(--gold)', color: msg.sender === 'bot' ? 'var(--gold)' : 'var(--dark)', padding: '0.8rem 1.2rem', borderRadius: msg.sender === 'bot' ? '15px 15px 15px 0' : '15px 15px 0 15px', maxWidth: '85%', fontSize: '0.9rem', whiteSpace: 'pre-line', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                  {msg.text}
                </div>
              ))}
              {step === 3 && (
                <a 
                  href={generateWaLink()} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ alignSelf: 'center', backgroundColor: '#25D366', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '20px', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', boxShadow: '0 4px 10px rgba(37,211,102,0.3)' }}
                >
                  <MessageCircle size={18} /> Enviar a WhatsApp
                </a>
              )}
              <div ref={messagesEndRef} />
            </div>

            {step < 3 && (
              <div style={{ padding: '1rem', backgroundColor: 'white', borderTop: '1px solid #eee', display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Escribe aquí..."
                  style={{ flex: 1, padding: '0.8rem', borderRadius: '20px', border: '1px solid #ccc', outline: 'none' }}
                />
                <button 
                  onClick={handleSend}
                  style={{ backgroundColor: 'var(--dark)', color: 'var(--gold)', border: 'none', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                >
                  <Send size={18} />
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const CustomVideoPlayer = ({ src, autoPlay = false, defaultMuted = true }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(defaultMuted);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [autoPlay]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  const handleFullscreen = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      }
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: 'black', borderRadius: '15px', overflow: 'hidden' }} className="video-container">
      {!isPlaying && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, pointerEvents: 'none', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '50%', padding: '15px', color: 'var(--gold)' }}>
          <Play size={40} />
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        loop
        muted={isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onClick={togglePlay}
        style={{ width: '100%', height: '100%', maxHeight: '70vh', objectFit: 'contain', cursor: 'pointer' }}
      />
      
      {/* Custom Controls Overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
        padding: '20px 15px 15px', display: 'flex', flexDirection: 'column', gap: '10px',
        opacity: 0, transition: 'opacity 0.3s', zIndex: 20
      }}
      className="video-controls"
      >
        {/* Progress bar */}
        <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--gold)', transition: 'width 0.1s linear' }} />
        </div>
        
        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--white)' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button onClick={togglePlay} style={{ background: 'transparent', border: 'none', color: 'var(--white)', cursor: 'pointer', display: 'flex', padding: 0 }}>
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button onClick={toggleMute} style={{ background: 'transparent', border: 'none', color: 'var(--white)', cursor: 'pointer', display: 'flex', padding: 0 }}>
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>
          <button onClick={handleFullscreen} style={{ background: 'transparent', border: 'none', color: 'var(--white)', cursor: 'pointer', display: 'flex', padding: 0 }}>
            <Maximize size={20} />
          </button>
        </div>
      </div>
      
      {/* CSS for hover effect on controls */}
      <style>{`
        .video-container:hover .video-controls {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default function App() {
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.95)']);
  const navBorder = useTransform(scrollY, [0, 100], ['rgba(212, 175, 55, 0)', 'rgba(212, 175, 55, 0.3)']);
  
  const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {/* Navigation */}
      <motion.nav
        style={{ backgroundColor: navBg, borderBottomWidth: 1, borderBottomStyle: 'solid', borderBottomColor: navBorder, backdropFilter: 'blur(10px)' }}
        style={{ position: 'fixed', top: 0, width: '100%', zIndex: 50, padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--gold)', letterSpacing: '2px', marginBottom: '-5px' }}>ADDE OCHA</h1>
          <span style={{ fontSize: '0.7rem', letterSpacing: '4px', color: 'var(--text-light)', textTransform: 'uppercase' }}>Shows & Entretenimiento</span>
        </motion.div>
        <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center' }}>
          {navLinks.map((link, i) => (
            <motion.li key={link.name} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <a href={link.href} style={{ textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 500, letterSpacing: '1px', transition: 'color 0.3s' }} onMouseOver={e => e.target.style.color = 'var(--gold)'} onMouseOut={e => e.target.style.color = 'var(--white)'}>{link.name}</a>
            </motion.li>
          ))}
          <motion.li initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <a href="#reserva" style={{ border: '1px solid var(--gold)', padding: '0.5rem 1.5rem', borderRadius: '30px', color: 'var(--gold)', textTransform: 'uppercase', fontSize: '0.9rem', fontWeight: 500, transition: 'all 0.3s' }} onMouseOver={e => { e.target.style.backgroundColor = 'var(--gold)'; e.target.style.color = 'var(--dark)' }} onMouseOut={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--gold)' }}>Reserva Ahora</a>
          </motion.li>
        </ul>
      </motion.nav>

      {/* Hero Section */}
      <section style={{ position: 'relative', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <motion.div 
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url("/assets/hero_bg.png")', backgroundSize: 'cover', backgroundPosition: 'center', y: heroY, opacity: heroOpacity }}
        />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 2rem' }}>
          <motion.h2 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 400, letterSpacing: '2px', lineHeight: 1.1 }}>
            CREAMOS <span className="clip-text" style={{ fontWeight: 600 }}>EXPERIENCIAS</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginTop: '-10px', marginBottom: '2rem' }}>
            que impactan
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} style={{ fontSize: '1.2rem', letterSpacing: '3px', marginBottom: '3rem', color: 'var(--gold-light)' }}>
            LLEVAMOS TU EVENTO AL SIGUIENTE NIVEL
          </motion.p>
          <motion.a href="#shows" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.2 }} whileHover={{ scale: 1.05, backgroundColor: '#fff' }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-block', backgroundColor: 'var(--gold)', color: 'var(--dark)', padding: '1rem 2.5rem', fontWeight: 600, letterSpacing: '2px', borderRadius: '5px', textTransform: 'uppercase' }}>
            Descubre Más
          </motion.a>
        </div>
      </section>

      {/* Nosotros Section */}
      <section id="nosotros" style={{ padding: '8rem 5%', backgroundColor: 'var(--dark)', position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--gold)', letterSpacing: '2px', marginBottom: '1.5rem' }}>NUESTRA MISIÓN</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto', fontStyle: 'italic' }}>
              "Capturar y transformar los momentos más importantes de nuestros clientes en narrativas visuales de alta calidad, combinando creatividad, técnica moderna y la belleza natural del entorno de Cancún para entregar piezas audiovisuales memorables que superen cualquier expectativa."
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} style={{ textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--gold)', letterSpacing: '2px', marginBottom: '1.5rem' }}>NUESTRA VISIÓN</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '1.2rem', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto', fontStyle: 'italic' }}>
              "Consolidarse como la productora audiovisual de referencia en Cancún y la Riviera Maya, reconocida por su innovación estética, excelencia en el servicio al cliente y su capacidad para inmortalizar eventos sociales, corporativos y turísticos con un sello único y vanguardista."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shows Section */}
      <section id="shows" style={{ padding: '8rem 5%', backgroundColor: 'var(--dark-alt)', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h3 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', color: 'var(--gold)', letterSpacing: '2px' }}>
            SHOWS & ENTRETENIMIENTO
          </motion.h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {showServices.map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.5)', borderColor: 'rgba(212,175,55,0.5)' }} style={{ padding: '2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: '15px' }}>
                <div style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>{service.icon}</div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '1rem', letterSpacing: '1px' }}>{service.title}</h4>
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', position: 'relative' }}>
             <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} src="/assets/dancers.png" alt="Shows" style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }} />
          </motion.div>
        </div>
      </section>

      {/* Live Music Section */}
      <section id="musica" style={{ padding: '8rem 5%', backgroundColor: 'var(--light)', color: 'var(--dark)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h3 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', textAlign: 'center', marginBottom: '0.5rem', letterSpacing: '2px' }}>
            MÚSICA EN VIVO
          </motion.h3>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ textAlign: 'center', fontSize: '1.2rem', marginBottom: '4rem' }}>
            que transforma tus momentos en <span style={{ fontWeight: 700, color: 'var(--gold)' }}>RECUERDOS INOLVIDABLES</span>
          </motion.p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {musicServices.map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -10, boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }} style={{ padding: '2rem', background: 'var(--white)', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                <div style={{ color: 'var(--gold)', marginBottom: '1.5rem' }}>{service.icon}</div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', marginBottom: '1rem', letterSpacing: '1px' }}>{service.title}</h4>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', position: 'relative' }}>
             <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} src="/assets/live_music.png" alt="Live Music" style={{ width: '100%', height: '500px', objectFit: 'cover', display: 'block' }} />
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" style={{ padding: '8rem 5%', backgroundColor: 'var(--dark-alt)', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h3 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', textAlign: 'center', marginBottom: '4rem', color: 'var(--gold)', letterSpacing: '2px' }}>
            NUESTRA GALERÍA
          </motion.h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', gridColumn: '1 / -1', position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <CustomVideoPlayer src="/assets/video.mp4" autoPlay={true} />
            </motion.div>
            
            {/* Downloaded Reels */}
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <motion.div key={`reel-${num}`} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: num * 0.1 }} style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', height: '500px' }}>
                <CustomVideoPlayer src={`/assets/videos/video_0000${num}.mp4`} autoPlay={false} />
              </motion.div>
            ))}

            {['media__1780600870641.jpg', 'media__1780600879850.jpg', 'media__1780600889817.jpg', 'media__1780600899883.jpg', 'media__1780600907007.jpg'].map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }} whileHover={{ scale: 1.05, zIndex: 10 }} style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', height: '400px', cursor: 'pointer' }}>
                <img src={`/assets/${img}`} alt={`Galería ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }} onMouseOver={e => e.target.style.transform = 'scale(1.1)'} onMouseOut={e => e.target.style.transform = 'scale(1)'} />
              </motion.div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
             <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>* Estas imágenes son demostrativas o obtenidas parcialmente de nuestros perfiles. Para ver todas nuestras increíbles fotos completas y en alta calidad, por favor visita nuestro perfil de Facebook.</p>
          </div>
        </div>
      </section>

      {/* Events Strip */}
      <div style={{ padding: '3rem 5%', backgroundColor: 'var(--gold)', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '3rem' }}>
        {eventsList.map((event, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ color: 'var(--dark)', fontWeight: 600, letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Star size={16} /> {event}
          </motion.div>
        ))}
      </div>

      {/* Footer / CTA */}
      <footer id="reserva" style={{ padding: '6rem 5% 2rem', backgroundColor: 'var(--dark)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '3rem 5rem', border: '1px solid var(--gold)', borderRadius: '20px', marginBottom: '4rem', background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), transparent)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <MessageCircle size={60} color="#25D366" />
            <div style={{ textAlign: 'left' }}>
              <h3 style={{ color: 'var(--gold)', fontSize: '2rem', letterSpacing: '2px' }}>RESERVA AHORA</h3>
              <p style={{ letterSpacing: '1px', marginBottom: '5px' }}>Tel: +52 998 134 8065 | bernyochun@hotmail.com</p>
              <p style={{ letterSpacing: '1px', fontSize: '0.9rem' }}>Messenger: Adde_Ocha</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <motion.a href="https://wa.me/529981348065" target="_blank" whileHover={{ scale: 1.05, backgroundColor: '#128C7E' }} whileTap={{ scale: 0.95 }} style={{ backgroundColor: '#25D366', color: 'white', padding: '1rem 2.5rem', borderRadius: '40px', fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageCircle size={20} /> WhatsApp
            </motion.a>
            <motion.a href="https://web.facebook.com/addeocha/" target="_blank" whileHover={{ scale: 1.05, backgroundColor: '#166fe5' }} whileTap={{ scale: 0.95 }} style={{ backgroundColor: '#1877F2', color: 'white', padding: '1rem 2.5rem', borderRadius: '40px', fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Facebook size={20} /> Facebook
            </motion.a>
          </div>
        </motion.div>
        
        <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
          &copy; 2026 ADDE OCHA - Shows & Entretenimiento. Elegancia, talento y pasión en cada nota.
        </p>
      </footer>
      
      <Chatbot />
    </div>
  );
}
