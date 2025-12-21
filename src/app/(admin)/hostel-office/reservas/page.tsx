"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Reserva } from "@/app/api/hostel-office/reservas/reservaSchema";

export default function ReservasPage() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleReservaClick = async (id: string) => {
    try {
      // Actualizamos la petición para usar Query Params (?id=) en lugar de ruta dinámica
      const res = await fetch(`/api/hostel-office/reservas?id=${id}`);
      if (!res.ok) throw new Error("No se pudo cargar la reserva");
      const data = await res.json();
      setSelectedReserva(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al obtener detalles:", error);
    }
  };

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
                    <td className="p-4 align-middle font-medium">
                      <button 
                        onClick={() => handleReservaClick(reserva.id)}
                        className="text-primary hover:underline focus:outline-none font-bold"
                        title="Ver detalles completos"
                      >
                        {reserva.id}
                      </button>
                    </td>
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

        {/* Modal / Recuadro Emergente de Detalles */}
        {isModalOpen && selectedReserva && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg rounded-xl bg-background p-6 shadow-2xl border border-border animate-in zoom-in-95 duration-200">
              <div className="mb-6 flex items-center justify-between border-b pb-4">
                <h3 className="text-xl font-semibold tracking-tight">Detalles de Reserva</h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full p-1 hover:bg-muted transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid gap-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-muted-foreground">ID Reserva</p>
                    <p>{selectedReserva.id}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Estado</p>
                    <p className="capitalize">{selectedReserva.status}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Usuario</p>
                    <p>{selectedReserva.userId}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Habitación</p>
                    <p>{selectedReserva.roomId}</p>
                  </div>
                  <div className="col-span-2 border-t pt-2 mt-2">
                    <p className="font-medium text-muted-foreground">Fechas</p>
                    <p>Del {selectedReserva.checkInDate} al {selectedReserva.checkOutDate} ({selectedReserva.nights} noches)</p>
                  </div>
                  <div className="col-span-2 bg-muted/30 p-3 rounded-lg mt-2">
                    <p className="font-medium text-muted-foreground">Total a Pagar</p>
                    <p className="text-lg font-bold">{selectedReserva.totalPrice.toLocaleString()} {selectedReserva.currency}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
