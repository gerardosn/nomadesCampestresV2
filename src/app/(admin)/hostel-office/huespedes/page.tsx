"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Huesped } from "@/app/api/hostel-office/huespedes/huespedSchema";

export default function HuespedesPage() {
  const [huespedes, setHuespedes] = useState<Huesped[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHuespedes = async () => {
      try {
        const res = await fetch("/api/hostel-office/huespedes");
        if (!res.ok) {
          // Intentamos obtener detalles del error del servidor
          const errorData = await res.json().catch(() => ({}));
          console.error("Detalles del error del servidor:", errorData);
          throw new Error(errorData.details || "Fallo al cargar huéspedes");
        }
        const data = await res.json();
        setHuespedes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHuespedes();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Huéspedes</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-muted-foreground">Aquí podrás administrar los perfiles de los huéspedes y su historial.</p>
        
        {loading ? (
          <div>Cargando información...</div>
        ) : (
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nombre</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nacionalidad</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Documento</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Reservas</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {huespedes.map((huesped) => (
                  <tr key={huesped.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle font-medium">{huesped.firstName} {huesped.lastName}</td>
                    <td className="p-4 align-middle">{huesped.nationality}</td>
                    <td className="p-4 align-middle">{huesped.document.type} {huesped.document.number}</td>
                    <td className="p-4 align-middle">{huesped.email}</td>
                    <td className="p-4 align-middle">{huesped.bookingIds.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
