import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import axios from "axios";

console.log("✅ [API] /api/insights gestartet");
console.log("🔐 OPENAI_API_KEY vorhanden:", !!process.env.OPENAI_API_KEY);
console.log("🔐 FINNHUB_API_KEY vorhanden:", !!process.env.FINNHUB_API_KEY);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { portfolio } = await req.json();
    console.log("📦 Portfolio empfangen:", portfolio);

    // Berechne das Startdatum (3 Tage zurück)
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    // Hole aktuelle News von Finnhub
    const newsRes = await axios.get("https://finnhub.io/api/v1/news", {
      params: {
        category: "general", // Alternativ: "forex", "crypto", etc.
        token: process.env.FINNHUB_API_KEY,
      },
    });

    // Filtere News der letzten 3 Tage
    const news = newsRes.data.filter((item: any) => {
      const publishedDate = new Date(item.datetime * 1000);
      return publishedDate >= new Date(threeDaysAgo);
    });

    console.log(`📰 ${news.length} Newsartikel von Finnhub (seit ${threeDaysAgo}) geladen`);

    const newsText = news
      .map((n: any) => `• ${n.headline} – ${n.summary || ""}`)
      .join("\n");

    const prompt = `
Hier ist das Depot eines Kunden: ${portfolio.join(", ")}.

Hier sind aktuelle Wirtschaftsnachrichten:

${newsText}

Welche dieser Nachrichten betreffen dieses Depot direkt oder indirekt? Gib eine einfache, deutsche Zusammenfassung in 5 Sätzen.
`;

    console.log("✉️ Prompt an GPT (gekürzt):", prompt.slice(0, 400), "...");

    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Oder "gpt-4"
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const answer = chat.choices[0].message?.content ?? "Keine Einschätzung verfügbar.";
    console.log("🤖 GPT Antwort erhalten:", answer);

    return NextResponse.json({
      insight: answer,
      usedNews: news.map((n: any) => ({
        title: n.headline,
        source: n.source,
        datetime: new Date(n.datetime * 1000).toLocaleString(),
      })),
    });
  } catch (err: any) {
    console.error("❌ Fehler in /api/insights:", err);
    return NextResponse.json(
      {
        error: "Interner Serverfehler",
        detail: err?.message ?? "Unbekannter Fehler",
      },
      { status: 500 }
    );
  }
}
