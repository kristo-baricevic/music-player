import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import './globals.css';
import AudioProvider from '@/app/src/components/AudioPlayerContext';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AudioProvider>
          <Component {...pageProps} />
        </AudioProvider>
      </body>
    </html>
  );
}

export default MyApp;
