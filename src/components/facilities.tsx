"use client";

import { motion } from 'framer-motion';
import {
  Wifi,
  Lock,
  UtensilsCrossed,
  Sofa,
  Plug,
  WashingMachine,
  Coffee,
  Bike
} from 'lucide-react';

const facilities = [
  { icon: Wifi, label: 'Wi-Fi rápido', desc: '100 Mbps de fibra' },
  { icon: Lock, label: 'Lockers seguros', desc: 'En cada habitación' },
  { icon: UtensilsCrossed, label: 'Cocina equipada', desc: 'Disponible 24/7' },
  { icon: Sofa, label: 'Áreas comunes', desc: 'Relax y coworking' },
  { icon: Plug, label: 'Enchufes individuales', desc: 'En cada cama' },
  { icon: WashingMachine, label: 'Lavandería', desc: 'Autoservicio' },
  { icon: Coffee, label: 'Café y té gratis', desc: 'Todo el día' },
  { icon: Bike, label: 'Alquiler de Bicis', desc: 'Explora la zona' },
];

export function Facilities() {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-background">
      <div className="container max-w-5xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Nuestras Comodidades</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Todo lo que necesitás para una estadía perfecta, ya sea trabajando o descansando.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-accent transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <facility.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-base mb-1">{facility.label}</h3>
              <p className="text-sm text-muted-foreground">{facility.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
