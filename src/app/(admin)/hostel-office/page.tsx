import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BookMarked, Users, BedDouble, LogIn, LogOut, Moon, Sun } from 'lucide-react';
import { getDailyMovements } from './actions';
import { Badge } from '@/components/ui/badge';


export default async function HostelOfficePage() {
  const welcomeImage = PlaceHolderImages.find(p => p.id === 'admin-welcome');
  const { checkIns, checkOuts } = await getDailyMovements();


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
      
      <div className="flex flex-col md:flex-row gap-6">
        {adminSections.map((section) => (
          <Link href={section.href} key={section.title} className="flex-1">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogIn className="text-green-600" />
              Check-ins para Hoy
            </CardTitle>
            <CardDescription>
              Huéspedes que llegan hoy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {checkIns.length > 0 ? (
              <ul className="space-y-3">
                {checkIns.map(reserva => (
                  <li key={reserva.id} className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                    <div className="font-medium">
                      <Link href={`/hostel-office/huespedes?showId=${reserva.userId}`} className="hover:underline text-primary">
                        ID Huésped: {reserva.userId}
                      </Link>
                      <p className="text-sm text-muted-foreground">Habitación: {reserva.roomId}</p>
                    </div>
                    <div className="text-right">
                       <Badge variant="outline" className="flex items-center gap-1.5">
                         <Moon className="h-3 w-3"/>
                         {reserva.nights} noches
                       </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">No hay check-ins programados para hoy.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LogOut className="text-red-600" />
              Check-outs para Hoy
            </CardTitle>
            <CardDescription>
              Huéspedes que se retiran hoy.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {checkOuts.length > 0 ? (
              <ul className="space-y-3">
                {checkOuts.map(reserva => (
                  <li key={reserva.id} className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                     <div className="font-medium">
                      <Link href={`/hostel-office/huespedes?showId=${reserva.userId}`} className="hover:underline text-primary">
                        ID Huésped: {reserva.userId}
                      </Link>
                      <p className="text-sm text-muted-foreground">Habitación: {reserva.roomId}</p>
                    </div>
                    <div className="text-right">
                       <Badge variant="outline" className="flex items-center gap-1.5">
                         <Sun className="h-3 w-3"/>
                         {reserva.checkInDate}
                       </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-center py-4">No hay check-outs programados para hoy.</p>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
