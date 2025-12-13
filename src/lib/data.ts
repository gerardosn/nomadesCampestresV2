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
    question: 'What are the check-in and check-out times?',
    answer: 'Check-in is from 3:00 PM to 11:00 PM. Check-out is before 11:00 AM.',
  },
  {
    question: 'Is breakfast included?',
    answer: 'Yes, we offer a complimentary continental breakfast every morning from 7:30 AM to 10:00 AM.',
  },
  {
    question: 'Do you have lockers?',
    answer: 'Each dorm bed comes with a personal locker. Please bring your own padlock or purchase one at the reception.',
  },
  {
    question: 'How can I get to the hostel from the airport?',
    answer: 'The easiest way is to take the airport shuttle bus to the city center, and from there we are a 10-minute walk. You can also find directions on our map!',
  },
];
