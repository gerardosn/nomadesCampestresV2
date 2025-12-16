"use client";

import { useState, useRef, useEffect, useTransition } from 'react';
import { Bot, MessageSquare, Send, Loader2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { faqs } from '@/lib/data';
import { answerFAQ } from '@/ai/flows/ai-chatbot-answers-faqs';
import { Badge } from './ui/badge';
import Link from 'next/link';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  isLink?: boolean;
};

interface ChatbotProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function Chatbot({ isOpen, onOpenChange }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const [genkitUsageCount, setGenkitUsageCount] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollableViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollableViewport) {
        scrollableViewport.scrollTop = scrollableViewport.scrollHeight;
      }
    }
  }, [messages]);
  
  const handleSend = (question: string) => {
    if (!question.trim()) return;
  
    const userMessage: Message = { id: Date.now().toString(), text: question, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
  
    startTransition(async () => {
      const lowerCaseQuestion = question.toLowerCase();
      const operatorKeywords = ['operador', 'humano', 'persona', 'asistente', 'hablar con alguien'];
  
      if (operatorKeywords.some(keyword => lowerCaseQuestion.includes(keyword))) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Claro, puedes hablar con un operador a través de nuestro WhatsApp. Haz clic aquí para chatear.',
          sender: 'bot',
          isLink: true
        };
        setMessages(prev => [...prev, botMessage]);
        return;
      }

      const handleGenkitFallback = async (question: string) => {
        if (genkitUsageCount >= 3) {
          const limitMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: 'He alcanzado mi límite de consultas complejas. Para continuar, puedes hablar con un operador a través de nuestro WhatsApp. Haz clic aquí para chatear.',
            sender: 'bot',
            isLink: true
          };
          setMessages(prev => [...prev, limitMessage]);
          return null; // Indicates limit was reached
        }
        setGenkitUsageCount(prev => prev + 1);
        return await answerFAQ({ question });
      };

      let botAnswer = "Lo siento, no he podido encontrar una respuesta. Por favor, intenta reformular tu pregunta.";

      try {
        // 1. First, try to get an answer from the local FAQ API
        const apiRes = await fetch('/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: question }),
        });

        if (apiRes.ok) {
          const apiData = await apiRes.json();
          if (apiData.success && apiData.match) {
            botAnswer = apiData.answer;
          } else {
            // 2. If no match from API, fallback to Genkit
            try {
              const result = await handleGenkitFallback(question);
              if (result) {
                botAnswer = result.answer;
              } else {
                return; // Stop if limit was reached
              }
            } catch (aiError) {
              console.error("AI Fallback Error:", aiError);
              // Use the default error message if Genkit also fails
            }
          }
        }
      } catch (error) {
        console.error("Chatbot API Error:", error);
        // If the API call fails, try Genkit as a fallback
        try {
            const result = await handleGenkitFallback(question);
            if (result) {
              botAnswer = result.answer;
            } else {
              return; // Stop if limit was reached
            }
        } catch (aiError) {
            console.error("AI Fallback Error after API failure:", aiError);
        }
      }

      const botMessage: Message = { id: (Date.now() + 1).toString(), text: botAnswer, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSend(input);
  }

  const handleFaqClick = (question: string) => {
    handleSend(question);
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-40"
            aria-label="Abrir Chat"
          >
            <Bot className="h-8 w-8" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md p-0 flex flex-col" aria-describedby={undefined}>
          <SheetHeader className="p-4 border-b">
            <SheetTitle className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-headline">Preguntá lo que quieras (24/7)</p>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>

          <ScrollArea className="flex-1" ref={scrollAreaRef}>
            <div className="p-4 space-y-6">
              {messages.length === 0 && (
                <div className='p-4 rounded-lg bg-secondary/10'>
                  <div className='flex items-center gap-2 mb-3'>
                    <HelpCircle className='h-5 w-5 text-primary'/>
                    <h3 className='font-semibold'>Preguntas Frecuentes</h3>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {faqs.slice(0, 4).map(faq => (
                      <Badge 
                        key={faq.question}
                        variant="outline"
                        onClick={() => handleFaqClick(faq.question)}
                        className='cursor-pointer hover:bg-accent hover:text-accent-foreground text-left'
                      >
                        {faq.question}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {messages.map(message => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-3",
                    message.sender === 'user' && 'justify-end'
                  )}
                >
                  {message.sender === 'bot' && (
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-lg p-3 text-sm shadow-sm",
                      message.sender === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.isLink ? (
                      <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                        {message.text}
                      </a>
                    ) : (
                      <p className='whitespace-pre-wrap'>{message.text}</p>
                    )}
                  </div>
                </div>
              ))}
              {isPending && (
                 <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8 shrink-0">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3 flex items-center space-x-2 shadow-sm">
                        <Loader2 className="h-4 w-4 animate-spin"/>
                        <span className="text-sm text-muted-foreground">Pensando...</span>
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-background">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hacé tu pregunta..."
                className="flex-1"
                autoComplete='off'
                disabled={isPending}
              />
              <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Enviar</span>
              </Button>
            </form>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
