"use client";

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ChevronDown, Wifi, Lock, MapPin } from 'lucide-react';

export function Hero() {

  const onScrollToSearch = () => {
    const searchElement = document.getElementById('book');
    if (searchElement) {
      searchElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1920&q=80"
          className="w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-traveling-through-a-forest-path-506-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-lg"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full mb-6"
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-white/90 text-sm font-medium">Valle de los Sueños, Argentina</span>
          </motion.div>

          {/* Logo/Title */}
          <h1 className="font-light text-5xl md:text-6xl lg:text-7xl text-white mb-4 tracking-tight">
            Nómades
            <span className="block font-semibold text-primary">Campestres</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 font-light mb-3">
            Dormí bien. Conectá con viajeros. Reservá en segundos.
          </p>

          <p className="text-white/70 text-base mb-8 max-w-md mx-auto">
            El hostel perfecto para nómadas digitales y mochileros en busca de aventura y conexión.
          </p>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 mb-10 flex-wrap">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full"><Wifi className="w-4 h-4 text-primary" /><span className="text-white/90 text-xs">Wi-Fi rápido</span></div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full"><Lock className="w-4 h-4 text-primary" /><span className="text-white/90 text-xs">Lockers seguros</span></div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full"><span className="text-primary text-xs font-bold">$</span><span className="text-white/90 text-xs">Impuestos incluidos • Sin cargos sorpresa</span></div>
          </div>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button size="lg" onClick={onScrollToSearch} className="w-full max-w-xs h-14 text-base font-medium shadow-lg shadow-primary/30">Ver disponibilidad</Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="cursor-pointer" onClick={onScrollToSearch}>
            <ChevronDown className="w-8 h-8 text-white/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
