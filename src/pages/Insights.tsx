import React, { useEffect, useState } from "react";
import { getInsightsForPortfolio } from "../api/insights";
import { getRecentNews } from "../api/news";

export default function InsightsPage() {
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usedNews, setUsedNews] = useState<{ title: string }[]>([]);

  // ✅ Portfolio des Kunden (hardcoded für Demo)
  const portfolio = ["Apple", "Tesla", "Microsoft", "Meta"];

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      setError(null);
      try {
        const news = await getRecentNews();
        setUsedNews(news.slice(0, 10)); // Nur die wichtigsten Headlines
        const result = await getInsightsForPortfolio(portfolio);
        setInsight(result || "Keine relevanten Informationen gefunden.");
      } catch (err: any) {
        setError(err.message || "Fehler beim Abrufen");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f3ee] p-8">
      <h2 className="text-2xl font-bold text-[#0d2f1d] mb-4">
        Wirtschaftliche Einflüsse auf Ihr Portfolio
      </h2>

      {/* 🟩 Portfolio-Anzeige */}
      <div className="mb-6 bg-white p-4 rounded shadow max-w-3xl text-[#0d2f1d]">
        <h3 className="font-semibold text-lg mb-2">Ihr Portfolio:</h3>
        <ul className="list-disc list-inside text-sm space-y-1">
          {portfolio.map((stock, i) => (
            <li key={i}>{stock}</li>
          ))}
        </ul>
      </div>

      {/* 🧠 GPT-Antwort */}
      {loading && <p>Lade aktuelle Ereignisse...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {insight && (
        <div className="bg-white p-4 rounded shadow max-w-3xl text-[#0d2f1d] mb-6">
          <h3 className="font-semibold text-lg mb-2">GPT-Einschätzung:</h3>
          <p className="whitespace-pre-line">{insight}</p>
        </div>
      )}

      {/* 📰 Verwendete News */}
      {usedNews.length > 0 && (
        <div className="max-w-3xl">
          <h3 className="text-lg font-semibold mb-2 text-[#0d2f1d]">
            Berücksichtigte Nachrichten:
          </h3>
          <ul className="list-disc list-inside text-[#0d2f1d] text-sm space-y-1">
            {usedNews.map((n, i) => (
              <li key={i}>{n.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
