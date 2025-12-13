'use server';
/**
 * @fileOverview AI Chatbot functionality for searching within a dataset to resolve user queries.
 *
 * - aiChatbotSearch - A function that handles the chatbot search process.
 * - AIChatbotSearchInput - The input type for the aiChatbotSearch function.
 * - AIChatbotSearchOutput - The return type for the aiChatbotSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatbotSearchInputSchema = z.object({
  query: z.string().describe('The user query to search for.'),
  dataset: z.string().describe('The dataset to search within. This could be a large string containing FAQs, documentation, etc.'),
});
export type AIChatbotSearchInput = z.infer<typeof AIChatbotSearchInputSchema>;

const AIChatbotSearchOutputSchema = z.object({
  searchResults: z.string().describe('The search results from the dataset that are relevant to the user query.'),
  response: z.string().describe('The chatbot response to the user query, incorporating the search results.'),
});
export type AIChatbotSearchOutput = z.infer<typeof AIChatbotSearchOutputSchema>;

export async function aiChatbotSearch(input: AIChatbotSearchInput): Promise<AIChatbotSearchOutput> {
  return aiChatbotSearchFlow(input);
}

const searchDataset = ai.defineTool({
  name: 'searchDataset',
  description: 'Searches a dataset for information relevant to the user query.',
  inputSchema: z.object({
    query: z.string().describe('The query to search for.'),
    dataset: z.string().describe('The dataset to search within.'),
  }),
  outputSchema: z.string().describe('The relevant search results from the dataset.'),
}, async (input) => {
  // This is a placeholder implementation.  In a real application, this would use a proper search algorithm.
  // against the dataset.  For example, it could use a vector database and embeddings, or a simple keyword search.
  // For this example, we'll just return the first 200 characters of the dataset.
  if (input.dataset.length > 200) {
    return input.dataset.substring(0, 200) + '...';
  } else {
    return input.dataset;
  }
});

const prompt = ai.definePrompt({
  name: 'aiChatbotSearchPrompt',
  input: {schema: AIChatbotSearchInputSchema},
  output: {schema: AIChatbotSearchOutputSchema},
  tools: [searchDataset],
  prompt: `You are a chatbot that can search a dataset for information to help answer user queries.

The user has the following query: {{{query}}}

Use the searchDataset tool to search the dataset for relevant information. The dataset is: {{{dataset}}}

Based on the search results, respond to the user query in a helpful and informative way.

Ensure the output.searchResults field contains the raw results of calling the searchDataset tool.
`,
});

const aiChatbotSearchFlow = ai.defineFlow(
  {
    name: 'aiChatbotSearchFlow',
    inputSchema: AIChatbotSearchInputSchema,
    outputSchema: AIChatbotSearchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
