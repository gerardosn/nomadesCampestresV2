"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import {
  Wifi,
  Lock,
  UtensilsCrossed,
  Sofa,
  Plug,
  WashingMachine,
  Coffee,
  Bike,
} from "lucide-react";

const facilities = [
  { icon: Wifi, label: "Wi-Fi rápido", desc: "100 Mbps de fibra" },
  { icon: Lock, label: "Lockers seguros", desc: "En cada habitación" },
  { icon: UtensilsCrossed, label: "Cocina equipada", desc: "Disponible 24/7" },
  { icon: Sofa, label: "Áreas comunes", desc: "Relax y coworking" },
  { icon: Plug, label: "Enchufes individuales", desc: "En cada cama" },
  { icon: WashingMachine, label: "Lavandería", desc: "Autoservicio" },
  { icon: Coffee, label: "Café y té gratis", desc: "Todo el día" },
  { icon: Bike, label: "Alquiler de Bicis", desc: "Explora la zona" },
];

export function Facilities() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || !overlayRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    overlayRef.current.style.setProperty("--x", `${x}px`);
    overlayRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <section className="py-12 md:py-20 lg:py-24 bg-background">
      <div className="container max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Nuestras Comodidades
          </h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitás para una estadía perfecta, ya sea trabajando o
            descansando.
          </p>
        </motion.div>

        <div
          ref={containerRef}
          onPointerMove={handleMouseMove}
          className="relative group"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex flex-col items-center text-center p-4 rounded-lg border border-transparent group-hover:border-stone-200/50 transition-colors duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <facility.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-base mb-1">
                  {facility.label}
                </h3>
                <p className="text-sm text-muted-foreground">{facility.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Overlay con el efecto */}
          <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 z-10 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              mask: "radial-gradient(20rem 20rem at var(--x) var(--y), black 1%, transparent 50%)",
              WebkitMask: "radial-gradient(20rem 20rem at var(--x) var(--y), black 1%, transparent 50%)",
            }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {facilities.map((facility) => (
                <div
                  key={facility.label}
                  className="flex flex-col items-center text-center p-4 rounded-lg border border-primary/50 bg-primary/5"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <facility.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-primary text-base mb-1">
                    {facility.label}
                  </h3>
                  <p className="text-sm text-primary/80">{facility.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
