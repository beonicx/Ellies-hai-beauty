import "../styles/globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  metadataBase: new URL("https://ellieshairbeauty.com"),
  title: "Ellie's Hair & Beauty | Premium Salon Experience",
  description:
    "Ellie's Hair & Beauty — your destination for luxurious hair, skin, makeup, nail and spa services. Book an appointment today.",
  openGraph: {
    title: "Ellie's Hair & Beauty",
    description: "Premium salon services tailored to you.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-cream">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
