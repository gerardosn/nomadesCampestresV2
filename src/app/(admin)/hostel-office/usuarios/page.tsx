import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function UsuariosPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Usuarios</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Aquí podrás administrar las cuentas de los usuarios y sus roles.</p>
        {/* Futuros componentes para administrar usuarios irán aquí */}
      </CardContent>
    </Card>
  );
}
