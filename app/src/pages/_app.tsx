import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { Inter } from 'next/font/google';
import "../globals.css"
import AudioProvider from '../components/AudioPlayerContext';
import store from '../store';

const inter = Inter({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <AudioProvider>
            <Component {...pageProps} />
        </AudioProvider>
    </Provider>
  );
}

export default MyApp;
