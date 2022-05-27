import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Navbar from '@/components/Navbar';
import '../importFontAwesome';
import Store, { persistor } from '../store/';
import Footer from '@/components/Footer';
import Notification from '@/components/Notification';
//@ts-ignore
import { PersistGate } from 'redux-persist/integration/react';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={Store}>
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
