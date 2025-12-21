import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { ReservaSchema } from "./reservaSchema";

export async function GET(request: Request) {
  try {
    // Obtenemos los parámetros de búsqueda de la URL (Query Params)
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Construimos la ruta absoluta al archivo JSON de manera segura
    const filePath = path.join(process.cwd(), "src/lib/nosqlJsons/reservas.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(fileContents);

    // Validamos la integridad de los datos contra nuestro esquema
    const reservas = z.array(ReservaSchema).parse(jsonData);

    // Si existe un ID en la query (?id=...), filtramos y devolvemos ese único recurso
    if (id) {
      const reserva = reservas.find((r) => r.id === id);
      if (!reserva) {
        return NextResponse.json({ error: "Reserva no encontrada" }, { status: 404 });
      }
      return NextResponse.json(reserva);
    }

    return NextResponse.json(reservas);
  } catch (error) {
    console.error("Error leyendo la base de datos de reservas:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    const errorDetails = error instanceof z.ZodError ? error.issues : null;

    return NextResponse.json(
      { error: "Error al procesar la solicitud", details: errorMessage, issues: errorDetails },
      { status: 500 }
    );
  }
}