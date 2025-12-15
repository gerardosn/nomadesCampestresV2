"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Copy, Bus, Coffee, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function HostelMap() {
  const address = "Avenida Siempre Viva 742, Springfield";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'; 
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(address).then(() => {
      toast({
        title: "Copiado!",
        description: "La dirección ha sido copiada al portapapeles.",
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo copiar la dirección.",
      });
    });
  }

  return (
    <section id="map" className="py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Dónde estamos</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Ubicación perfecta para explorar la zona
          </p>
        </div>
        <Card className="overflow-hidden shadow-lg">
          <div className="relative h-96 w-full bg-muted">
             <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(address)}`}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>
          <CardContent className="p-6 md:p-8 space-y-8">
            <div className="text-center">
              <p className="text-2xl font-bold font-headline">{address}</p>
              <p className="text-muted-foreground mt-2">
                Barrio tranquilo, a pasos del centro
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center gap-2">
                <MapPin className="h-7 w-7 text-primary" />
                <p className="font-semibold">A 5 min del centro</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Bus className="h-7 w-7 text-primary" />
                <p className="font-semibold">Parada de bus a 200 m</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Coffee className="h-7 w-7 text-primary" />
                <p className="font-semibold">Cafés y restaurantes</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Shield className="h-7 w-7 text-primary" />
                <p className="font-semibold">Zona segura</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4 border-t">
               <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  <Navigation className="mr-2" />
                  Abrir en Google Maps
                </Button>
               </a>
               <Button size="lg" variant="outline" onClick={handleCopy} className="w-full sm:w-auto">
                 <Copy className="mr-2" />
                 Copiar dirección
               </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
