import Image from "next/image";
import { rooms } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export function RoomList() {
  const sortedRooms = [...rooms].sort((a, b) => a.pricePerNight - b.pricePerNight);

  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Our Accommodations</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from a variety of clean, comfortable, and affordable options.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sortedRooms.map((room) => {
            const roomImage = PlaceHolderImages.find(p => p.id === room.imagePlaceholderId);
            return (
              <Card key={room.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative h-56 w-full">
                    {roomImage && (
                      <Image
                        src={roomImage.imageUrl}
                        alt={room.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        data-ai-hint={roomImage.imageHint}
                      />
                    )}
                     {room.bedsAvailable <= 3 && (
                      <Badge variant="destructive" className="absolute top-3 right-3">
                        Only {room.bedsAvailable} left!
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <CardTitle className="font-headline text-2xl mb-2">{room.name}</CardTitle>
                  <CardDescription>{room.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 bg-muted/50 flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">${room.pricePerNight}<span className="text-sm font-normal text-muted-foreground">/night</span></p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Users className="w-4 h-4 mr-1.5" />
                      <span>{room.bedsAvailable} beds available</span>
                    </div>
                  </div>
                  <Button className="font-semibold">Reserve Now</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
