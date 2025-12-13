import Image from "next/image";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card } from "@/components/ui/card";

export function HostelMap() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'map-placeholder');
  const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=hostel+in+nature";

  return (
    <section className="py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Find Your Way to Us</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            We're nestled in a beautiful location, easy to find and hard to leave.
          </p>
        </div>
        <Card className="overflow-hidden shadow-lg">
          <div className="relative h-64 md:h-96 w-full">
            {mapImage && (
              <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                fill
                className="object-cover"
                data-ai-hint={mapImage.imageHint}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-4 bg-background rounded-full shadow-2xl">
                <MapPin className="h-10 w-10 text-destructive animate-pulse" />
              </div>
            </div>
          </div>
          <div className="p-6 bg-muted/50 flex flex-col md:flex-row gap-4 justify-between items-center">
            <p className="font-semibold text-center md:text-left">
              Avenida Siempre Viva 742, Springfield
            </p>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              <Button>
                <Navigation className="mr-2 h-4 w-4" />
                Open in Google Maps
              </Button>
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
}
