import { Header } from "@/components/layout/header";
import { Hero } from "@/components/hero";
import { AvailabilitySearch } from "@/components/availability-search";
import { RoomList } from "@/components/room-list";
import { HostelMap } from "@/components/hostel-map";
import { Footer } from "@/components/layout/footer";
import { Chatbot } from "@/components/chatbot";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <AvailabilitySearch />
        <div id="rooms">
          <RoomList />
        </div>
        <div id="map">
          <HostelMap />
        </div>
        <Chatbot />
      </main>
      <Footer />
    </div>
  );
}
