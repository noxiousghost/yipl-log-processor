// /src/app/layout.js

import NavBar from "./components/NavBar";
import "./globals.css";

export const metadata = {
  title: "Event Management App",
  description: "Manage your events effortlessly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <NavBar />
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
