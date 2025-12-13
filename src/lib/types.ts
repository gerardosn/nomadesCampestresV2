export type Room = {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  bedsAvailable: number;
  imagePlaceholderId: string;
};

export type FAQ = {
  question: string;
  answer: string;
};
