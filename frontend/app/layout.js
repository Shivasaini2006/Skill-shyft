import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';

export const metadata = {
  title: 'SKILL SHIFT - Shift Your Potential',
  description: 'Modern tech community platform for developers, designers, and innovators',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-dark-bg">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
