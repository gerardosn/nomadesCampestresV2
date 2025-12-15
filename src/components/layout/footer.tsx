import { MountainSnow, Twitter, Instagram, Facebook } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <Link href="#" className="flex items-center mb-4" prefetch={false}>
              <MountainSnow className="h-8 w-8" />
              <span className="ml-2 text-2xl font-bold font-headline">Nómades Campestres</span>
            </Link>
            <p className="max-w-xs text-sm">
              Your home away from home, surrounded by nature's beauty.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3 font-headline">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#book" className="hover:underline">Booking</a></li>
                <li><a href="#rooms" className="hover:underline">Rooms</a></li>
                <li><a href="#map" className="hover:underline">Location</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 font-headline">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:underline" prefetch={false}>Contact Us</Link></li>
                <li><Link href="#" className="hover:underline" prefetch={false}>FAQs</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <h4 className="font-semibold mb-3 font-headline">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" prefetch={false}><Facebook className="h-6 w-6 hover:opacity-80 transition-opacity" /></Link>
              <Link href="#" aria-label="Instagram" prefetch={false}><Instagram className="h-6 w-6 hover:opacity-80 transition-opacity" /></Link>
              <Link href="#" aria-label="Twitter" prefetch={false}><Twitter className="h-6 w-6 hover:opacity-80 transition-opacity" /></Link>
            </div>
          </div>
        </div>
        <div className="border-t border-secondary-foreground/20 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Nómades Campestres. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
