import { getRecentNews } from "./news";
import OpenAI from "openai";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // aus .env

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // wichtig für Vite!
});

export async function getInsightsForPortfolio(portfolio: string[]): Promise<string> {
  const news = await getRecentNews();

  const newsText = news
    .slice(0, 10)
    .map((n) => `• ${n.title} – ${n.description}`)
    .join("\n");

  const prompt = `
Hier ist das Depot eines Kunden: ${portfolio.join(", ")}.

Hier sind aktuelle Wirtschaftsnachrichten:

${newsText}

Welche dieser Nachrichten betreffen den Kunden und warum? Antworte in 2-3 Sätzen, einfach erklärt.
`;

  const chat = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return chat.choices[0].message?.content ?? "Keine Erkenntnisse.";
}
