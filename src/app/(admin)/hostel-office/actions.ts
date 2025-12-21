//logica de negocio de hostel-office, la pagina inicial del admin.
"use server";
import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import { ReservaSchema } from '@/app/api/hostel-office/reservas/reservaSchema';

// Define el tipo basado en el esquema de Zod
type Reserva = z.infer<typeof ReservaSchema>;

// Función para obtener la fecha actual en formato YYYY-MM-DD
function getTodayDateString(): string {
  const today = new Date();
  // Ajustamos a la zona horaria de Argentina (GMT-3)
  today.setHours(today.getHours() - 3);
  return today.toISOString().split('T')[0];
}

export async function getDailyMovements(): Promise<{ checkIns: Reserva[]; checkOuts: Reserva[] }> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'lib', 'nosqlJsons', 'reservas.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContents);

    // Validamos el array completo
    const validationResult = z.array(ReservaSchema).safeParse(jsonData);
    if (!validationResult.success) {
      console.error("Error de validación en reservas.json:", validationResult.error.flatten());
      throw new Error("El formato de los datos de reservas no es válido.");
    }
    
    const allReservas: Reserva[] = validationResult.data;
    const today = getTodayDateString();

    const checkIns = allReservas.filter(r => r.checkInDate === today);
    const checkOuts = allReservas.filter(r => r.checkOutDate === today);
    
    return { checkIns, checkOuts };
  } catch (error) {
    console.error("Error al obtener los movimientos del día:", error);
    // En caso de error, devolvemos arrays vacíos para no romper la UI
    return { checkIns: [], checkOuts: [] };
  }
}
