import axios from "axios";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY; // aus .env

export async function getRecentNews(): Promise<{ title: string; description: string }[]> {
  const response = await axios.get("https://newsapi.org/v2/everything", {
    params: {
      q: "wirtschaft OR börse OR aktien OR aktie OR politik OR unternehmen OR unternehmer",
      from: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      language: "de",
      sortBy: "publishedAt",
      pageSize: 25,
      apiKey: NEWS_API_KEY,
    },
  });

  return response.data.articles.map((a: any) => ({
    title: a.title,
    description: a.description,
  }));
}
