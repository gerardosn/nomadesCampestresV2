"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Menu, MountainSnow, CircleUser } from 'lucide-react';
import AdminSidebar from './admin-sidebar';

export default function AdminHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-2 font-semibold">
        <Link href="/hostel-office" className="flex items-center gap-2">
            <MountainSnow className="h-6 w-6 text-primary" />
            <span className="font-bold">Hostel Office</span>
        </Link>
      </div>
      
      <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SheetTitle className="sr-only">Admin Navigation Menu</SheetTitle>
                <AdminSidebar isMobile />
            </SheetContent>
          </Sheet>
      </div>

      <div className="w-full flex-1">
        {/* Puedes agregar un buscador global aquí en el futuro */}
      </div>

      <Button variant="secondary" size="icon" className="rounded-full">
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </header>
  );
}
