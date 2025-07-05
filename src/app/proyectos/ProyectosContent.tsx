'use client';

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from 'next/image';
import { ThreeBackground } from '@/components/ThreeBackground';
import { Github } from 'lucide-react';

// Definición de herramientas con sus colores y descripciones
const tools = [
  { 
    id: "n8n", 
    name: "n8n", 
    color: "#8866FF", 
    description: "Plataforma de automatización de flujos de trabajo que conecta diferentes aplicaciones y servicios sin necesidad de código.",
    imgSrc: "/icons/n8n.png",
    gallery: [
      { title: "Arquitectura y Desafíos Técnicos", src: "/projects/n8n/monitoreo-medios/arquitectura+desafios.png" },
      { title: "Vista General del Workflow", src: "/projects/n8n/monitoreo-medios/flujo-principal.png" },
      { title: "Procesamiento Inicial de Noticias", src: "/projects/n8n/monitoreo-medios/procesamiento-noticias.png" },
      { title: "Vectorización con Ollama Local", src: "/projects/n8n/monitoreo-medios/Vectorizacion-noticias-ollama-local.png" },
      { title: "Análisis Semántico con IA", src: "/projects/n8n/monitoreo-medios/analisis-ia.png" },
      { title: "Generación del Informe", src: "/projects/n8n/monitoreo-medios/generacion-informe.png" },
      { title: "Ejemplo de Alerta Final", src: "/projects/n8n/monitoreo-medios/ejemplo-alerta.png" }
    ]
  },
  { 
    id: "powerbi", 
    name: "Power BI", 
    color: "#F2C811", 
    description: "Automatización de informes y dashboards interactivos para visualización y análisis de datos empresariales.",
    imgSrc: "/icons/powerbi.svg",
    gallery: [
      { title: "Portada del Informe", src: "/projects/powerbi/portada.jpg.png" },
      { title: "Informe General", src: "/projects/powerbi/informe_general.jpg.png" },
      { title: "Informe EE.UU.", src: "/projects/powerbi/informe_eeuu.jpg.png" },
      { title: "Modelo de Datos", src: "/projects/powerbi/modelo_datos.jpg.png" }
    ]
  },
  { 
    id: "python", 
    name: "Python", 
    color: "#3776AB", 
    description: "Lenguaje de programación versátil para análisis de datos, machine learning y automatización de procesos.",
    imgSrc: "/icons/python.png",
    gallery: [
      { title: "Análisis de Datos", src: "/icons/python.png" },
      { title: "Web Scraping", src: "/icons/python.png" },
      { title: "Machine Learning", src: "/icons/python.png" },
      { title: "Automatización ETL", src: "/icons/python.png" }
    ]
  },
  { 
    id: "sql", 
    name: "SQL Server", 
    color: "#CC2927", 
    description: "Gestión y análisis de bases de datos relacionales para extraer información valiosa y generar reportes.",
    imgSrc: "/icons/sql.png",
    gallery: [
      { title: "Consultas Avanzadas", src: "/icons/sql.png" },
      { title: "Modelado de Datos", src: "/icons/sql.png" },
      { title: "Optimización de Queries", src: "/icons/sql.png" },
      { title: "Reportes Automáticos", src: "/icons/sql.png" }
    ]
  },
  { 
    id: "sheets", 
    name: "Sheets", 
    color: "#0F9D58", 
    description: "Hojas de cálculo colaborativas con automatización para gestión de datos y reportes en tiempo real.",
    imgSrc: "/icons/google-sheets.png",
    gallery: [
      { title: "Dashboard Principal", src: "/projects/sheets/dash.png" },
      { title: "Informe por Mercado y Región", src: "/projects/sheets/informemercadoyregion.png" },
      { title: "Informe por Categoría", src: "/projects/sheets/informecategoriasubcat.png" },
      { title: "Conclusiones", src: "/projects/sheets/conclusion.png" },
      { title: "Datos Maestros", src: "/projects/sheets/datos.png" },
      { title: "Tablas Dinámicas", src: "/projects/sheets/tablas_dinamicas.png" },
      { title: "Página Inicial", src: "/projects/sheets/inicio.png" },
      { title: "Metodología", src: "/projects/sheets/pasos.png" }
    ]
  }
];

