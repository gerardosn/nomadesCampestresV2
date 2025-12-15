"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white overflow-hidden">
      <video
        src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 p-4 flex flex-col items-center">
        <div className="bg-black/30 backdrop-blur-sm p-6 md:p-10 rounded-lg shadow-2xl">
          <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter">
            Your Tranquil Escape
          </h1>
          <p className="max-w-xl mt-4 text-lg md:text-xl text-primary-foreground/90">
            Discover the perfect blend of nature and comfort at Nómades Campestres. An unforgettable adventure awaits.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="font-semibold" asChild>
              <a href="#book">Reserve Now</a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-primary font-semibold">
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Video
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}