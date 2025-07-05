'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import { motion, useTime, useTransform } from 'framer-motion';
import Image from 'next/image';

const skills = [
  { imgSrc: '/icons/n8n.png', name: 'n8n' },
  { imgSrc: '/icons/powerbi.svg', name: 'Power BI' },
  { imgSrc: '/icons/python.png', name: 'Python' },
  { imgSrc: '/icons/sql.png', name: 'SQL Server' },
  { imgSrc: '/icons/ollama.png', name: 'Ollama' },
  { imgSrc: '/icons/google-sheets.png', name: 'Google Sheets' },
  { imgSrc: '/icons/javascript.png', name: 'JavaScript' },
];

export default function OrbitalStack() {
  const time = useTime();

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
        {/* Tarjeta Central (Sol) */}
        <motion.div
          whileHover={{ backgroundColor: 'rgba(6,182,212,0.3)' }}
          className="absolute top-1/2 left-1/2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl w-28 h-16 sm:w-40 sm:h-20 flex items-center justify-center text-center cursor-default select-none z-10"
          style={{
            // AJUSTE MANUAL DE POSICIÓN DEL SOL:
            // El primer valor (-50% es el centro) controla el eje X (izquierda/derecha).
            // El segundo valor (-50% es el centro) controla el eje Y (arriba/abajo).
            transform: 'translate(-58%, -70%)',
          }}
        >
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-white font-orbitron">Mi Stack Tecnológico</h3>
        </motion.div>

        {/* Mapeo de las tarjetas (planetas) con animación independiente */}
        {skills.map((skill, index) => {
          const angleOffset = (360 / skills.length) * index;
          const rotate = useTransform(
            time,
            [0, 120000], // 120 segundos para una rotación completa
            [angleOffset, angleOffset + 360],
            { clamp: false }
          );
          const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 138 : 172;
          const x = useTransform(rotate, (r) => `${radius * Math.cos(r * Math.PI / 180)}px`);
          const y = useTransform(rotate, (r) => `${radius * Math.sin(r * Math.PI / 180)}px`);

          return (
            <motion.div
              key={skill.name}
              style={{
                x,
                y,
                position: 'absolute',
                left: '50%',
                top: '50%',
                marginLeft: '-56px', // -(w-28 / 2)
                marginTop: '-64px', // -(h-32 / 2)
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-24 sm:w-20 sm:h-24 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-1.5 sm:p-3 flex flex-col items-center justify-center text-center"
              >
                <Image
                  src={skill.imgSrc}
                  alt={`${skill.name} logo`}
                  width={30}
                  height={30}
                  sizes="30px"
                  className={`object-contain mb-0 sm:mb-2 ${
                    skill.imgSrc.endsWith('.png') ? 'rounded-lg' : ''
                  }`}
                />
                <span className="text-xs sm:text-sm font-semibold text-white">{skill.name}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
