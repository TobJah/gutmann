import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8f3ee] text-[#0d2f1d]">
      

      {/* Content */}
      <main className="p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Willkommen 👋</h2>
        <p className="text-md text-[#1e2b24] leading-relaxed">
          Diese Plattform bietet Ihnen zwei Kernfunktionen:
        </p>

        <ul className="list-disc list-inside mt-4 space-y-2">
          <li>
            <strong>Real-Time Insights:</strong> Verstehen Sie, wie aktuelle
            wirtschaftliche Ereignisse Ihr Portfolio beeinflussen.
          </li>
          <li>
            <strong>Kundennetzwerk:</strong> Visualisieren Sie die Verbindungen
            zwischen Kunden, Empfehlungen und Beziehungen.
          </li>
        </ul>

        <p className="mt-6 text-sm text-gray-600">
          Navigieren Sie über die Links oben, um zu den Funktionen zu gelangen.
        </p>
      </main>
    </div>
  );
}
