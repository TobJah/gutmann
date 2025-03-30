"use client";

import React, { useEffect, useState } from "react";

export default function InsightsPage() {
  const [insight, setInsight] = useState<string | null>(null);
  const [usedNews, setUsedNews] = useState<{ title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const portfolio = ["Apple", "Tesla", "Allianz"];

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await fetch("/api/insights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ portfolio }),
        });

        if (!res.ok) throw new Error("Fehler beim Abrufen der Insights");

        const data = await res.json();
        setInsight(data.insight);
        setUsedNews(data.usedNews);
      } catch (err: any) {
        setError(err.message || "Unbekannter Fehler");
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f3ee] text-[#0d2f1d] p-8">
      <h1 className="text-2xl font-bold mb-4">Real-Time Insights</h1>

      <div className="mb-6 bg-white p-4 rounded shadow max-w-3xl">
        <h2 className="font-semibold text-lg mb-2">Ihr Portfolio:</h2>
        <ul className="list-disc list-inside text-sm">
          {portfolio.map((stock) => (
            <li key={stock}>{stock}</li>
          ))}
        </ul>
      </div>

      {loading && <p className="text-sm">Lade aktuelle Einschätzung...</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}

      {insight && (
        <div className="bg-white p-4 rounded shadow mb-6 max-w-3xl">
          <h2 className="font-semibold text-lg mb-2">GPT-Einschätzung:</h2>
          <p className="whitespace-pre-line text-sm">{insight}</p>
        </div>
      )}

      {usedNews.length > 0 && (
        <div className="max-w-3xl">
          <h2 className="font-semibold text-lg mb-2">Berücksichtigte News:</h2>
          <ul className="list-disc list-inside text-sm space-y-1">
            {usedNews.map((n, i) => (
              <li key={i}>{n.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
