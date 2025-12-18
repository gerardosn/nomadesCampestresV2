import { MountainSnow, Twitter, Instagram, Facebook, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FooterProps {
  onFaqClick: () => void;
}

export function Footer({ onFaqClick }: FooterProps) {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <Link href="#" className="flex items-center mb-4" prefetch={false}>
              <MountainSnow className="h-8 w-8" />
              <span className="ml-2 text-2xl font-bold font-headline">Nómades Campestres</span>
            </Link>
            <p className="max-w-xs text-sm">
              Dormí bien. Conectá con viajeros. Reservá en segundos.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3 font-headline">Explorá</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#book" className="hover:underline">Reservar</a></li>
                <li><a href="#rooms" className="hover:underline">Habitaciones</a></li>
                <li><a href="#map" className="hover:underline">Ubicación</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 font-headline">Conectá</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:underline" prefetch={false}>Contactanos</Link></li>
                <li><button onClick={onFaqClick} className="hover:underline text-left">FAQs</button></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <h4 className="font-semibold mb-3 font-headline">Seguinos</h4>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" prefetch={false}><Facebook className="h-6 w-6 hover:opacity-80 transition-opacity" /></Link>
              <Link href="#" aria-label="Instagram" prefetch={false}><Instagram className="h-6 w-6 hover:opacity-80 transition-opacity" /></Link>
              <Link href="#" aria-label="Twitter" prefetch={false}><Twitter className="h-6 w-6 hover:opacity-80 transition-opacity" /></Link>
            </div>
          </div>
        </div>
        <div className="relative border-t border-secondary-foreground/20 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Nómades Campestres. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
