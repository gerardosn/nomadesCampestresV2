import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { HuespedSchema } from "./huespedSchema";

export async function GET(request: NextRequest) {
  try {
    const filePath = path.join(process.cwd(), "src/lib/nosqlJsons/huespedes.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    const jsonData = JSON.parse(fileContents);

    const id = request.nextUrl.searchParams.get("id");

    if (id) {
      // Búsqueda por ID
      const validatedId = z.string().parse(id);
      const huesped = jsonData.find((h: any) => h.id === validatedId);

      if (!huesped) {
        return NextResponse.json(
          { error: "Huésped no encontrado" },
          { status: 404 }
        );
      }

      // Validar el huésped encontrado con el schema
      const validatedHuesped = HuespedSchema.parse(huesped);
      return NextResponse.json(validatedHuesped);
    } else {
      // Devolver todos los huéspedes
      const huespedes = z.array(HuespedSchema).parse(jsonData);
      return NextResponse.json(huespedes);
    }
  } catch (error) {
    console.error("Error procesando la solicitud de huéspedes:", error);

    const errorMessage = error instanceof Error ? error.message : "Error desconocido";
    const errorDetails = error instanceof z.ZodError ? error.issues : null;

    // Si el error es de Zod, es un Bad Request (400), si no, un error interno (500)
    const status = error instanceof z.ZodError ? 400 : 500;

    return NextResponse.json(
      { error: "Error al procesar la solicitud", details: errorMessage, issues: errorDetails },
      { status }
    );
  }
}

