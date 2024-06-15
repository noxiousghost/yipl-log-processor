import NavBar from "../components/NavBar";
import "./globals.css";
import { AuthProvider } from "@/utils/AuthContext";
export const metadata = {
  title: "Event Management App",
  description: "Manage your events effortlessly",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className="bg-gray-100 text-gray-900">
          <NavBar />
          <main className="relative overflow-y-auto p-4 md:px-10 py-10 h-full text-black">
            {children}
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
