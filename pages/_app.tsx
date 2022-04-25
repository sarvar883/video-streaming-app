import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from '../globalState/store';

import ProgressBar from '@/components/ProgressBar';

// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content='My NextJS App' />
        <title>Video Streaming App </title>
      </Head>

      <ProgressBar />

      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;