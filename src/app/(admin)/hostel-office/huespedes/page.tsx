import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function HuespedesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Huéspedes</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Aquí podrás administrar los perfiles de los huéspedes y su historial.</p>
        {/* Futuros componentes para administrar huéspedes irán aquí */}
      </CardContent>
    </Card>
  );
}
