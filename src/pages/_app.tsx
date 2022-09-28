import { useState } from 'react';
import type { AppProps } from 'next/app';
import type { DehydratedState } from '@tanstack/react-query';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { IS_DEV } from '../constants';
import '../styles/globals.css';

interface AppPropsWithDehydratedState extends AppProps {
  pageProps: {
    dehydratedState?: DehydratedState;
  };
}

function MyApp({ Component, pageProps }: AppPropsWithDehydratedState) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
        {IS_DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
