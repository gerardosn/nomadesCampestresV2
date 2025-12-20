import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { HuespedSchema } from "./huespedSchema";

export async function GET() {
  try {
    // Construimos la ruta absoluta al archivo JSON
    const filePath = path.join(process.cwd(), "src/lib/nosqlJsons/huespedes.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(fileContents);

    // Validamos que los datos cumplan con el esquema esperado usando Zod
    const huespedes = z.array(HuespedSchema).parse(jsonData);

    return NextResponse.json(huespedes);
  } catch (error) {
    console.error("Error leyendo la base de datos de huéspedes:", error);
    
    // Determinamos el mensaje de error y si hay detalles de validación (Zod)
    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    const errorDetails = error instanceof z.ZodError ? error.issues : null;

    return NextResponse.json(
      { error: "Error al procesar la solicitud", details: errorMessage, issues: errorDetails },
      { status: 500 }
    );
  }
}