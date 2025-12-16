import type { Room, FAQ } from '@/lib/types';

export const rooms: Room[] = [
  {
    id: 'room-1',
    name: '8-Bed Mixed Dorm',
    description: 'Spacious and social, our mixed dorm is perfect for budget travelers and making new friends.',
    pricePerNight: 25,
    bedsAvailable: 5,
    imagePlaceholderId: 'room-mixed-dorm',
  },
  {
    id: 'room-2',
    name: '6-Bed Female-Only Dorm',
    description: 'A comfortable and secure space for female travelers looking for a quiet stay.',
    pricePerNight: 28,
    bedsAvailable: 3,
    imagePlaceholderId: 'room-female-dorm',
  },
  {
    id: 'room-3',
    name: 'Private Twin Room',
    description: 'Enjoy your privacy in our cozy twin room, complete with an en-suite bathroom.',
    pricePerNight: 70,
    bedsAvailable: 1,
    imagePlaceholderId: 'room-private',
  },
];

export const faqs: FAQ[] = [
  {
    question: '¿Cuáles son los horarios de check-in y check-out?',
    answer: 'El horario estándar de check-in es a partir de las 14:00 y el check-out es hasta las 11:00. Si llegás antes, podés dejar tu equipaje en nuestra consigna hasta que la habitación esté lista. En caso de necesitar un late check-out, escribinos por el chat o correo para verificar disponibilidad y posibles cargos adicionales.',
  },
  {
    question: '¿El precio de la reserva incluye desayuno?',
    answer: 'Dependiendo de la tarifa seleccionada, el desayuno puede estar o no incluido en el precio final. En la pantalla de reserva verás claramente si tu tarifa incluye desayuno, toallas u otros servicios adicionales. Si no aparece incluido, podés consultarnos por el costo extra o contratarlo directamente en el hostel, sujeto a disponibilidad.',
  },
  {
    question: '¿Qué tipos de habitaciones ofrecen?',
    answer: 'En Nomade Hostel ofrecemos habitaciones compartidas (dorms) y habitaciones privadas. Todas las camas incluyen ropa de cama, acceso a locker individual (traé tu candado o consultá por uno en recepción) y acceso a baños compartidos. Las habitaciones privadas cuentan además con toallas incluidas y mayor privacidad.',
  },
  {
    question: '¿Cómo puedo hacer una reserva?',
    answer: 'Para hacer una reserva en Nomade Hostel podés usar directamente la página de reservas del sitio. Seleccioná tus fechas de entrada y salida, el tipo de habitación (compartida o privada) y la cantidad de huéspedes. Luego completá tus datos personales y confirmá la reserva con el medio de pago disponible.',
  },
];
