import './globals.css';
import { StoreProvider } from '../store/StoreProvider';
import Header from '../components/Header';

export const metadata = {
  title: 'Product Manager',
  description: 'Next.js + Redux Toolkit product manager demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <div className="min-h-screen bg-bg">
             <Header />
            <main className="">{children}</main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
