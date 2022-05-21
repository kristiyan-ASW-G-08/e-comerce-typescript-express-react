import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '../importFontAwesome';
import Store from '../store/store';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={Store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
