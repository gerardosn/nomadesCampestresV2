import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { HabitacionesArraySchema } from './habitacionSchema';

export async function GET() {
  try {
    // Construye la ruta absoluta al archivo JSON
    const jsonDirectory = path.join(process.cwd(), 'src', 'lib', 'nosqlJsons');
    const fileContents = await fs.readFile(
      path.join(jsonDirectory, 'habitaciones.json'),
      'utf8'
    );
    const data = JSON.parse(fileContents);

    // Valida los datos con Zod
    const validationResult = HabitacionesArraySchema.safeParse(data);

    if (!validationResult.success) {
      console.error('Error de validación Zod:', validationResult.error.flatten());
      return NextResponse.json({ message: 'Datos inválidos en el servidor.' }, { status: 500 });
    }

    return NextResponse.json(validationResult.data);
  } catch (error) {
    console.error('Error al leer o procesar el archivo de habitaciones:', error);
    return NextResponse.json({ message: 'Error interno del servidor.' }, { status: 500 });
  }
}
