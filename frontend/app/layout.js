import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'SKILL SHIFT - Shift Your Potential',
  description: 'Premium SaaS-style tech community platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

