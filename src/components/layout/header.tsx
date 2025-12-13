import Link from "next/link";
import { MountainSnow } from "lucide-react";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm bg-background/80 backdrop-blur-sm sticky top-0 z-30">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <MountainSnow className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold font-headline">Nómades Campestres</span>
      </Link>
    </header>
  );
}
