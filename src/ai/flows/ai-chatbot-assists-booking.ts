'use server';
/**
 * @fileOverview AI chatbot flow to assist users with booking-related queries.
 *
 * - aiChatbotAssistsBooking - A function that handles the chatbot conversation and guides users towards booking.
 * - AIChatbotAssistsBookingInput - The input type for the aiChatbotAssistsBooking function.
 * - AIChatbotAssistsBookingOutput - The return type for the aiChatbotAssistsBooking function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotAssistsBookingInputSchema = z.object({
  query: z.string().describe('The user query about booking, availability, pricing, or room types.'),
});
export type AIChatbotAssistsBookingInput = z.infer<typeof AIChatbotAssistsBookingInputSchema>;

const AIChatbotAssistsBookingOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query, guiding them towards booking.'),
});
export type AIChatbotAssistsBookingOutput = z.infer<typeof AIChatbotAssistsBookingOutputSchema>;

export async function aiChatbotAssistsBooking(input: AIChatbotAssistsBookingInput): Promise<AIChatbotAssistsBookingOutput> {
  return aiChatbotAssistsBookingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatbotAssistsBookingPrompt',
  input: {schema: AIChatbotAssistsBookingInputSchema},
  output: {schema: AIChatbotAssistsBookingOutputSchema},
  prompt: `You are a helpful AI chatbot assisting users with their booking-related questions for a hostel.

  Your goal is to answer their queries about availability, pricing, and room types and guide them towards making a reservation.

  Here are some example FAQs:
  - What room types are available?
  - What is the price for a bed in a dorm?
  - How can I book a bed?

  User Query: {{{query}}}

  Response:`, // Keep response open-ended to let the LLM generate the appropriate answer.
});

const aiChatbotAssistsBookingFlow = ai.defineFlow(
  {
    name: 'aiChatbotAssistsBookingFlow',
    inputSchema: AIChatbotAssistsBookingInputSchema,
    outputSchema: AIChatbotAssistsBookingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
