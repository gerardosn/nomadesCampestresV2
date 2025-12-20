"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Reserva } from "@/app/api/hostel-office/reservas/reservaSchema";

export default function ReservasPage() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await fetch("/api/hostel-office/reservas");
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          console.error("Detalles del error del servidor:", errorData);
          throw new Error(errorData.details || "Fallo al cargar reservas");
        }
        const data = await res.json();
        setReservas(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Reservas</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-6 text-muted-foreground">Aquí podrás ver, crear y administrar todas las reservas.</p>
        
        {loading ? (
          <div>Cargando reservas...</div>
        ) : (
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Habitación</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Check-In</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Check-Out</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Huéspedes</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Total</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Estado</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {reservas.map((reserva) => (
                  <tr key={reserva.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle font-medium">{reserva.id}</td>
                    <td className="p-4 align-middle">{reserva.roomId}</td>
                    <td className="p-4 align-middle">{reserva.checkInDate}</td>
                    <td className="p-4 align-middle">{reserva.checkOutDate}</td>
                    <td className="p-4 align-middle">{reserva.guests}</td>
                    <td className="p-4 align-middle">{reserva.totalPrice.toLocaleString()} {reserva.currency}</td>
                    <td className="p-4 align-middle capitalize">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                        reserva.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        reserva.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {reserva.status}
                      </span>
                    </td>
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
