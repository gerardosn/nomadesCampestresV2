import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function HabitacionesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Habitaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Aquí podrás configurar las habitaciones, camas y precios.</p>
        {/* Futuros componentes para administrar habitaciones irán aquí */}
      </CardContent>
    </Card>
  );
}
