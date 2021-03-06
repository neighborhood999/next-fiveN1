import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as smoothscroll from 'smoothscroll-polyfill';

import { pageView } from '../utils';

function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    function handleRouteChange(url) {
      pageView(url);
    }

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