// Componente para la galería de imágenes con lightbox y zoom
function ImageGallery({ images, toolColor, onLightboxChange }: { images: {title: string, src: string}[], toolColor: string, onLightboxChange: (isOpen: boolean) => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100); // 100% es el tamaño normal
  const [isZoomed, setIsZoomed] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);
  const [clickedImageIndex, setClickedImageIndex] = useState<number | null>(null);
  
  // Definir un tipo para dragStart que incluya pinchDistance
  interface DragState {
    x: number;
    y: number;
    pinchDistance?: number;
  }
  
  const dragStart = useRef<DragState>({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  
  // Notificar al componente padre cuando cambia el estado del lightbox
  useEffect(() => {
    onLightboxChange(showLightbox);
  }, [showLightbox, onLightboxChange]);

  // Define resetZoom function wrapped in useCallback
  const resetZoom = useCallback(() => {
    // Animar el reseteo del zoom para una transición más suave
    const startZoom = zoomLevel;
    const startPos = { ...dragPosition };
    const startTime = performance.now();
    const duration = 300; // duración de la animación en ms

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Función de easing para una animación más natural
      const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
      const easedProgress = easeOutCubic(progress);
      
      const currentZoom = startZoom + (100 - startZoom) * easedProgress;
      const currentX = startPos.x * (1 - easedProgress);
      const currentY = startPos.y * (1 - easedProgress);
      
      setZoomLevel(currentZoom);
      setDragPosition({ x: currentX, y: currentY });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsZoomed(false);
      }
    };

    requestAnimationFrame(animate);
  }, [zoomLevel, dragPosition]);

  // Wrap closeLightbox in useCallback to prevent it from changing on every render
  const closeLightbox = useCallback(() => {
    setShowLightbox(false);
    resetZoom();
    
    // Pequeño retraso antes de resetear el índice de imagen clickeada
    setTimeout(() => {
      setClickedImageIndex(null);
    }, 300);
  }, [resetZoom]); // Add resetZoom as dependency

  // Efecto para manejar clics fuera del lightbox
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showLightbox && lightboxRef.current && !lightboxRef.current.contains(event.target as Node)) {
        closeLightbox();
      }
    };
    
    if (showLightbox) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLightbox, closeLightbox]);

  // Determinar qué imágenes mostrar basado en el estado
  const visibleImages = showAllImages ? images : images.slice(0, 4);
  const hasMoreImages = images.length > 4;

  // Toggle para mostrar todas las imágenes
  const toggleAllImages = () => {
    setShowAllImages(!showAllImages);
  };

  const openLightbox = (index: number) => {
    setClickedImageIndex(index);
    setCurrentImageIndex(index);
    
    // Pequeño retraso para permitir que la animación de clic comience
    setTimeout(() => {
      setShowLightbox(true);
      
      // Calcular el zoom inicial para que la imagen se ajuste completamente
      setTimeout(() => {
        if (imageContainerRef.current && imageRef.current) {
          const containerRect = imageContainerRef.current.getBoundingClientRect();
          const imageRect = imageRef.current.getBoundingClientRect();
          
          // Calcular las relaciones de aspecto
          const containerRatio = containerRect.width / containerRect.height;
          const imageRatio = imageRect.width / imageRect.height;
          
          // Calcular el factor de zoom necesario
          let scale;
          if (imageRatio > containerRatio) {
            // La imagen es más ancha que el contenedor
            scale = (containerRect.width * 0.9) / imageRect.width;
          } else {
            // La imagen es más alta que el contenedor
            scale = (containerRect.height * 0.9) / imageRect.height;
          }
          
          // Aplicar el zoom inicial (convertir a porcentaje)
          const initialZoom = scale * 100;
          setZoomLevel(Math.min(initialZoom, 100)); // No hacer zoom in, solo out si es necesario
          setDragPosition({ x: 0, y: 0 });
        }
      }, 50); // Pequeño retraso para asegurar que los elementos están renderizados
    }, 100);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
    // Resetear zoom y posición al cambiar de imagen
    resetZoom();
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    // Resetear zoom y posición al cambiar de imagen
    resetZoom();
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Alternar entre zoom normal y 150%
    if (isZoomed) {
      resetZoom();
    } else {
      setZoomLevel(150);
      setIsZoomed(true);
    }
  };

  // Función para verificar si el cursor está sobre la imagen
  const isMouseOverContainer = (clientX: number, clientY: number): boolean => {
    if (!imageContainerRef.current) return false;
    
    const rect = imageContainerRef.current.getBoundingClientRect();
    return (
      clientX >= rect.left && 
      clientX <= rect.right && 
      clientY >= rect.top && 
      clientY <= rect.bottom
    );
  };

  // Manejador de rueda para zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (!isMouseOverContainer(e.clientX, e.clientY)) return;
    
    e.preventDefault();

    // Calcular el nuevo nivel de zoom
    const delta = e.deltaY * -1;
    const newZoom = Math.min(Math.max(zoomLevel + delta, 50), 400);
    if (newZoom === zoomLevel) return;

    // Calcular el punto relativo del cursor en el contenedor
    const rect = imageContainerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    // Ajustar el dragPosition para que el punto bajo el cursor permanezca fijo
    const scale = newZoom / zoomLevel;
    const newX = (dragPosition.x - mouseX) * scale + mouseX;
    const newY = (dragPosition.y - mouseY) * scale + mouseY;

    setZoomLevel(newZoom);
    setIsZoomed(newZoom > 100);
    setDragPosition({ x: newX, y: newY });
  };

  const increaseZoom = () => {
    const newZoom = Math.min(zoomLevel + 15, 175);
    setZoomLevel(newZoom);
    if (newZoom > 100) {
      setIsZoomed(true);
    }
  };

  const decreaseZoom = () => {
    const newZoom = Math.max(zoomLevel - 15, 100);
    setZoomLevel(newZoom);
    if (newZoom === 100) {
      setIsZoomed(false);
      setDragPosition({ x: 0, y: 0 });
    }
  };

  // Calcular los límites de arrastre basados en el nivel de zoom y el tamaño del contenedor
  const calculateDragLimits = () => {
    if (!imageContainerRef.current || !imageRef.current) return { maxX: 50, maxY: 50 };
    
    const containerRect = imageContainerRef.current.getBoundingClientRect();
    const imageRect = imageRef.current.getBoundingClientRect();
    
    // El límite es proporcional al nivel de zoom
    const zoomFactor = zoomLevel / 100;
    
    // Calcular los límites basados en el tamaño real de la imagen escalada
    const scaledWidth = imageRect.width * zoomFactor;
    const scaledHeight = imageRect.height * zoomFactor;
    
    // Permitir arrastrar la imagen hasta que sus bordes toquen los bordes del contenedor
    const maxX = Math.max(0, (scaledWidth - containerRect.width) / 2);
    const maxY = Math.max(0, (scaledHeight - containerRect.height) / 2);
    
    return { maxX, maxY };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Solo procesar clic izquierdo
    
    if (isZoomed) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX - dragPosition.x, y: e.clientY - dragPosition.y };
      e.preventDefault(); // Prevenir selección de texto
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && isZoomed) {
      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;
      
      // Calcular límites de arrastre
      const { maxX, maxY } = calculateDragLimits();
      
      // Aplicar límites con efecto de "rubber band" para un arrastre más suave
      const applyRubberBand = (value: number, limit: number) => {
        if (Math.abs(value) <= limit) return value;
        const overflow = Math.abs(value) - limit;
        const direction = value > 0 ? 1 : -1;
        return direction * (limit + overflow * 0.5);
      };
      
      const clampedX = applyRubberBand(newX, maxX);
      const clampedY = applyRubberBand(newY, maxY);
      
      setDragPosition({ x: clampedX, y: clampedY });
      e.preventDefault(); // Prevenir selección de texto durante el arrastre
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      if (isZoomed) {
        setIsDragging(true);
        dragStart.current = { 
          x: e.touches[0].clientX - dragPosition.x, 
          y: e.touches[0].clientY - dragPosition.y 
        };
      }
    } else if (e.touches.length === 2) {
      // Implementar zoom con pellizco (pinch)
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      
      // Guardar la distancia inicial para calcular el zoom
      dragStart.current = { ...dragStart.current, pinchDistance: distance };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging && isZoomed) {
      const newX = e.touches[0].clientX - dragStart.current.x;
      const newY = e.touches[0].clientY - dragStart.current.y;
      
      // Calcular límites de arrastre
      const { maxX, maxY } = calculateDragLimits();
      
      // Limitar el arrastre para que la imagen no se salga completamente de la vista
      const clampedX = Math.max(Math.min(newX, maxX), -maxX);
      const clampedY = Math.max(Math.min(newY, maxY), -maxY);
      
      setDragPosition({ x: clampedX, y: clampedY });
      e.preventDefault(); // Prevenir el desplazamiento de la página
    } else if (e.touches.length === 2 && dragStart.current.pinchDistance) {
      // Implementar zoom con pellizco (pinch)
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.hypot(
        touch1.clientX - touch2.clientX,
        touch1.clientY - touch2.clientY
      );
      
      // Calcular el factor de zoom basado en la diferencia de distancia
      const pinchRatio = distance / dragStart.current.pinchDistance;
      const newZoom = Math.min(Math.max(zoomLevel * pinchRatio, 100), 175);
      
      setZoomLevel(newZoom);
      if (newZoom > 100) {
        setIsZoomed(true);
      }
      
      // Actualizar la distancia para el próximo cálculo
      dragStart.current = { ...dragStart.current, pinchDistance: distance };
      e.preventDefault(); // Prevenir el desplazamiento de la página
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0) {
      setIsDragging(false);
      // Limpiar la distancia de pellizco
      dragStart.current = { ...dragStart.current, pinchDistance: undefined };
    }
  };

  // Asegurarse de que el arrastre se detenga incluso si el mouse sale del contenedor
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  // Efecto para manejar el evento de rueda a nivel de documento
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      if (!showLightbox || !imageContainerRef.current) return;
      
      // Verificar si el cursor está sobre la imagen
      if (isMouseOverContainer(e.clientX, e.clientY)) {
        e.preventDefault(); // Prevenir el desplazamiento de la página
        
        // Calcular el punto relativo del cursor en la imagen
        const rect = imageContainerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        // Ajustar zoom con la rueda del ratón
        const delta = e.deltaY * -0.002; // Hacer el zoom más sensible
        const scaleFactor = Math.exp(delta);
        const newZoom = Math.min(Math.max(zoomLevel * scaleFactor, 50), 400);
        
        if (newZoom !== zoomLevel) {
          // Calcular el nuevo desplazamiento basado en el punto del cursor
          const scaleChange = newZoom / zoomLevel;
          const newX = dragPosition.x * scaleChange + (mouseX - mouseX * scaleChange);
          const newY = dragPosition.y * scaleChange + (mouseY - mouseY * scaleChange);
          
        setZoomLevel(newZoom);
          setDragPosition({ x: newX, y: newY });
          setIsZoomed(newZoom > 100);
        }
      }
    };

    // Agregar el evento a nivel de documento
    if (showLightbox) {
      window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    }
    
    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
    };
  }, [showLightbox, zoomLevel, isZoomed, dragPosition]);

  return (
    <>
      <div className="grid grid-cols-2 gap-1 h-full">
        {visibleImages.map((image, index) => (
          <motion.div
            key={index}
            initial={index >= 4 ? { opacity: 0, y: 20 } : false}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: clickedImageIndex === index && showLightbox ? 0.95 : 1
            }}
            transition={{ 
              duration: 0.3, 
              delay: index >= 4 ? (index - 4) * 0.1 : 0,
              scale: { type: "spring", stiffness: 300, damping: 25 }
            }}
            className="relative aspect-video cursor-pointer overflow-hidden rounded-md bg-gray-800/50"
            onClick={() => openLightbox(index)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Image
              src={image.src}
              alt={image.title}
              width={300}
              height={200}
              className="h-full w-full object-contain transition-transform duration-300"
              quality={90}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-medium text-center px-1">{image.title}</span>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Botón para mostrar más imágenes */}
      {hasMoreImages && (
        <motion.div 
          className="mt-1 text-center text-xs cursor-pointer"
          style={{ color: toolColor }}
          onClick={toggleAllImages}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showAllImages ? "Mostrar menos" : `+${images.length - 4} imágenes`}
        </motion.div>
      )}

      {/* Lightbox */}
      {showLightbox && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          ref={lightboxRef}
          onClick={() => closeLightbox()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="relative max-w-[95%] max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
          >
            <div 
              ref={imageContainerRef} 
              className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-black/50"
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={isDragging ? handleMouseMove : undefined}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <motion.div 
                ref={imageRef}
                style={{
                  cursor: isZoomed ? (isDragging ? 'grabbing' : 'grab') : 'default',
                  transform: `scale(${zoomLevel / 100}) translate(${dragPosition.x}px, ${dragPosition.y}px)`,
                  transformOrigin: 'center',
                  transition: 'transform 0.1s ease-out',
                }}
                className="relative"
                onMouseDown={handleMouseDown}
                onMouseMove={isDragging ? handleMouseMove : undefined}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <Image 
                  src={images[currentImageIndex].src} 
                  alt={images[currentImageIndex].title} 
                  width={1200} 
                  height={800} 
                  className="w-auto h-auto max-h-[80vh] transform-gpu"
                  draggable={false}
                  onDoubleClick={handleDoubleClick}
                  quality={100}
                  priority
                />
              </motion.div>
            </div>
            
            {/* Controles del lightbox */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
              {/* Botones de zoom */}
              <button 
                className="bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
                onClick={decreaseZoom}
              >
                -
              </button>
              <button 
                className="bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
                onClick={resetZoom}
              >
                {Math.round(zoomLevel)}%
              </button>
              <button 
                className="bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
                onClick={increaseZoom}
              >
                +
              </button>
            </div>
            
            {/* Navegación entre imágenes */}
            {images.length > 1 && (
              <>
                <button 
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                >
                  ←
                </button>
                <button 
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                >
                  →
                </button>
              </>
            )}
            
            {/* Título de la imagen */}
            <div className="absolute top-4 left-0 right-0 text-center text-white">
              {images[currentImageIndex].title} ({currentImageIndex + 1}/{images.length})
            </div>
            
            {/* Botón de cierre */}
            <button 
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => closeLightbox()}
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

function ExpandableDescription({ html, collapsed }: { html: string, collapsed: boolean }) {
  return (
    <div className="text-gray-300 text-xs md:text-sm">
      <div 
        className={`${collapsed ? "max-h-[180px] md:max-h-[150px] overflow-hidden relative" : ""} leading-tight md:leading-normal`}
      >
        {collapsed && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900/80 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        )}
        <motion.div 
          layout
          transition={{ 
            layout: { duration: 0.5, ease: "easeInOut" },
            height: { duration: 0.5, ease: "easeInOut" }
          }}
          dangerouslySetInnerHTML={{ __html: html }} 
        />
      </div>
      {/* El botón ya no se muestra aquí, se renderiza en el componente padre */}
    </div>
  );
}

interface Project {
  title: string;
  description: string;
  tags: string[];
}

// Añadir esta declaración de tipos en la parte superior del archivo
// para extender la interfaz DeviceOrientationEvent con el método requestPermission
declare global {
  interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    requestPermission?: () => Promise<string>;
  }
  
  interface Window { 
    DeviceOrientationEvent: {
      prototype: DeviceOrientationEvent;
      new(type: string, eventInitDict?: DeviceOrientationEventInit): DeviceOrientationEvent;
      requestPermission?: () => Promise<string>;
    }
  }
}

interface ToolPosition {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  zIndex: number;
}

export default function ProyectosContent() {
  const projects: Project[] = [
    {
      title: "DESCIFRANDO LA OPERACIÓN EMPRESARIAL",
      description: `✨ <b>Necesidad / Problema Inicial:</b><br/>Global Super Store, líder en ventas online internacional, buscaba mejorar la eficiencia de sus operaciones mediante análisis de datos. Como Analista de Datos, lideré este estudio utilizando datos de pedidos online entre 2013-2014, implementando procesos ETL hasta la presentación de resultados mediante un Dashboard interactivo en Google Sheets.<br/><br/>🚧 <b>Retos Técnicos:</b><br/>Debía responder preguntas clave: "¿Cuál es la tendencia de ventas? ¿Existe estacionalidad? ¿Qué productos funcionan mejor?" Para esto, analicé la información disponible, identificando dimensiones (Productos, Regiones) y métricas (Ventas, Costos), utilizando los datasets Master Global Super Store y Products Global Super Store.<br/><br/>⚙️ <b>Solución (Flujo del Proyecto):</b><br/>El proyecto se desarrolló en tres fases principales:<br/><br/><b>1. Preparación de datos:</b> Importé y limpié los datasets, validando datos, corrigiendo valores atípicos y asignando formatos adecuados a cada campo.<br/><br/><b>2. Análisis con fórmulas y tablas dinámicas:</b> Implementé funciones avanzadas (SUMA, PROMEDIO, SI, BUSCARV) y creé tablas dinámicas para analizar ventas por categorías, mercados, regiones y métodos de envío.<br/><br/><b>3. Dashboard interactivo:</b> Desarrollé un panel visual siguiendo el patrón Z, con gráficos dinámicos (barras, líneas y proporciones), segmentadores de datos y botones de navegación, mostrando KPIs clave para la toma de decisiones.<br/><br/>🚀 <b>Resultados y Beneficios:</b><ul><li><b>Análisis Completo:</b> Visión integral de las operaciones comerciales.</li><li><b>Dashboard Interactivo:</b> Herramienta visual para decisiones estratégicas.</li><li><b>Insights Valiosos:</b> Identificación de patrones y tendencias de ventas.</li></ul><br/>🧪 <b>Ejemplo de uso real:</b><br/>El equipo directivo utiliza el dashboard en reuniones trimestrales para filtrar datos por región o categoría, identificar tendencias y tomar decisiones basadas en datos concretos.`,
      tags: ["sheets", "Google Sheets", "Análisis de Datos", "Dashboard", "ETL", "Tablas Dinámicas", "Fórmulas", "Visualización de Datos"],
    },
    {
      title: "Visualizando el Rendimiento de Adventure Works Cycles",
      description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>Adventure Works Cycles (AWC) necesitaba un análisis integral de ventas para optimizar su estrategia comercial en Norteamérica, Europa y Asia. El objetivo era transformar datos dispersos en SQL Server en un tablero interactivo que revelara tendencias, rentabilidad y desempeño regional.<br/><br/>🚧 <b>Retos Técnicos:</b><ul><li><b>Limpieza de Datos Multilingües:</b> Eliminación de columnas redundantes en varios idiomas para optimizar el modelo.</li><li><b>Optimización del Modelo Relacional:</b> Creación de relaciones eficientes entre tablas (FactInternetSales, DimProduct, DimCustomer) para análisis multidimensionales.</li><li><b>Generación de Métricas Clave:</b> Cálculo de ingresos, utilidad neta y márgenes usando DAX.</li><li><b>Visualización Efectiva:</b> Diseño de mockups para guiar el desarrollo del tablero, priorizando claridad e interactividad.</li></ul><br/>⚙️ <b>Solución (Flujo del Proyecto):</b><br/>El proyecto comenzó con la extracción de datos desde SQL Server y su transformación en Power BI, eliminando columnas irrelevantes y creando una tabla de calendario con DAX. Se estructuró un esquema en estrella con FactInternetSales como tabla central y se segmentaron los datos por categorías (Bikes, Accessories, Clothing) y regiones (EE.UU., Canadá, Europa). Las visualizaciones incluyeron KPIs generales ($1.98M en ingresos, 8K unidades vendidas), mapas geográficos, análisis de márgenes por región y tablas comparativas de periodos.<br/><br/>🚀 <b>Resultados y Beneficios:</b><ul><li><b>Toma de Decisiones Ágil:</b> Identificación de Bikes como categoría más rentable y Canadá como mercado clave.</li><li><b>Ahorro de Tiempo:</b> Automatización de reportes antes manuales.</li><li><b>Escalabilidad:</b> Modelo adaptable para nuevos mercados o métricas.</li></ul><br/>🧪 <b>Ejemplo de uso real:</b><br/>El equipo de ventas utiliza el tablero para detectar oportunidades (como el margen bruto del 65% en Northwest), optimizar inventario reduciendo stock en subcategorías de baja rotación, y planificar promociones ajustando descuentos en meses con menor ingreso basándose en tendencias históricas.`,
      tags: ["powerbi", "SQL Server", "DAX", "Visualización de Datos", "Análisis de Ventas", "KPI", "Modelado de Datos"],
    },
    {
      title: "Sistema de Monitoreo de Medios para Riesgo Político",
      description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>Un alto cargo político necesita un resumen diario y automatizado de todas las noticias (prensa, radio, TV, digital) para detectar riesgos reputacionales, crisis o asuntos de interés sin tener que revisar manually cientos de fuentes. El objetivo es recibir una alerta temprana y concisa directamente en su correo para una toma de decisiones ágil.<br/><br/>🚧 <b>Retos Técnicos:</b><ul><li><b>Gestión de Grandes Volúmenes:</b> Procesar cientos de noticias diarias requirió implementar un sistema de división en lotes (SplitInBatches) para manejar los datos de forma eficiente sin sobrecargar los servicios.</li><li><b>Análisis Semántico Profundo:</b> Para entender el contexto real más allá de palabras clave, se utilizó la vectorización de texto (embeddings) con un modelo de IA local (Ollama), permitiendo un análisis de sentimiento y relevancia mucho más preciso.</li><li><b>Orquestación Multi-Agente:</b> Se diseñó una arquitectura de dos agentes de IA. El primero analiza pequeños fragmentos de noticias, y el segundo consolida esos análisis para generar un informe ejecutivo final, superando las limitaciones de contexto de los modelos de lenguaje.</li></ul><br/>⚙️ <b>Solución (Descripción del Flujo):</b><br/>El flujo se conecta a una API de medios para descargar las noticias del día. Cada noticia es procesada y convertida en un vector numérico (embedding) usando un modelo de IA local. Un primer agente de IA analiza estos vectores en lotes para una pre-evaluación. Luego, un segundo agente consolida estos análisis, genera un informe ejecutivo final y determina si existe una alerta. Finalmente, el sistema formatea este informe en un correo HTML profesional y lo envía por Gmail, con un asunto dinámico que cambia según el nivel de riesgo detectado.<br/><br/>🚀 <b>Resultados y Beneficios:</b><ul><li><b>Ahorro de Tiempo:</b> Automatiza por completo el monitoreo de medios, liberando más de 3 horas de trabajo manual al día.</li><li><b>Detección Proactiva:</b> Permite identificar riesgos y oportunidades con antelación gracias al análisis semántico, superando la simple búsqueda por palabras clave.</li><li><b>Escalabilidad:</b> El sistema está diseñado para procesar miles de noticias sin problemas gracias a la gestión por lotes y la arquitectura de IA.</li><li><b>Información Consolidada:</b> Entrega un único informe ejecutivo, eliminando el ruido informativo y permitiendo tomar decisiones rápidas y basadas en datos concretos.</li></ul><br/>🧪 <b>Ejemplo de uso real:</b><br/>Un asesor de comunicación programa el workflow para ejecutarse cada mañana. El sistema descarga todas las menciones al "Cabildo de Gran Canaria". Si detecta una noticia sobre una protesta o una transcripción de radio con críticas a la gestión, el presidente recibe un correo a primera hora con el asunto "🚨 ¡Alerta! Riesgos detectados..." y un resumen de los puntos clave, permitiéndole preparar una respuesta antes del inicio de su jornada.`,
      tags: ["n8n", "IA", "Ollama", "API", "Automatización", "Embeddings", "JavaScript", "ngrok", "HTML", "DeepSeek-R1"],
    },
    {
    title: "SISTEMA INTEGRAL DE CLIPPING Y ROI CON TRIPLE SALIDA (HTML/PDF/PPTX)",
    description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>Una agencia de comunicación necesitaba automatizar por completo la creación de informes de clipping y ROI para sus clientes, con la capacidad de entregar los resultados en tres formatos distintos simultáneamente: un correo HTML interactivo para análisis rápido, un documento PDF formal para archivo y distribución ejecutiva, y una presentación PPTX automáticamente generada para reuniones y presentaciones.<br/><br/>🚧 <b>Retos Técnicos:</b><ul><li><b>Orquestación de Datos Compleja:</b> Se requería una autenticación de varios pasos con una API propietaria. El mayor reto fue procesar y enriquecer los datos en paralelo, generando enlaces de visualización únicos y seguros para cada noticia mediante una doble codificación en Base64.</li><li><b>Generación Dinámica de Contenido Visual:</b> El sistema debía crear sobre la marcha no solo un informe HTML complejo, sino también gráficos de barras y tarta. Para ello, se desarrolló un <b>microservicio en Python con Matplotlib, desplegado en Render</b>, que recibe los datos, genera los gráficos y los devuelve como imágenes listas para ser incrustadas en el correo.</li><li><b>Gestión de Flujos Paralelos:</b> El workflow fue diseñado para ejecutar y sincronizar tres ramas de salida completamente diferentes (HTML, PDF y PPTX) a partir de un único conjunto de datos procesados, asegurando que todas las entregas fueran consistentes.</li><li><b>Microservicio de Generación PPTX:</b> Se desarrolló un servicio FastAPI en Python, desplegado en Render, que recibe datos JSON y genera presentaciones PowerPoint dinámicas con gráficos, tablas y análisis detallados.</li><li><b>Cálculos Financieros y Agregación:</b> Toda la lógica para calcular el Valor Publicitario Equivalente (VPE), el Valor de Contenido (VC) y las audiencias se implementó en nodos de código, agregando los totales por tipo de medio y a nivel global de forma precisa.</li></ul><br/>⚙️ <b>Solución (Descripción del Flujo):</b><br/>El workflow se inicia con los parámetros del cliente (ID, fechas). Primero, se autentica en la API de medios y obtiene todas las noticias. Los datos se dividen por tipo de medio (TV, Radio, etc.) y se procesan para generar enlaces seguros. Un nodo central de código agrega toda la información, calcula las métricas de ROI y construye la estructura HTML del informe. Al mismo tiempo, envía los datos agregados a dos microservicios en Render: uno que utiliza Python y Matplotlib para generar los gráficos, y otro que genera presentaciones PPTX dinámicas. El flujo se trifurca: la primera rama construye un correo HTML detallado con gráficos incrustados, la segunda genera un PDF, y la tercera produce una presentación PPTX profesional. Cada formato se envía en correos separados, optimizados para diferentes casos de uso.<br/><br/>🚀 <b>Resultados y Beneficios:</b><ul><li><b>Automatización Completa (End-to-End):</b> Se eliminó el 99% del trabajo manual, reduciendo el tiempo de entrega de informes de varias horas o días a tan solo unos minutos.</li><li><b>Informes Enriquecidos y Profesionales:</b> La entrega de informes visualmente atractivos, con gráficos y datos precisos, mejoró drásticamente la percepción de valor por parte del cliente.</li><li><b>Cero Errores Humanos:</b> La automatización de los cálculos y la maquetación eliminó por completo los errores humanos, garantizando consistencia y fiabilidad.</li><li><b>Flexibilidad y Escalabilidad:</b> El sistema es capaz de generar informes para cualquier cliente y período con solo cambiar los parámetros de entrada, siendo totalmente escalable.</li></ul><br/>🧪 <b>Ejemplo de uso real:</b><br/>Un gestor de cuentas necesita el informe de impacto mediático del último mes para un cliente corporativo. Ejecuta el workflow, y en menos de 5 minutos, recibe tres correos: uno con un informe HTML interactivo que incluye gráficos dinámicos y enlaces directos a cada noticia, otro con un PDF formal para archivo, y un tercero con una presentación PowerPoint lista para usar en reuniones ejecutivas. El sistema maneja automáticamente la autenticación, los cálculos de ROI, la generación de gráficos y el formateo triple, todo mientras mantiene enlaces seguros y cifrados para cada pieza de contenido.`,
    tags: ["n8n", "API", "Automatización", "JavaScript", "HTML", "PDF", "PPTX", "ROI", "Clipping", "Gmail", "Chart Generation", "Python", "Matplotlib", "Render", "Base64", "LangChain", "AI Agent", "FastAPI"],
  },
    {
      title: "Pipeline Automatizado de Contenido sobre Licitaciones",
      description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>Automatizar la generación y publicación de artículos sobre licitaciones públicas en un blog, extrayendo datos desde APIs oficiales, generando contenido único y evitando repeticiones. El objetivo es mantener actualizado un portal de noticias sin intervención manual, asegurando calidad y diversidad temática.<br/><br/>🚧 <b>Retos Técnicos:</b><ul><li><b>Obtención y Procesamiento de Datos Masivos:</b> Integración con API oficial de licitaciones, procesamiento por lotes para eficiencia y memoria.</li><li><b>Generación de Contenido con IA y Memoria Contextual:</b> Uso de modelos LLM (OpenRouter/Gemini) con memoria para evitar repeticiones y mejorar la calidad editorial.</li><li><b>Automatización de Publicación en WordPress:</b> Publicación automática de borradores en el CMS, formateo en HTML y asignación dinámica de etiquetas.</li><li><b>Validación y Enriquecimiento:</b> Validación y enriquecimiento de datos generados por IA, asegurando originalidad y relevancia.</li><li><b>Gestión de Errores y Reintentos:</b> Lógica de reintentos ante fallos de red o autenticación.</li></ul><br/>⚙️ <b>Solución (Descripción del Flujo):</b><br/>El flujo comienza consultando la API oficial de licitaciones, filtrando resultados y dividiéndolos en lotes. Cada lote es procesado por un nodo de IA que redacta artículos originales, formatea en HTML y publica automáticamente como borrador en WordPress, asignando etiquetas según sector y región. Se registra el histórico para evitar duplicados y se realizan reintentos automáticos en caso de error.<br/><br/>🚀 <b>Resultados y Beneficios:</b><ul><li><b>Actualización Continua y Sin Esfuerzo:</b> El portal se mantiene actualizado en tiempo real sin intervención humana.</li><li><b>Contenido Original y No Redundante:</b> Gracias a la memoria de contexto, se evita la repetición de temas y se mejora la calidad editorial.</li><li><b>Escalabilidad:</b> El sistema puede adaptarse fácilmente a otras fuentes de datos o portales.</li><li><b>Reducción de Errores Manuales:</b> Al automatizar todo el flujo, se eliminan los errores asociados a la gestión manual de contenidos.</li></ul><br/>🧪 <b>Ejemplo de uso real:</b><br/>El sistema detecta nuevas licitaciones, genera y publica automáticamente artículos de análisis optimizados para SEO, y los deja listos para revisión y publicación final, asegurando una cobertura exhaustiva y profesional de oportunidades públicas.`,
      tags: ["n8n", "API", "Automatización", "WordPress", "HTML", "Batch", "OpenRouter", "Gemini", "IA", "Content Generation", "Memory", "Error Handling", "AI Agent", "LLM", "Web Scraping", "CMS"],
    },
    {
      title: "Reporte Diario de Consumo OpenAI vía Gmail",
      description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>Monitorizar y controlar el coste diario del consumo de modelos OpenAI (por ejemplo, gpt-4o-mini) de forma automática, recibiendo un resumen detallado y preciso cada mañana por correo electrónico, sin necesidad de acceder manualmente a la consola de OpenAI.<br/><br/>🚧 <b>Retos Técnicos:</b><ul><li><b>Cálculo Automático de Fechas:</b> El sistema determina cada día la fecha anterior para consultar el consumo exacto.</li><li><b>Integración con la API de OpenAI:</b> Se requiere autenticación segura y manejo de tokens para obtener los datos de uso diarios.</li><li><b>Cálculo Dinámico de Costos:</b> El workflow suma los tokens de entrada/salida y aplica los precios oficiales por millón de tokens, diferenciando entre contexto y generación.</li><li><b>Manejo de Errores y Ausencia de Datos:</b> Si no hay consumo o la API falla, el sistema informa el error y asegura que el reporte llegue igualmente.</li><li><b>Automatización del Envío:</b> El resumen se formatea y envía automáticamente por Gmail, incluyendo desglose y costo total en USD.</li></ul><br/>⚙️ <b>Solución (Descripción del Flujo):</b><br/>Un Schedule Trigger ejecuta el flujo cada mañana. Un nodo calcula la fecha de ayer. Luego, un HTTP Request consulta la API de OpenAI para obtener el consumo de ese día. Un nodo de código procesa la respuesta, suma los tokens y calcula el coste según los precios oficiales. Finalmente, otro nodo envía un correo Gmail con el resumen: fecha, modelos usados, tokens de entrada y salida, y el costo total estimado.<br/><br/>🚀 <b>Resultados y Beneficios:</b><ul><li><b>Transparencia y Control:</b> El usuario recibe un desglose diario de su gasto en OpenAI, permitiendo tomar decisiones informadas y evitar sorpresas.</li><li><b>Automatización Total:</b> No requiere intervención manual; el reporte llega puntualmente cada día.</li><li><b>Adaptabilidad:</b> Puede ajustarse fácilmente a otros modelos, cuentas o monedas.</li><li><b>Prevención de Errores:</b> El sistema maneja la ausencia de datos y errores de red, asegurando siempre un reporte útil.</li></ul><br/>🧪 <b>Ejemplo de uso real:</b><br/>Cada mañana, el usuario recibe en su bandeja de entrada un correo titulado "📊 Reporte Diario de Consumo OpenAI" con el costo en USD, tokens usados y fecha exacta. Si algún día no hubo consumo, el email lo indica claramente, evitando confusiones o sustos inesperados.`,
      tags: ["n8n", "API", "Automatización", "OpenAI", "Gmail", "JavaScript", "Reporting", "Cost Management", "Token Usage"],
    },
    {
      title: "Clasificación Automática de Correos de Soporte con Gemini",
      description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>
Un equipo de soporte técnico recibe diariamente decenas de correos con incidencias, dudas y solicitudes muy variadas. Clasificar manualmente cada email según su tipo (problema técnico, facturación, información) es lento, propenso a errores y dificulta la priorización y la trazabilidad de casos.<br/><br/>
🚧 <b>Retos Técnicos:</b>
<ul>
  <li><b>Procesamiento Automático y Preciso:</b> Se requiere una IA capaz de analizar el contenido de cada correo y asignar la categoría correcta, incluso si el lenguaje es ambiguo o poco estructurado.</li>
  <li><b>Integración Multi-API:</b> El workflow debe conectar Gmail (para recibir y enviar correos), Gemini (para la clasificación IA) y Google Drive (para registrar logs de incidencias en un CSV global), gestionando autenticaciones y permisos de manera segura.</li>
  <li><b>Gestión de Archivos Dinámica:</b> El sistema debe comprobar si el archivo de registro existe en Drive, descargarlo, añadir la nueva fila y volver a subirlo, o crearlo si no existe, evitando duplicados y garantizando la integridad del histórico.</li>
  <li><b>Resiliencia y Manejo de Errores:</b> El flujo debe manejar casos como archivos bloqueados, errores de red, credenciales expiradas o correos malformateados, asegurando que ningún caso se pierda.</li>
</ul><br/>
⚙️ <b>Solución (Descripción del Flujo):</b><br/>
El flujo se activa automáticamente al recibir un correo nuevo en una etiqueta específica de Gmail. El contenido se envía a un modelo Gemini (Google AI), que responde únicamente con la categoría asignada. Un switch enruta el correo según la categoría: "Problema Técnico", "Consulta de Facturación" o "Solicitud de Información", reenviando el mensaje con un asunto clasificado. Paralelamente, se preparan los datos clave (timestamp, remitente, asunto, categoría IA, preview del cuerpo) y se formatea una fila CSV. El sistema busca el archivo de registro en Google Drive; si existe, lo descarga y añade la nueva fila, si no, lo crea con cabecera y primer registro. Finalmente, el archivo actualizado se sube a Drive, manteniendo un histórico global de incidencias.<br/><br/>
🚀 <b>Resultados y Beneficios:</b>
<ul>
  <li><b>Clasificación Instantánea y Precisa:</b> El equipo recibe los correos ya clasificados y priorizados, acelerando la respuesta y reduciendo errores humanos.</li>
  <li><b>Histórico Centralizado:</b> Todas las incidencias quedan registradas en un único CSV en Drive, facilitando auditorías, métricas y reporting.</li>
  <li><b>Automatización Total:</b> El flujo funciona 24/7 sin intervención manual, escalando para cualquier volumen de correos.</li>
  <li><b>Flexibilidad y Seguridad:</b> El sistema es adaptable a nuevas categorías y cumple buenas prácticas de seguridad OAuth2.</li>
</ul><br/>
🧪 <b>Ejemplo de uso real:</b><br/>
Un correo con asunto "No puedo acceder a la plataforma" llega a la bandeja de soporte. El sistema lo clasifica como "Problema Técnico", lo reenvía con el asunto "[CLASIFICADO] Soporte Técnico: ..." y añade una línea al CSV global con todos los detalles clave. El responsable de soporte puede filtrar el CSV para ver solo problemas técnicos o consultas de facturación, generando reportes automáticos en segundos.
`,
      tags: ["n8n", "Gmail", "Gemini", "Google Drive", "Automatización", "Clasificación IA", "Soporte", "CSV", "OAuth2", "JavaScript", "Logging", "Switch", "Email Routing"],
    },
    {
      title: "Generador Automático de Contenido sobre Licitaciones",
      description: `🧩 <b>Necesidad / Problema Inicial:</b><br/>Generar contenido de alto valor y de forma constante para un blog especializado en licitaciones públicas. El proceso manual de detectar contratos por vencer, investigar detalles, redactar un análisis y publicarlo en un CMS es lento y repetitivo, limitando la escalabilidad de la estrategia de contenidos.<br/><br/>🚧 <b>Retos Técnicos:</b><br/>Los desafíos incluyeron la integración con una API externa para obtener datos dinámicos de contratos. Fue crucial el diseño de un <i>prompt</i> avanzado para un Agente de IA, instruyéndolo para generar contenido periodístico en un formato estructurado. Se implementó un sistema de memoria para que la IA evitara repetir ideas de artículos anteriores, garantizando originalidad.<br/><br/>⚙️ <b>Solución (Descripción del Flujo):</b><br/>El flujo se inicia automáticamente con un <b>Schedule Trigger</b>. Un nodo <b>HTTP Request</b> consulta una API para obtener contratos por vencer. Un bucle (<b>Loop Over Items</b>) procesa cada contrato. Dentro del bucle, un <b>AI Agent</b> redacta un artículo de análisis. Un nodo <b>Code</b> (JavaScript) valida y enriquece los datos generados. Finalmente, un nodo <b>CMS</b> crea un borrador del artículo, listo para revisión.<br/><br/>🚀 <b>Resultados y Beneficios:</b><br/>Este workflow logra una <b>automatización completa</b> del marketing de contenidos, transformando una tarea de horas en minutos. Esto permite <b>optimización</b> del tiempo, <b>escalabilidad</b> total de la estrategia y <b>reducción de errores</b>, generando un flujo constante de publicaciones SEO-optimizadas.<br/><br/>🧪 <b>Ejemplo de uso real:</b><br/>El workflow se ejecuta de forma autónoma. Detecta que un contrato de un servicio público relevante está por vencer. Automáticamente, el sistema redacta y publica un borrador en el CMS analizando las claves del contrato y las oportunidades para nuevas empresas, sin intervención humana.`,
      tags: ["n8n", "IA Generativa", "Automatización", "Marketing de Contenidos", "CMS", "API"],
    },
  ];

  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [gyroValues, setGyroValues] = useState({ beta: 0, gamma: 0 });
  const [activeImageLightbox, setActiveImageLightbox] = useState(false);
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const clickCountRef = useRef(0);
  const clickOutsideTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Inicializar estado de colapso para cada proyecto
  const [collapsedArr, setCollapsedArr] = useState<boolean[]>(projects.map(() => true));
  
  // Detectar si es móvil para mostrar la ruleta de herramientas
  const [isMobileGallery, setIsMobileGallery] = useState(false);
  
  // Efecto para detectar tamaño de pantalla
  useEffect(() => {
    // Verificar si estamos en el navegador
    if (typeof window === 'undefined') return;
    
    // Inicializar el estado basado en el tamaño de la ventana actual
    setIsMobileGallery(window.innerWidth < 768);
    
    // Función para actualizar el estado cuando cambia el tamaño de la ventana
    const handleResize = () => {
      setIsMobileGallery(window.innerWidth < 768);
    };
    
    // Agregar event listener
    window.addEventListener('resize', handleResize);
    
    // Limpiar event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Manejar los eventos de orientación del dispositivo
  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    if (!gyroEnabled || selectedTool) return;

    const beta = event.beta || 0;  // Inclinación frontal (adelante/atrás) [-180, 180]
    const gamma = event.gamma || 0; // Inclinación lateral (izquierda/derecha) [-90, 90]

    // Limitar los valores para evitar movimientos bruscos
    const limitedBeta = Math.max(-15, Math.min(15, beta));
    const limitedGamma = Math.max(-15, Math.min(15, gamma));

    setGyroValues({
      beta: limitedBeta,
      gamma: limitedGamma
    });

    // Aplicar la rotación al contenedor de la ruleta
    if (wheelContainerRef.current) {
      wheelContainerRef.current.style.transform = `rotateX(${-limitedBeta * 0.5}deg) rotateY(${limitedGamma * 0.5}deg)`;
    }
  }, [gyroEnabled, selectedTool, wheelContainerRef]);

  // Efecto para habilitar el giroscopio en dispositivos móviles
  useEffect(() => {
    if (!isMobileGallery || typeof window === 'undefined') return;
    
    // Para iOS 13+, se requiere permiso explícito
    if (window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission === 'function') {
      const enableGyro = () => {
        window.DeviceOrientationEvent.requestPermission?.()
          .then((response: string) => {
            if (response === 'granted') {
              setGyroEnabled(true);
              window.addEventListener('deviceorientation', handleOrientation);
            }
          })
          .catch(console.error);
      };

      const permissionButton = document.getElementById('gyro-permission');
      if (permissionButton) {
        permissionButton.addEventListener('click', enableGyro);
      }
    } else if (window.DeviceOrientationEvent) {
      setGyroEnabled(true);
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      const permissionButton = document.getElementById('gyro-permission');
      if (permissionButton) {
        permissionButton.removeEventListener('click', () => {});
      }
    };
  }, [isMobileGallery, handleOrientation]);

  const handleToggle = (index: number) => {
    setCollapsedArr(prev => {
      const newArr = [...prev];
      newArr[index] = !newArr[index];
      return newArr;
    });
  };

  // Calcular las posiciones de las herramientas en círculo para móviles
  const getToolPosition = (
    index: number,
    total: number,
    selectedIndex: number | null
  ): ToolPosition => {
    // En escritorio no aplicamos ninguna transformación especial
    if (!isMobileGallery) {
      return { x: 0, y: 0, scale: 1, opacity: 1, zIndex: 1 };
    }

    // === Ajustes personalizables para la "U" móvil ===
    const MOBILE_U_RADIUS = 180;   // Antes: 90. Más alto para móviles
    const MOBILE_U_SPREAD_X = 0.8; // >1 separa más los brazos
    const MOBILE_U_OFFSET_X = 25;  // Desplazamiento global X
    const MOBILE_U_OFFSET_Y = 170; // Antes: 100. Más abajo para móviles

    // Ángulo entre 150° y 30° (brazos mirando hacia abajo)
    const totalPositions = total - 1;
    const norm = totalPositions === 0 ? 0.5 : index / totalPositions;
    const angleDeg = 150 - (150 - 30) * norm;
    const radians = (angleDeg * Math.PI) / 180;

    // Coordenadas base sobre el arco superior
    let x = Math.cos(radians) * MOBILE_U_RADIUS;
    let y = -Math.sin(radians) * MOBILE_U_RADIUS;

    x *= MOBILE_U_SPREAD_X;
    x += MOBILE_U_OFFSET_X;
    y += MOBILE_U_OFFSET_Y;

    // --- Comportamiento cuando hay una tarjeta seleccionada ---
    if (selectedIndex !== null) {
      if (index === selectedIndex) {
        // Centrar abajo de la U
        return {
          x: MOBILE_U_OFFSET_X,
          y: MOBILE_U_OFFSET_Y + MOBILE_U_RADIUS * 0.001,
          scale: 1.3,
          opacity: 1,
          zIndex: 2,
        };
      }

      // Resto de tarjetas: se mantienen en su lugar con menor opacidad
      return { x, y, scale: 1, opacity: 0.3, zIndex: 1 };
    }

    // Sin selección -> posición base
    return { x, y, scale: 1, opacity: 1, zIndex: 1 };
  };

  // Función para manejar el clic en una tarjeta de herramienta
  const handleToolClick = (toolId: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (selectedTool === toolId) {
      setSelectedTool(null);
      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    } else {
      if (selectedTool) {
        setSelectedTool(null);
        setTimeout(() => {
          setSelectedTool(toolId);
              setIsAnimating(false);
                }, 300);
          } else {
        setSelectedTool(toolId);
          setTimeout(() => {
            setIsAnimating(false);
              }, 300);
      }
    }
  };
  
  // Función para actualizar el estado del lightbox
  const handleLightboxChange = (isOpen: boolean) => {
    setActiveImageLightbox(isOpen);
  };

  // Filtrar proyectos según la herramienta seleccionada
  const filteredProjects = selectedTool 
    ? projects.filter(project => project.tags.includes(selectedTool)) 
    : [];

  // Obtener índice de la herramienta seleccionada
  const selectedToolIndex = selectedTool 
    ? tools.findIndex(tool => tool.id === selectedTool)
    : null;

  // Efecto para manejar clics fuera de las tarjetas
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Si no hay herramienta seleccionada, no hacemos nada
      if (!selectedTool) return;
      
      // Si hay un lightbox activo, dejamos que el lightbox maneje el clic
      if (activeImageLightbox) return;
      
      // Verificar si el clic fue fuera del contenedor de proyectos
      if (projectsContainerRef.current && !projectsContainerRef.current.contains(event.target as Node)) {
        // Incrementar contador de clics
        clickCountRef.current += 1;
        
        // Limpiar cualquier temporizador existente
        if (clickOutsideTimerRef.current) {
          clearTimeout(clickOutsideTimerRef.current);
        }
        
        // Configurar un nuevo temporizador para detectar doble clic
        clickOutsideTimerRef.current = setTimeout(() => {
          // Si hubo un solo clic, no hacemos nada
          // Si hubo doble clic, cerramos la selección de herramientas
          if (clickCountRef.current >= 2) {
            setSelectedTool(null);
          }
          
          // Reiniciar contador
          clickCountRef.current = 0;
        }, 300); // 300ms es un tiempo estándar para detectar doble clic
      }
    };
    
    // Agregar el event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Limpieza
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (clickOutsideTimerRef.current) {
        clearTimeout(clickOutsideTimerRef.current);
      }
    };
  }, [selectedTool, activeImageLightbox]);

  return (
    <div className="relative min-h-screen bg-black">
      <ThreeBackground />
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 pb-2 md:pb-0">
            Mis Proyectos
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-left leading-relaxed">
            <span className="text-lg font-bold text-cyan-400">¿Buscas un socio tecnológico que impulse tu crecimiento con IA y automatización?</span>
            <br /><br />
            Cada uno de estos proyectos demuestra cómo combino n8n, Python, Power BI, Google Sheets y modelos de IA para multiplicar la productividad y la toma de decisiones de equipos que apuestan por el largo plazo.
            <br /><br />
            <span className="flex items-center mb-1"><span className="text-green-500 mr-3">✓</span><span>Diseño flujos end-to-end que ahorran horas y escalan sin fricciones.</span></span>
            <span className="flex items-center mb-1"><span className="text-green-500 mr-3">✓</span><span>Integro IA generativa y analítica avanzada para acelerar cada proceso.</span></span>
            <span className="flex items-center mb-2"><span className="text-green-500 mr-3">✓</span><span>Colaboro codo a codo, aprendiendo rápido y alineando tecnología con estrategia.</span></span>
            <br />
            Explora los casos y descubre cómo podemos crecer juntos.
          </p>
        </motion.div>

        {/* Tarjetas de herramientas - Versión móvil (ruleta) y escritorio (normal) */}
        <motion.div
          ref={wheelContainerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`mb-12 ${isMobileGallery ? 'h-[300px] tools-wheel-container' : ''} relative`}
          style={isMobileGallery && !selectedTool ? {
            transform: `rotateX(${-gyroValues.beta * 0.5}deg) rotateY(${gyroValues.gamma * 0.5}deg)`
          } : {}}
        >
          {/* Solo mantener el botón de giroscopio si es necesario */}
          {isMobileGallery && !gyroEnabled && typeof window !== 'undefined' && 
           window.DeviceOrientationEvent && 
           typeof window.DeviceOrientationEvent.requestPermission === 'function' && (
            <button 
              id="gyro-permission"
              className="absolute top-0 right-0 bg-cyan-500 text-white text-xs px-2 py-1 rounded-full z-50"
            >
              Habilitar 3D
            </button>
          )}

          {/* Contenedor de herramientas - Versión móvil (ruleta) o escritorio (flex) */}
          <div 
            ref={wheelContainerRef}
            className={`${isMobileGallery ? 'relative h-full tools-wheel-container' : 'flex flex-wrap justify-center gap-4'}`}
          >
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                id={`tool-${tool.id}`}
                className={`bg-white/5 backdrop-blur-sm border rounded-xl p-2 cursor-pointer ${isMobileGallery ? 'w-[50px]' : 'w-[120px]'} flex flex-col items-center
                  ${selectedTool === tool.id ? `border-2 shadow-lg ${isMobileGallery ? 'tool-blink' : ''}` : 'border-gray-600 hover:border-gray-500'}
                  ${isMobileGallery ? 'tool-card-mobile' : ''}`}
                style={{
                  borderColor: selectedTool === tool.id ? tool.color : '',
                  position: isMobileGallery ? 'absolute' : 'relative'
                }}
                animate={isMobileGallery ? {
                  ...getToolPosition(index, tools.length, selectedToolIndex),
                  rotateZ: 0, // Mantener orientación vertical
                  transition: {
                  type: "spring",
                    stiffness: 200,
                    damping: 20
                  }
                } : {}}
                initial={isMobileGallery ? {
                  scale: 0,
                  opacity: 0
                } : false}
                whileHover={!isMobileGallery ? { 
                  y: -5,
                  boxShadow: `0 10px 30px -10px ${tool.color}33`,
                  borderColor: `${tool.color}66`
                } : {}}
                onClick={() => handleToolClick(tool.id)}
              >
                <div className="p-3 bg-gray-800/30 rounded-full mb-2">
                  <Image 
                    src={tool.imgSrc} 
                    alt={`${tool.name} icon`} 
                    width={isMobileGallery ? 32 : 90} // Antes: 20. Más grande en móviles
                    height={isMobileGallery ? 32 : 90} // Antes: 20. Más grande en móviles
                    className={`${isMobileGallery ? 'w-8 h-8' : 'w-30 h-30'} object-contain rounded-md`} // Antes: w-5 h-5
                  />
                </div>
                <h3 className="text-xs font-medium text-white text-center">{tool.name}</h3>
              </motion.div>
            ))}
          </div>
          
          {/* Indicador de scroll para móviles cuando hay una herramienta seleccionada */}
          {isMobileGallery && selectedTool && filteredProjects.length > 0 && (
            <motion.div 
              className="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
          )}
        </motion.div>

        {/* Lista de proyectos filtrados */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div 
              key="projects-list"
              id="projects-container"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`flex flex-col gap-6 overflow-hidden ${isMobileGallery ? 'mt-16 projects-container-mobile' : ''}`}
              ref={projectsContainerRef}
            >
              {filteredProjects.map((project, index) => {
                // Obtener el color de la herramienta principal del proyecto
                const mainToolId = project.tags.find(tag => tools.find(t => t.id === tag)) || "";
                const mainTool = tools.find(t => t.id === mainToolId) || tools[0];
                const toolColor = mainTool.color;
                
                // Determinar si hay contenido expandible
                let hasExpandableContent = false;
                const splitMarker = "🚧 <b>Retos Técnicos:</b>";
                if (project.description.indexOf(splitMarker) !== -1 || project.description.indexOf("<br/><br/>") !== -1) {
                  hasExpandableContent = true;
                }
                
                // Definición de la galería específica para el proyecto de clipping y ROI
                const clippingRoiTripleSalidaGallery = [
                  { title: 'Workflow General', src: '/projects/n8n/clipping-roi-triple-salida/Workflow.general.png' },
                  { title: 'Disparador por Telegram', src: '/projects/n8n/clipping-roi-triple-salida/Disparador-telegram.png' },
                  { title: 'Preparar Informe y Solicitar Gráficos', src: '/projects/n8n/clipping-roi-triple-salida/preparar-informe-solicitar-graficos.png' },
                  { title: 'Triple Salida: PPT, PDF y Gmail', src: '/projects/n8n/clipping-roi-triple-salida/triplesalida-ppt-pdf-gmail.png' }
                ];
                
                // Definición de la galería específica para el proyecto Pipeline Automatizado de Contenido sobre Licitaciones
                const pipelineLicitacionesGallery = [
                  { title: 'Workflow General', src: '/projects/n8n/generador-contenido-licitaciones/workflow-general.png' },
                  { title: 'Prompt IA', src: '/projects/n8n/generador-contenido-licitaciones/promt-ia.png' },
                  { title: 'Procesamiento: Enviar una a la vez al nodo IA', src: '/projects/n8n/generador-contenido-licitaciones/procesamientoenviarunaalavezalnodoia.png' },
                  { title: 'Memoria de Agente: Evita artículos similares', src: '/projects/n8n/generador-contenido-licitaciones/flujomemoriaagenteevitaarticulossimilares.png' }
                ];
                
                // Definición de la galería específica para el proyecto Reporte Diario de Consumo OpenAI vía Gmail
                const reporteOpenAIGallery = [
                  { title: 'Workflow Completo', src: '/projects/n8n/reporte-diario-openai/workflow-completo.png' },
                  { title: 'Definir Fecha de Ayer', src: '/projects/n8n/reporte-diario-openai/definir-fecha-ayer.png' },
                  { title: 'Solicitud HTTP', src: '/projects/n8n/reporte-diario-openai/solicitudhttp.png' },
                  { title: 'Ejemplo Código JavaScript', src: '/projects/n8n/reporte-diario-openai/ejemplo-codigo-java.png' },
                  { title: 'Nodo Gmail', src: '/projects/n8n/reporte-diario-openai/gmail-nodo-png.png' }
                ];
                
                // Definición de la galería específica para el proyecto Clasificación Automática de Correos de Soporte con Gemini
                const clasificacionCorreosGeminiGallery = [
                  { title: 'Workflow General', src: '/projects/n8n/clasificacion-correos-gemini/workflow.general.png' },
                  { title: 'Prompt Gemini', src: '/projects/n8n/clasificacion-correos-gemini/promt-gemini.png' },
                  { title: 'Nodo Redireccionador', src: '/projects/n8n/clasificacion-correos-gemini/nodoredireccionador.png' },
                  { title: 'Redireccionar y Notificar Responsable', src: '/projects/n8n/clasificacion-correos-gemini/redireccionar-notificar-respondable.png' },
                  { title: 'Actualizar/Importar Registros en BD', src: '/projects/n8n/clasificacion-correos-gemini/actualizar-importar-registrosenbd.png' }
                ];
                
                // Definición de la galería específica para el proyecto Generador Automático de Contenido sobre Licitaciones
                const generadorArticulosLicitacionesGallery = [
                  { title: 'Workflow General', src: '/projects/n8n/generacion-articulos-licitaciones/workflowgeneral.png' },
                  { title: 'Prompt IA', src: '/projects/n8n/generacion-articulos-licitaciones/promt-ia.png' },
                  { title: 'Código JavaScript 1', src: '/projects/n8n/generacion-articulos-licitaciones/codigo-java.png' },
                  { title: 'Código JavaScript 2', src: '/projects/n8n/generacion-articulos-licitaciones/codigo-java2.png' }
                ];
                
                // Definición de la galería específica para el proyecto de Power BI
                const powerbiVisualizandoGallery = [
                  { title: 'Portada del Informe', src: '/projects/powerbi/visualizando-rendimiento/portada.jpg.png' },
                  { title: 'Informe General', src: '/projects/powerbi/visualizando-rendimiento/informe_general.jpg.png' },
                  { title: 'Informe EE.UU.', src: '/projects/powerbi/visualizando-rendimiento/informe_eeuu.jpg.png' },
                  { title: 'Modelo de Datos', src: '/projects/powerbi/visualizando-rendimiento/modelo_datos.jpg.png' }
                ];
                
                return (
                  <motion.div 
                    key={`container-${project.title}`}
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.1 + (index * 0.1),
                      ease: "easeOut"
                    }}
                    className={`py-4 md:py-6 flex flex-col gap-6 overflow-hidden ${isMobileGallery ? 'mt-16 projects-container-mobile' : ''}`}
                    ref={projectsContainerRef}
                  >
                    <motion.div
                      key={project.title}
                      whileHover={{ y: -5, boxShadow: `0 10px 30px -10px ${toolColor}33` }}
                      className={`bg-white/5 backdrop-blur-sm border rounded-xl p-3 md:p-5 transition-all border-gray-600 hover:border-gray-500 w-[98 %] mx-auto`}
                      style={{ borderColor: mainToolId ? `${toolColor}66` : undefined }}
                      layout
                    >
                      <div className="flex flex-col items-center text-center gap-1 mb-2 md:mb-3">
                        <div className="p-2 bg-gray-500/10 rounded-lg" style={{ backgroundColor: `${toolColor}22` }}>
                          <Image 
                            src={mainTool.imgSrc || "/icons/n8n.png"} 
                            alt="Project icon" 
                            width={24} 
                            height={24} 
                            className="w-6 h-6 object-cover rounded-md" 
                          />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-white">{project.title}</h3>
                      </div>
                      
                      {/* En móviles: primero galería (arriba) y luego texto (abajo) */}
                      {/* En desktop: texto (75% izquierda) y galería (25% derecha) */}
                      <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-3">
                        {/* Contenido de texto - 75% */}
                        <div className="w-full md:w-3/4 mt-2 md:mt-0">
                          <ExpandableDescription
                            html={project.description}
                            collapsed={collapsedArr[index]}
                          />
                        </div>
                        
                        {/* Galería de imágenes - 25% */}
                        {project.tags.some(tag => tools.find(t => t.id === tag)?.gallery) && (
                          <div className="w-full md:w-1/4 min-h-[100px] md:min-h-[180px] flex flex-col">
                            <h4 className="text-xs font-semibold text-white mb-1 text-center" style={{ color: toolColor }}>Galería</h4>
                            <div className="flex-grow">
                              <ImageGallery 
                                images={project.title === 'Visualizando el Rendimiento de Adventure Works Cycles'
                                  ? powerbiVisualizandoGallery
                                  : project.title === 'Generador Automático de Contenido sobre Licitaciones'
                                    ? generadorArticulosLicitacionesGallery
                                    : project.title === 'Clasificación Automática de Correos de Soporte con Gemini'
                                      ? clasificacionCorreosGeminiGallery
                                      : project.title === 'Reporte Diario de Consumo OpenAI vía Gmail'
                                        ? reporteOpenAIGallery
                                        : project.title === 'Pipeline Automatizado de Contenido sobre Licitaciones'
                                          ? pipelineLicitacionesGallery
                                          : project.title === 'SISTEMA INTEGRAL DE CLIPPING Y ROI CON TRIPLE SALIDA (HTML/PDF/PPTX)'
                                            ? clippingRoiTripleSalidaGallery
                                            : mainTool.gallery || []}
                                toolColor={toolColor}
                                onLightboxChange={handleLightboxChange}
                              />
                            </div>
                            {/* Botón de video demo solo para la tarjeta de clipping y ROI */}
                            {project.title === 'SISTEMA INTEGRAL DE CLIPPING Y ROI CON TRIPLE SALIDA (HTML/PDF/PPTX)' && (
                              <div className="flex justify-center mt-2">
                                <a
                                  href="https://youtu.be/lDFzFftjdNo"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-1 text-xs rounded bg-opacity-20 border cursor-pointer hover:bg-opacity-30 transition-all font-semibold"
                                  style={{
                                    backgroundColor: `${toolColor}22`,
                                    borderColor: `${toolColor}66`,
                                    color: toolColor
                                  }}
                                >
                                  Video demo 1
                                </a>
                              </div>
                            )}
                            {/* Botones específicos para Power BI */}
                            {mainToolId === "powerbi" && (
                              <div className="flex justify-center gap-4 mt-2">
                                <button
                                  className="px-4 py-1 text-xs rounded bg-opacity-20 border cursor-pointer hover:bg-opacity-30 transition-all"
                                  style={{
                                    backgroundColor: `${toolColor}22`,
                                    borderColor: `${toolColor}66`,
                                    color: toolColor
                                  }}
                                  onClick={() => window.open('https://docs.google.com/presentation/d/11SZvXxDZ1cNHuW32lHPfpq8rmusAdSFNgy_14XzcMZk/edit?usp=drive_link', '_blank')}
                                >
                                  Mockup
                                </button>
                                <button
                                  className="px-4 py-1 text-xs rounded bg-opacity-20 border cursor-pointer hover:bg-opacity-30 transition-all"
                                  style={{
                                    backgroundColor: `${toolColor}22`,
                                    borderColor: `${toolColor}66`,
                                    color: toolColor
                                  }}
                                  onClick={() => window.open('https://drive.google.com/file/d/1iPM8-AlXbgjUBNPMHP5RzEm8Hi2eW8GH/view?usp=drive_link', '_blank')}
                                >
                                  archivo pbix
                                </button>
                              </div>
                            )}
                            
                            {/* Botones específicos para Google Sheets */}
                            {mainToolId === "sheets" && (
                              <div className="flex justify-center mt-8">
                                <button
                                  className="px-4 py-1 text-xs rounded bg-opacity-20 border cursor-pointer hover:bg-opacity-30 transition-all"
                                  style={{
                                    backgroundColor: `${toolColor}22`,
                                    borderColor: `${toolColor}66`,
                                    color: toolColor
                                  }}
                                  onClick={() => window.open('https://docs.google.com/spreadsheets/d/1ET22cq7017Wgm77jxnFqNq80eXB9duQUU7XvjHlI8mk/edit?usp=sharing', '_blank')}
                                >
                                  Spreadsheet
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      
                      {/* Botón "Ver más detalles" centrado */}
                      {hasExpandableContent && (
                        <div className="w-full flex justify-center mt-2 mb-2">
                          <motion.button
                            className="px-4 md:px-6 py-1.5 md:py-2.5 rounded-full font-extrabold text-xs md:text-base shadow-lg focus:outline-none tracking-wide scale-90 md:scale-60 cursor-pointer hover:brightness-110 transition-all"
                            style={{
                              color: '#000000',
                              background: `linear-gradient(90deg, ${toolColor}BB 10%, ${toolColor} 90%)`,
                              boxShadow: `0 0 10px 2px ${toolColor}99, 0 0 20px 4px ${toolColor}66`,
                              border: `2px solid ${toolColor}`,
                              animation: 'button-blink 1.2s infinite alternate',
                            }}
                            onClick={() => handleToggle(index)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                              duration: 0.3,
                              type: "spring",
                              stiffness: 300,
                              damping: 15
                            }}
                          >
                            {collapsedArr[index] ? 'VER MAS DETALLES' : 'OCULTAR DETALLES'}
                          </motion.button>
                          <style jsx>{`
                            @keyframes button-blink {
                              0% { filter: brightness(1.1) drop-shadow(0 0 8px ${toolColor}); }
                              50% { filter: brightness(1.6) drop-shadow(0 0 20px ${toolColor}); }
                              100% { filter: brightness(1.2) drop-shadow(0 0 12px ${toolColor}); }
                            }
                          `}</style>
                        </div>
                      )}
                      
                      {/* Tags debajo del botón "Ver más detalles" */}
                      <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {project.tags.map((tag: string, tagIndex: number) => {
                          // Usar el color de la herramienta principal para todas las etiquetas
                          // con ligeras variaciones para crear una paleta armónica
                          const baseColor = toolColor;
                          let tagColor = baseColor;
                          
                          // Si la etiqueta es la herramienta principal, usar su color exacto
                          // Si no, usar una variación del color principal
                          if (tag !== mainToolId) {
                            // TODO: implementar variaciones de color basadas en el índice si se requiere en el futuro.
                            tagColor = baseColor;
                          }
                          
                          return (
                            <span
                              key={tagIndex}
                              className={`px-2 py-1 text-xs rounded bg-opacity-20 border`}
                              style={{
                                backgroundColor: `${tagColor}22`,
                                borderColor: `${tagColor}66`,
                                color: tagColor
                              }}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : selectedTool ? (
            <motion.div
              key="no-projects"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-12 overflow-hidden"
            >
              <p className="text-gray-400 text-lg">Próximamente</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      {/* Footer de íconos sociales, igual que en la página principal */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
        <a href="https://github.com/Pedroru101" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group" aria-label="GitHub">
          {/* Usar el mismo icono que en la página principal */}
          <Github className="w-5 h-5 text-gray-300 group-hover:text-[#F05033] transition-colors duration-300" />
        </a>
        <a href="https://www.linkedin.com/in/dataquintanapedro" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8a6 6 0 016 6v5a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4a1 1 0 00-2 0v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-5a6 6 0 016-6zM2 9a2 2 0 012-2h.01a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V9zm2-4a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </a>
        <a href="https://wa.me/5491139044027" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group" aria-label="WhatsApp">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="w-5 h-5 text-gray-300 group-hover:text-green-400 transition-colors duration-300">
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.402.752 4.676 2.149 6.599L4 29l7.584-2.168A11.902 11.902 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3Zm0 21.6c-1.876 0-3.705-.521-5.287-1.507l-.378-.233-4.25 1.215 1.233-4.139-.245-.392A9.597 9.597 0 0 1 6.4 15c0-5.301 4.299-9.6 9.6-9.6s9.6 4.299 9.6 9.6-4.299 9.6-9.6 9.6Zm5.243-7.193c-.288-.144-1.703-.84-1.967-.936-.264-.096-.456-.144-.648.144s-.744.936-.912 1.128c-.168.192-.336.216-.624.072-.288-.144-1.248-.456-2.376-1.44-.88-.784-1.464-1.728-1.632-2.016-.168-.288-.024-.44.12-.576.12-.12.288-.312.432-.48.144-.168.192-.288.288-.48.096-.192.048-.36-.024-.504-.072-.144-.648-1.464-.888-2.016-.24-.552-.48-.48-.648-.48h-.552c-.192 0-.504.072-.768.36-.264.288-1.032 1.008-1.032 2.448s1.08 2.856 1.224 3.048c.144.192 2.136 3.24 5.184 4.536.72.312 1.296.504 1.728.648.744.24 1.416.204 1.944.132.6-.084 1.824-.744 2.088-1.452.264-.708.264-1.308.192-1.44-.072-.132-.24-.204-.528-.348Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
