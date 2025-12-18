'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MountainSnow, Home, BookMarked, Users, BedDouble } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/hostel-office', label: 'Inicio', icon: Home },
  { href: '/hostel-office/reservas', label: 'Reservas', icon: BookMarked },
  { href: '/hostel-office/usuarios', label: 'Usuarios', icon: Users },
  { href: '/hostel-office/habitaciones', label: 'Habitaciones', icon: BedDouble },
];

export default function AdminSidebar({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();

  const content = (
    <>
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/hostel-office" className="flex items-center gap-2 font-semibold">
          <MountainSnow className="h-6 w-6 text-primary" />
          <span className="">Nómades Campestres</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted',
                pathname === href && 'bg-muted text-primary'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t">
        <Link href="/" className="text-sm text-center w-full block hover:underline">
          Volver al sitio público
        </Link>
      </div>
    </>
  );

  if (isMobile) {
    return <div className="flex flex-col h-full">{content}</div>;
  }

  return (
    <div className="hidden border-r bg-background lg:block w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {content}
      </div>
    </div>
  );
}
