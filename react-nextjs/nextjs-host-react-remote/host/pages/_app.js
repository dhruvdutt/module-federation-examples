import '../styles/globals.css';
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
  <div>
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/transactions">Transactions</Link></li>
        <li><Link href="/transactions/a">Transactions A</Link></li>
        <li><Link href="/transactions/b">Transactions B</Link></li>
        <li><Link href="/web">Web</Link></li>
        <li><Link href="/web/a">Web A</Link></li>
        <li><Link href="/web/b">Web B</Link></li>
      </ul>
    </nav>
    <Component {...pageProps} />
  </div>
  
  );
}

export default MyApp;
