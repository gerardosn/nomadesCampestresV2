"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MountainSnow } from "lucide-react";

const navItems = [
    { label: "Inicio", href: "#" },
    { label: "Reservar", href: "#book" },
    { label: "Habitaciones", href: "#rooms" },
    { label: "Ubicación", href: "#map" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href === "#") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-30 transition-all duration-300 ease-in-out",
          scrolled ? "bg-background/90 shadow-md backdrop-blur-sm" : "bg-transparent",
        )}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="#" onClick={() => handleNavClick('#')} className="flex items-center gap-2" prefetch={false}>
            <MountainSnow className={cn("h-7 w-7 transition-colors", scrolled ? "text-primary" : "text-white")} />
            <span className={cn("text-xl font-bold transition-colors", scrolled ? "text-foreground" : "text-white")}>
              Nómades Campestres
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "font-semibold",
                  scrolled ? "text-foreground hover:bg-muted" : "text-primary-foreground/90 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                )}
              >
                {item.label}
              </Button>
            ))}
          </nav>
          
          <div className="md:hidden">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setMenuOpen(!menuOpen)}
              className={cn(!scrolled && "text-white hover:bg-white/10 hover:text-white")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Toggle menu</span>
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div 
            id="mobile-menu"
            className="fixed inset-0 top-16 z-20 bg-background/80 backdrop-blur-lg md:hidden"
            onClick={() => setMenuOpen(false)}
        >
          <nav className="flex flex-col items-start p-4 bg-background shadow-lg" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                onClick={() => handleNavClick(item.href)}
                className="w-full justify-start py-4 text-lg"
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
