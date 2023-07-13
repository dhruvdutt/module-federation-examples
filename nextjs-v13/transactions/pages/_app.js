// import dynamic from 'next/dynamic';
// const page = import('../realPages/_app');
// const AppPage = dynamic(() => import('../realPages/_app'));
// const Page = props => {
//   return <AppPage {...props} />;
// };
// Page.getInitialProps = async ctx => {
//   const getInitialProps = (await page).default?.getInitialProps;
//   if (getInitialProps) {
//     return getInitialProps(ctx);
//   }
// };
// export default Page;

import { useEffect, useState } from 'react';

function App({ Component, pageProps }) {
  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, []);
  if (isServer) return null;

  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
    </div>
  );
}
export default App;