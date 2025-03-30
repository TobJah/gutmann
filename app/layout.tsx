import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Privatbank Demo",
  description: "Mockup-Anwendung",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-[#f8f3ee] text-[#0d2f1d]">
        <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-bold text-[#0d2f1d]">Privatbank Demo</h1>
          <nav className="space-x-6 text-sm">
            <Link href="/insights" className="text-[#0d2f1d] hover:text-green-800">
              Real-Time Insights
            </Link>
            <Link href="/network" className="text-[#0d2f1d] hover:text-green-800">
              Kundennetzwerk
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
