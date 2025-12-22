"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { HabitacionSchema, HabitacionesArraySchema } from "@/app/api/hostel-office/habitaciones/habitacionSchema";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { BedDouble, Users } from "lucide-react";

type Habitacion = z.infer<typeof HabitacionSchema>;

export default function HabitacionesPage() {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/hostel-office/habitaciones");
        if (!response.ok) {
          throw new Error("No se pudieron cargar las habitaciones.");
        }
        const data = await response.json();

        // Validamos la estructura de los datos recibidos por seguridad
        const result = HabitacionesArraySchema.safeParse(data);
        if (!result.success) throw new Error("Formato de datos inválido recibido del servidor.");
        
        // Asignamos solo el array de habitaciones ('rooms') al estado
        setHabitaciones(result.data.rooms);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Un error desconocido ocurrió.");
      } finally {
        setLoading(false);
      }
    };

    fetchHabitaciones();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Habitaciones</CardTitle>
          <CardDescription>
            Aquí puedes ver y administrar las habitaciones del hostel.
          </CardDescription>
        </CardHeader>
      </Card>

      {loading && <p>Cargando habitaciones...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {habitaciones.map((habitacion) => (
            <Card key={habitacion.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {habitacion.name}
                  <Badge variant={habitacion.type === 'shared' ? 'secondary' : 'outline'}>
                    {habitacion.type === 'shared' ? 'Compartida' : 'Privada'}
                  </Badge>
                </CardTitle>
                <CardDescription>{habitacion.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Capacidad para {habitacion.capacity} personas</span>
                </div>
                 <div className="flex items-center text-sm text-muted-foreground">
                    <BedDouble className="mr-2 h-4 w-4" />
                    <span>{habitacion.beds.length} camas disponibles</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Comodidades:</h4>
                  <div className="flex flex-wrap gap-2">
                    {habitacion.amenities.map(amenity => (
                        <Badge key={amenity} variant="outline">{amenity}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 p-4">
                 <p className="text-lg font-bold text-primary">
                    ${habitacion.pricing.amount.toLocaleString('es-AR')}
                    <span className="text-xs font-normal text-muted-foreground ml-1">
                        {habitacion.pricing.currency}/noche
                    </span>
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
