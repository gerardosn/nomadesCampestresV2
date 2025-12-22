"use client";

import { useState, forwardRef, useRef, useEffect } from "react";
import {
  Card
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Minus, Plus, Search, Users, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface SearchWidgetProps {
  onSearch?: (date: string, nights: number, guests: number) => void;
  isLoading?: boolean;
}

const quickDates = [
  { label: "Hoy", offset: 0 },
  { label: "Mañana", offset: 1 },
  { label: "Fin de semana", offset: null }, // Calculate to next Saturday
];

export const AvailabilitySearch = forwardRef<HTMLDivElement, SearchWidgetProps>(
  ({ onSearch, isLoading }, ref) => {
    const [date, setDate] = useState("");
    const [nights, setNights] = useState(1);
    const [guests, setGuests] = useState(1);
    const [isChecking, setIsChecking] = useState(false);
    const [availabilityResult, setAvailabilityResult] = useState<boolean | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Collapse when clicking outside
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
          setIsExpanded(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [searchRef]);

    const formatDate = (offset: number | null) => {
      const d = new Date();
      if (offset === null) {
        // Next Saturday
        const day = d.getDay();
        const daysUntilSaturday = (6 - day + 7) % 7 || 7;
        d.setDate(d.getDate() + daysUntilSaturday);
      } else {
        d.setDate(d.getDate() + offset);
      }
      return d.toISOString().split("T")[0];
    };

    const handleQuickDate = (offset: number | null) => {
      setDate(formatDate(offset));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!date) return;

      setIsChecking(true);
      setAvailabilityResult(null);
      onSearch?.(date, nights, guests);

      try {
        // 1. Calcular fecha de salida
        const checkInDate = new Date(date);
        const checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkOutDate.getDate() + nights);
        const checkOutDateString = checkOutDate.toISOString().split("T")[0];

        // 2. Obtener total de camas disponibles
        const habsResponse = await fetch('/api/hostel-office/habitaciones');
        if (!habsResponse.ok) throw new Error('Error al obtener datos de habitaciones.');
        const habsData = await habsResponse.json();
        const totalBedsInService = habsData.summary.total_beds_available;

        // 3. Obtener reservas que se solapan
        const reservasResponse = await fetch(`/api/hostel-office/reservas?checkIn=${date}&checkOut=${checkOutDateString}`);
        if (!reservasResponse.ok) throw new Error('Error al obtener datos de reservas.');
        const overlappingReservations = await reservasResponse.json();

        // 4. Calcular la ocupación máxima en el período solicitado
        let maxOccupiedBeds = 0;
        for (let i = 0; i < nights; i++) {
          const currentDate = new Date(checkInDate);
          currentDate.setDate(currentDate.getDate() + i);
          currentDate.setHours(0, 0, 0, 0);

          let dailyOccupiedBeds = 0;
          for (const reserva of overlappingReservations) {
            const reservaCheckIn = new Date(reserva.checkInDate);
            const reservaCheckOut = new Date(reserva.checkOutDate);
            if (currentDate >= reservaCheckIn && currentDate < reservaCheckOut) {
              dailyOccupiedBeds += reserva.guests;
            }
          }
          if (dailyOccupiedBeds > maxOccupiedBeds) {
            maxOccupiedBeds = dailyOccupiedBeds;
          }
        }

        // 5. Determinar si hay al menos una cama disponible
        setAvailabilityResult(totalBedsInService > maxOccupiedBeds);
      } catch (error) {
        console.error("Error en la búsqueda de disponibilidad:", error);
        setAvailabilityResult(false); // Asumir no disponible en caso de error
      } finally {
        setIsChecking(false);
        setIsModalOpen(true);
      }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
      <section id="book" className="sticky top-16 z-20 bg-background/90 backdrop-blur-sm" ref={ref}>
        <div ref={searchRef} className="container mx-auto">
          <Card className={cn(
            "p-4 md:p-6 shadow-lg rounded-t-none md:rounded-lg transition-all duration-500 ease-in-out overflow-hidden",
            isExpanded ? "border-x-0 md:border-x" : "p-0 md:p-0 border-none shadow-none"
          )}>
            {isLoading && (
              <Progress value={100} className="absolute top-0 left-0 right-0 h-1 animate-pulse" />
            )}

            {!isExpanded && (
              <div className="p-2">
                <Button size="lg" className="w-full font-semibold text-base" onClick={() => setIsExpanded(true)}>
                  <Search className="mr-2 h-5 w-5" />
                  Buscar disponibilidad
                </Button>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className={cn("space-y-4", !isExpanded && "hidden")}>
              <div className="relative">
                <label htmlFor="check-in-date" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
                  <Calendar className="w-5 h-5" />
                </label>
                <span className="absolute left-12 top-2 text-xs font-bold text-muted-foreground">Fecha de llegada</span>
                <input
                  id="check-in-date"
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-14 pt-6 pb-2 pl-12 pr-4 rounded-lg border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  required
                  aria-label="Fecha de llegada"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {quickDates.map((qd) => (
                  <button
                    key={qd.label}
                    type="button"
                    onClick={() => handleQuickDate(qd.offset)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm border transition-all h-12",
                      date === formatDate(qd.offset)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted border-border text-muted-foreground hover:border-primary hover:text-primary"
                    )}
                  >
                    {qd.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative col-span-1 md:col-span-1">
                  <label id="nights-label" className="absolute left-12 top-2 text-xs font-bold text-muted-foreground">Noches</label>
                  <div className="flex items-center w-full h-14 rounded-lg border border-input bg-background focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
                    <button type="button" onClick={() => setNights(Math.max(1, nights - 1))} className="w-12 h-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-l-lg" disabled={nights <= 1} aria-label="Reducir número de noches">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="flex-1 text-center font-medium text-base" aria-labelledby="nights-label">{nights}</span>
                    <button type="button" onClick={() => setNights(Math.min(30, nights + 1))} className="w-12 h-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors rounded-r-lg" disabled={nights >= 30} aria-label="Aumentar número de noches">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="relative col-span-1 md:col-span-1">
                  <label htmlFor="guests-select" className="absolute left-12 top-2 text-xs font-bold text-muted-foreground z-10">Huéspedes</label>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <Users className="w-5 h-5" />
                  </div>
                  <select
                    id="guests-select"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full h-14 pt-6 pb-2 pl-12 pr-4 rounded-lg border border-input bg-background text-base appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    aria-label="Número de huéspedes"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "persona" : "personas"}
                      </option>
                    ))}
                  </select>
                </div>

                <Button size="lg" className="w-full font-semibold text-base col-span-1 md:col-span-1" disabled={isLoading || isChecking}>
                  {isLoading || isChecking ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Buscando...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Buscar disponibilidad
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Resultado de la Búsqueda</DialogTitle>
                <DialogDescription>
                  {availabilityResult === null
                    ? "Verificando disponibilidad..."
                    : availabilityResult
                    ? "¡Buenas noticias! Tenemos al menos una cama disponible para las fechas seleccionadas."
                    : "Lo sentimos, no hay disponibilidad para las fechas seleccionadas. Por favor, intenta con otras fechas."}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={() => setIsModalOpen(false)}>Cerrar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    );
  }
);

AvailabilitySearch.displayName = "AvailabilitySearch";
