"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HabitacionSchema } from "@/lib/nosqlJsons/habitacionSchema";
import { HabitacionSchema } from "@/app/api/hostel-office/habitaciones/habitacionSchema";
import { z } from "zod";

type Habitacion = z.infer<typeof HabitacionSchema>;

export default function HabitacionesPage() {
  const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHabitaciones = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/hostel-office/habitaciones");
        if (!response.ok) {
          throw new Error("No se pudieron cargar las habitaciones.");
        }
        const data = await response.json();
        setHabitaciones(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Un error desconocido ocurrió.");
      } finally {
        setLoading(false);
      }
    };

    fetchHabitaciones();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Habitaciones</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <p>Cargando habitaciones...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="space-y-4">
            {habitaciones.map((habitacion) => (
              <div key={habitacion.id} className="border p-4 rounded-md">
                <h3 className="font-bold text-lg">{habitacion.name}</h3>
                <p>{habitacion.description}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
