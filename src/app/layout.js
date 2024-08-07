import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import { AppProvider } from "@/components/AppContext";
import { Toaster } from "react-hot-toast";

const roboto = Roboto({ subsets: ["latin"], weight: ['400','500','700'] });

export const metadata = {
  title: "Food App",
  description: "Developed by Atiq",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className="max-w-4xl mx-auto p-4">
        <AppProvider>
        <Toaster/>
        <Header/>
        {children}
        <footer className="border-t p-8 mt-16 text-center">
          &copy; 2024 All rights reserved.
        </footer>
        </AppProvider>
        </main>
      </body>
    </html>
  );
}
