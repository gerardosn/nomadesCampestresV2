"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Huesped } from "@/app/api/hostel-office/huespedes/huespedSchema";

export default function HuespedesPage() {
  const [huespedes, setHuespedes] = useState<Huesped[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedHuesped, setSelectedHuesped] = useState<Huesped | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchHuespedes = async () => {
      try {
        const res = await fetch("/api/hostel-office/huespedes");
        if (!res.ok) {
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

  const handleHuespedClick = async (id: string) => {
    try {
      const res = await fetch(`/api/hostel-office/huespedes?id=${id}`);
      if (!res.ok) {
        throw new Error("No se pudo cargar la información del huésped");
      }
      const data = await res.json();
      setSelectedHuesped(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al obtener detalles del huésped:", error);
    }
  };

  // Efecto para abrir el modal automáticamente si hay un ID en la URL (Deep Linking)
  useEffect(() => {
    const showId = searchParams.get("showId");
    if (showId) {
      handleHuespedClick(showId);
    }
  }, [searchParams]);

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
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
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
                    <td className="p-4 align-middle font-medium">
                      <button
                        onClick={() => handleHuespedClick(huesped.id)}
                        className="text-primary hover:underline focus:outline-none font-bold"
                        title="Ver detalles completos del huésped"
                      >
                        {huesped.id}
                      </button>
                    </td>
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

        {/* Modal de Detalles del Huésped */}
        {isModalOpen && selectedHuesped && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg rounded-xl bg-background p-6 shadow-2xl border border-border animate-in zoom-in-95 duration-200">
              <div className="mb-6 flex items-center justify-between border-b pb-4">
                <h3 className="text-xl font-semibold tracking-tight">Detalles del Huésped</h3>
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
                    <p className="font-medium text-muted-foreground">Nombre Completo</p>
                    <p>{selectedHuesped.firstName} {selectedHuesped.lastName}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Nacionalidad</p>
                    <p>{selectedHuesped.nationality}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Email</p>
                    <p>{selectedHuesped.email}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Teléfono</p>
                    <p>{selectedHuesped.phone}</p>
                  </div>
                  <div className="col-span-2 border-t pt-4 mt-2">
                    <p className="font-medium text-muted-foreground">Documento</p>
                    <p>{selectedHuesped.document.type}: {selectedHuesped.document.number}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-medium text-muted-foreground">Fecha de Nacimiento</p>
                    <p>{selectedHuesped.dateOfBirth}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-medium text-muted-foreground">IDs de Reservas</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedHuesped.bookingIds.map((bookingId) => (
                        <Link 
                          key={bookingId}
                          href={`/hostel-office/reservas?showId=${bookingId}`}
                          className="text-primary hover:underline bg-primary/10 px-2 py-0.5 rounded text-sm font-medium transition-colors hover:bg-primary/20"
                        >
                          {bookingId}
                        </Link>
                      ))}
                    </div>
                  </div>
                  {selectedHuesped.notes && (
                    <div className="col-span-2 bg-muted/30 p-3 rounded-lg mt-2">
                      <p className="font-medium text-muted-foreground">Notas</p>
                      <p className="text-sm">{selectedHuesped.notes}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
