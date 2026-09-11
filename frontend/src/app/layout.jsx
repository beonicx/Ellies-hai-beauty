import "../styles/globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  metadataBase: new URL("https://habibsalonacademy.com"),
  title: "Habib Salon & Academy | Premium Salon Experience",
  description:
    "Habib Salon & Academy — your destination for luxurious hair, skin, makeup, nail and spa services. Book an appointment today.",
  openGraph: {
    title: "Habib Salon & Academy",
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
