import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BookMarked, Users, BedDouble } from 'lucide-react';

export default function HostelOfficePage() {
  const welcomeImage = PlaceHolderImages.find(p => p.id === 'admin-welcome');

  const adminSections = [
    {
      title: 'Reservas',
      description: 'Gestionar reservas de huéspedes.',
      href: '/hostel-office/reservas',
      icon: <BookMarked className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Huéspedes',
      description: 'Administrar perfiles de huéspedes.',
      href: '/hostel-office/huespedes',
      icon: <Users className="w-6 h-6 text-primary" />,
    },
    {
      title: 'Habitaciones',
      description: 'Configurar habitaciones y camas.',
      href: '/hostel-office/habitaciones',
      icon: <BedDouble className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg">
        {welcomeImage && (
          <Image
            src={welcomeImage.imageUrl}
            alt="Hostel Office Welcome"
            fill
            className="object-cover"
            data-ai-hint={welcomeImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-4xl font-bold text-white">Bienvenido a Hostel Office</h1>
          <p className="text-lg text-white/90 mt-2">Tu centro de control para Nómades Campestres.</p>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adminSections.map((section) => (
          <Link href={section.href} key={section.title}>
            <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  {section.icon}
                </div>
                <div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
