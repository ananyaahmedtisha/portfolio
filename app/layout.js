import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Ananya Ahmed Tisha',
  description: 'Portfolio of Ananya Ahmed Tisha: microbiology research, Project FoodSense, 3D science animations, posters, art and photography.',
  robots: { index: true, follow: true },
};

const themeScript = `(function(){try{var t=localStorage.getItem('tisha-theme');if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-alice text-deepsea antialiased dark:bg-[#0A1828] dark:text-white">
        <Navbar />
        <main className="min-h-screen pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
