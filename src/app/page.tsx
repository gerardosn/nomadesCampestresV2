"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/hero";
import { AvailabilitySearch } from "@/components/availability-search";
import { RoomList } from "@/components/room-list";
import { HostelMap } from "@/components/hostel-map";
import { Footer } from "@/components/layout/footer";
import { Chatbot } from "@/components/chatbot";
import { Facilities } from "@/components/facilities";

export default function Home() {
  const [isChatbotOpen, setChatbotOpen] = useState(false);

  const handleOpenChatbot = () => {
    setChatbotOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <AvailabilitySearch />
        <div id="rooms">
          <RoomList />
        </div>
        <Facilities />
        <div id="map">
          <HostelMap />
        </div>
        <Chatbot isOpen={isChatbotOpen} onOpenChange={setChatbotOpen} />
      </main>
      <Footer onFaqClick={handleOpenChatbot} />
    </div>
  );
}
