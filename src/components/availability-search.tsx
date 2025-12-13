"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Users, BedDouble, Moon } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function AvailabilitySearch() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const addDays = (d: Date, days: number) => {
    const newDate = new Date(d);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  };

  return (
    <section id="book" className="sticky top-16 z-20 bg-background/90 backdrop-blur-sm shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="space-y-2">
            <Label htmlFor="check-in">Check-in Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="check-in"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="nights">Nights</Label>
            <Select defaultValue="1">
              <SelectTrigger id="nights" className="font-normal">
                <Moon className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Nights" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(14).keys()].map((i) => (
                  <SelectItem key={i + 1} value={`${i + 1}`}>
                    {i + 1} night{i > 0 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="guests">Guests</Label>
            <Select defaultValue="1">
              <SelectTrigger id="guests" className="font-normal">
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Guests" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(8).keys()].map((i) => (
                  <SelectItem key={i + 1} value={`${i + 1}`}>
                    {i + 1} guest{i > 0 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Button variant="secondary" className="flex-1" onClick={() => setDate(new Date())}>Today</Button>
            <Button variant="secondary" className="flex-1" onClick={() => setDate(addDays(new Date(), 1))}>Tomorrow</Button>
          </div>
          <Button size="lg" className="w-full font-semibold text-base h-11">
            <BedDouble className="mr-2 h-5 w-5" />
            Find Beds
          </Button>
        </div>
      </div>
    </section>
  );
}
