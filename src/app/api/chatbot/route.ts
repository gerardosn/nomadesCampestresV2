// app/api/chatbot/route.ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  category?: string;
  lang?: string;
};

type FaqJson = {
  faqs: FaqItem[];
};

/**
 * Utilidad para normalizar texto:
 * - pasa a minúsculas
 * - quita tildes
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Calcula un puntaje de coincidencia entre
 * el mensaje del usuario y las keywords de una FAQ.
 */
function scoreFaq(userMessage: string, faq: FaqItem): number {
  const normalizedMessage = normalizeText(userMessage);

  let score = 0;
  for (const kw of faq.keywords) {
    const normalizedKw = normalizeText(kw);

    // Coincidencia simple por inclusión
    if (normalizedMessage.includes(normalizedKw)) {
      // puedes ajustar el valor 1 a otro peso
      score += 1;
    }
  }

  // Bonus por coincidencia de palabras de la pregunta
  const questionWords = normalizeText(faq.question).split(/\s+/);
  for (const w of questionWords) {
    if (w.length > 3 && normalizedMessage.includes(w)) {
      score += 0.3; // peso menor para no dominar sobre keywords
    }
  }

  return score;
}

/**
 * Carga el JSON local de FAQs.
 * Ajusta la ruta base según dónde viva tu código.
 */
function loadFaqsFromFile(): FaqJson {
  // Si tu proyecto está en /home/user/studio,
  // esta ruta relativa parte del root del proyecto.
  // Ejemplo: process.cwd() -> /home/user/studio
  const filePath = path.join(
    process.cwd(),
    "src",
    "lib",
    "nosqlJsons",
    "FAQ.json"
  );

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent) as FaqJson;
  return data;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage = (body.message || "").toString().trim();

    if (!userMessage) {
      return NextResponse.json(
        {
          success: false,
          message: "Falta el campo 'message' en el cuerpo de la petición.",
        },
        { status: 400 }
      );
    }

    const faqsData = loadFaqsFromFile();

    if (!faqsData.faqs || !Array.isArray(faqsData.faqs)) {
      return NextResponse.json(
        {
          success: false,
          message: "El archivo FAQ.json no contiene un formato válido.",
        },
        { status: 500 }
      );
    }

    let bestFaq: FaqItem | null = null;
    let bestScore = 0;

    for (const faq of faqsData.faqs) {
      const s = scoreFaq(userMessage, faq);
      if (s > bestScore) {
        bestScore = s;
        bestFaq = faq;
      }
    }

    // Umbral mínimo de score para considerar que hay match
    const MIN_SCORE_THRESHOLD = 1;

    if (!bestFaq || bestScore < MIN_SCORE_THRESHOLD) {
      return NextResponse.json({
        success: true,
        match: null,
        answer:
          "Por ahora no tengo una respuesta específica para tu consulta en las FAQs. ¿Podés reformular o darme más detalles?",
      });
    }

    return NextResponse.json({
      success: true,
      score: bestScore,
      match: {
        id: bestFaq.id,
        question: bestFaq.question,
        answer: bestFaq.answer,
        category: bestFaq.category ?? null,
      },
      answer: bestFaq.answer,
    });
  } catch (error) {
    console.error("Error en /api/chatbot:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error interno en el servidor.",
      },
      { status: 500 }
    );
  }
}
