import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ReservasPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Reservas</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Aquí podrás ver, crear y administrar todas las reservas.</p>
        {/* Futuros componentes de tabla, filtros y acciones irán aquí */}
      </CardContent>
    </Card>
  );
}
