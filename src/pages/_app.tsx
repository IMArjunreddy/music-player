import React from 'react';
import { AppProps } from 'next/app';
import '../styles/index.css';
import 'react-h5-audio-player/lib/styles.css';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
