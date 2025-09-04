import './globals.css';
import { Inter } from 'next/font/google';
import BrandHeader from '@/components/BrandHeader';

export const metadata = {
  title: 'Wise Energy — Solar ROI Simulator',
  icons: { icon: '/logo.png' },
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen text-slate-900`}>
        <BrandHeader />
        <main className="mx-auto max-w-6xl p-6 pt-[104px]">{children}</main>
      </body>
    </html>
  );
}
