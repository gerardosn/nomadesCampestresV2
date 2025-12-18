import type { Metadata } from 'next';
import AdminHeader from '@/components/admin/admin-header';
import AdminSidebar from '@/components/admin/admin-sidebar';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Hostel Office - Nómades Campestres',
  description: 'Admin panel for Nómades Campestres.',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-muted/40">
        <div className="flex min-h-screen w-full">
          <AdminSidebar />
          <div className="flex flex-col flex-1">
            <AdminHeader />
            <main className="flex-1 p-4 sm:p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
