'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  BarChart2,
  Database,
  Brain,
  Zap,
  ArrowRight,
  ArrowDown,
  Github,
  Linkedin,
  Lightbulb,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

const OrbitalStack = dynamic(() => import('@/components/OrbitalStack'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[400px] flex items-center justify-center">
      <p className="text-white">Cargando animación...</p>
    </div>
  ),
});

const EarthCanvas = dynamic(() => import('@/components/Earth'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse text-cyan-400">Cargando planeta...</div>
    </div>
  ),
});

export default function Home() {
  const [showCanvas, setShowCanvas] = useState(false);
  
  useEffect(() => { 
    const timer = setTimeout(() => {
      setShowCanvas(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-grid-white/[0.03] relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-950 via-black to-gray-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
      </div>

      <div className="absolute z-50 pointer-events-auto cursor-pointer
       w-32 h-32
       top-6
       right-2 sm:right-4
       lg:w-[700px] lg:h-[700px]
       lg:top-[-400px]
       lg:right-[-55px]
       opacity-90
       hover:opacity-100
       transition-opacity
       select-none
      ">
        {showCanvas && <EarthCanvas />}
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-32 lg:pb-40 z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start gap-6 text-center lg:text-left"
          >
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-cyan-500 shadow-neon-blue z-10">
                <Image src="/pedro.jpg" alt="Foto de Pedro Quintana" fill sizes="(max-width: 768px) 128px, 160px" className="object-cover" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-orbitron">
                Hola, soy Pedro Quintana
              </h2>
              <p className="text-lg text-cyan-400 font-medium">AI & Automation Engineer</p>
              <motion.div
                animate={{ textShadow: ['0 0 8px rgba(0, 191, 255, 0.5)', '0 0 15px rgba(138, 43, 226, 0.6)', '0 0 8px rgba(0, 191, 255, 0.5)'] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
                className="inline-block px-4 py-1.5 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/10 text-cyan-400"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Transformando datos en acciones
                </span>
              </motion.div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-200 to-cyan-400 pb-4">
              Automatización <br className="hidden sm:block" />
              <span className="text-2xl sm:text-3xl md:text-3xl font-bold tracking-tight font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-teal-200 animate-text-gradient">con Inteligencia Artificial</span>
            </h1>
            
            <p className="text-lg text-gray-300 max-w-2xl">
              Impulso a las empresas con automatizaciones basadas en IA que transforman horas de trabajo en segundos de resultado. Desde dashboards inteligentes hasta flujos end-to-end, colaboro con equipos que quieren escalar sin fricciones.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 lg:pl-8 lg:mt-0 lg:pt-80"
          >
            <h2 className="text-2xl font-bold text-white font-orbitron mb-4">Sobre mí</h2>
            <div className="text-gray-300 text-sm leading-relaxed space-y-3">
              <p>
                Soy un <b>apasionado de la Inteligencia Artificial y la Automatización</b>. Mi objetivo es simple: resolver problemas complejos y liberar el potencial de los equipos a través de soluciones tecnológicas elegantes y eficientes. Disfruto cada fase del proceso, desde el diseño de la arquitectura hasta la implementación final que acelera la toma de decisiones.
              </p>
              <p>
                Mi experiencia con <span className="font-semibold text-cyan-300">n8n</span>, <span className="font-semibold text-cyan-300">Python</span> y <span className="font-semibold text-cyan-300">Power BI</span> me permite desarrollar:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-gray-400">
                <li><b>Sistemas de análisis predictivo</b> que ayudan a anticipar tendencias y tomar decisiones estratégicas basadas en datos.</li>
                <li><b>Plataformas de automatización empresarial</b> que integran múltiples departamentos y mejoran la colaboración interna.</li>
                <li><b>Soluciones de Business Intelligence</b> que proporcionan visibilidad en tiempo real sobre KPIs críticos para el negocio.</li>
              </ul>
              <p>
                Busco alianzas a largo plazo con organizaciones que abracen el cambio: aprendamos y evolucionemos juntos para mantenernos siempre a la vanguardia.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-12 flex justify-center mt-12"
          >
            <OrbitalStack />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-12 mt-12"
          >
            <h2 className="text-2xl font-bold text-white font-orbitron mb-8 text-center">Últimos Proyectos Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-sm border border-violet-500/20 rounded-xl p-6 hover:border-violet-400/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-violet-500/10 rounded-lg">
                      <Brain className="w-6 h-6 text-violet-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Monitoreo de Medios con IA</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Workflow n8n que analiza cientos de noticias, detecta riesgos reputacionales y envía un informe ejecutivo cada mañana.
                  </p>
                  <div className="mt-4 p-3 bg-violet-900/20 border border-violet-500/20 rounded-lg text-xs">
                    <p className="font-bold text-violet-300 mb-1 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />Dato Curioso
                    </p>
                    <p className="text-gray-400">
                      Utiliza una arquitectura <i>multi-agente</i> y embeddings generados localmente para comprender el contexto real detrás de cada titular.
                    </p>
                  </div>
                </div>
                <div class="mt-6 flex justify-center">
                  <Button disabled className="cursor-not-allowed bg-gray-700/50 text-gray-400/80 text-xs py-2 px-4 rounded-lg">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub (Próximamente)
                  </Button>
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-sm border border-amber-500/20 rounded-xl p-6 hover:border-amber-400/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                      <BarChart2 className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Dashboard Adventure Works</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Informe interactivo en Power BI que revela tendencias de ventas y márgenes clave para Adventure Works Cycles en tres continentes.
                  </p>
                  <div className="mt-4 p-3 bg-amber-900/20 border border-amber-500/20 rounded-lg text-xs">
                    <p className="font-bold text-amber-300 mb-1 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />Dato Curioso
                    </p>
                    <p className="text-gray-400">
                      El modelo DAX calcula KPIs en tiempo real sobre un esquema en estrella optimizado: 1.98&nbsp;M US$ de ingresos en segundos.
                    </p>
                  </div>
                </div>
                <div class="mt-6 flex justify-center">
                  <Button disabled className="cursor-not-allowed bg-gray-700/50 text-gray-400/80 text-xs py-2 px-4 rounded-lg">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub (Próximamente)
                  </Button>
                </div>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} className="bg-white/5 backdrop-blur-sm border border-violet-500/20 rounded-xl p-6 hover:border-violet-400/40 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-violet-500/10 rounded-lg">
                      <Database className="w-6 h-6 text-violet-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Clipping & ROI 3-en-1</h3>
                  </div>
                  <p className="text-gray-300 text-sm mb-4">
                    Sistema n8n que genera simultáneamente informe HTML, PDF y PPTX con métricas de ROI y gráficos dinámicos.
                  </p>
                  <div className="mt-4 p-3 bg-violet-900/20 border border-violet-500/20 rounded-lg text-xs">
                    <p className="font-bold text-violet-300 mb-1 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />Dato Curioso
                    </p>
                    <p className="text-gray-400">
                      Un microservicio Python en Render crea las presentaciones PPTX sobre la marcha con gráficos generados en Matplotlib.
                    </p>
                  </div>
                </div>
                <div class="mt-6 flex justify-center">
                  <a
                    href="https://youtu.be/lDFzFftjdNo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-300 hover:text-violet-400 text-sm font-semibold underline flex items-center gap-1"
                  >
                    Ver demo en YouTube
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="lg:col-span-12 text-center mt-12 flex flex-col items-center gap-8">
            <Link href="/proyectos" passHref>
              <motion.div
                initial={{ opacity: 1 }}
                animate={{
                  opacity: [1, 0.7, 1],
                  boxShadow: [
                    '0 0 32px 8px #ff0000, 0 0 0px #00ff00, 0 0 0px #0000ff',
                    '0 0 32px 8px #00ff00, 0 0 0px #0000ff, 0 0 0px #ff0000',
                    '0 0 32px 8px #0000ff, 0 0 0px #ff0000, 0 0 0px #00ff00',
                    '0 0 32px 8px #ff0000, 0 0 0px #00ff00, 0 0 0px #0000ff',
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear',
                }}
                whileHover={{ y: -5, scale: 1.08, boxShadow: '0 0 48px 16px #fff, 0 0 32px 8px #00fff7, 0 0 32px 8px #ff00ea', opacity: 1 }}
                className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold rounded-lg px-12 py-6 text-2xl transition-all hover:bg-cyan-500/20 hover:border-cyan-400/50 shadow-lg"
              >
                Ver más proyectos
              </motion.div>
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              <Button asChild className="group bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-blue-700 hover:to-cyan-500 text-white px-8 py-6 text-lg font-medium rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                <a href="https://wa.me/5491139044027" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  Contactar
                  <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                </a>
              </Button>
              <a href="mailto:QUINTANAPEDRORUBEN79@GMAIL.COM" 
                className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors duration-300 font-ibm-plex-mono text-sm text-center"
              >
                <Image 
                  src="/icons/gmail.png" 
                  alt="Gmail logo" 
                  width={48} 
                  height={48} 
                  className="rounded-full" 
                />
                <span>QUINTANAPEDRORUBEN79@GMAIL.COM</span>
              </a>
            </motion.div>
          </div>

          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
            <a href="https://github.com/Pedroru101" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group" aria-label="GitHub">
              <Github className="w-5 h-5 text-gray-300 group-hover:text-[#F05033] transition-colors duration-300" />
            </a>
            <a href="https://www.linkedin.com/in/dataquintanapedro" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300" />
            </a>
            <a
              href="https://wa.me/5491139044027"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
              aria-label="WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                fill="currentColor"
                className="w-5 h-5 text-gray-300 group-hover:text-green-400 transition-colors duration-300"
              >
                <path d="M16 3C9.373 3 4 8.373 4 15c0 2.402.752 4.676 2.149 6.599L4 29l7.584-2.168A11.902 11.902 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3Zm0 21.6c-1.876 0-3.705-.521-5.287-1.507l-.378-.233-4.25 1.215 1.233-4.139-.245-.392A9.597 9.597 0 0 1 6.4 15c0-5.301 4.299-9.6 9.6-9.6s9.6 4.299 9.6 9.6-4.299 9.6-9.6 9.6Zm5.243-7.193c-.288-.144-1.703-.84-1.967-.936-.264-.096-.456-.144-.648.144s-.744.936-.912 1.128c-.168.192-.336.216-.624.072-.288-.144-1.248-.456-2.376-1.44-.88-.784-1.464-1.728-1.632-2.016-.168-.288-.024-.44.12-.576.12-.12.288-.312.432-.48.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.464-.888-2.016-.24-.552-.48-.48-.648-.48h-.552c-.192 0-.504.072-.768.36-.264.288-1.032 1.008-1.032 2.448s1.08 2.856 1.224 3.048c.144.192 2.136 3.24 5.184 4.536.72.312 1.296.504 1.728.648.744.24 1.416.204 1.944.132.6-.084 1.824-.744 2.088-1.452.264-.708.264-1.308.192-1.44-.072-.132-.24-.204-.528-.348Z" />
              </svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}