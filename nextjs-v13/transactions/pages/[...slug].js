import dynamic from 'next/dynamic';
const page = import('../realPages/[...slug]');
const Page = dynamic(() => import('../realPages/[...slug]'));
Page.getInitialProps = async ctx => {
  const getInitialProps = (await page).default?.getInitialProps;
  if (getInitialProps) {
    return getInitialProps(ctx);
  }
  return {};
};
export default Page;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// // import NextLink from 'next/link';

// export default function App() {
//   return (
//     <Router>
//       <div>
//         <ul>
//           <li>
//             <Link to="/transactions/a">Transactions React Router 6 - A</Link>
//           </li>
//           <li>
//             <Link to="/transactions/b">Transactions React Router 6 - B</Link>
//           </li>
//         </ul>

//         {/* <Switch>
//           <Route path="/home">
//             <h1>React Router 4 - Home</h1>
//           </Route>
//           <Route path="/">
//             <h1>React Router 4 - Index</h1>
//           </Route>
//         </Switch> */}

//         <Routes>
//           <Route path="/transactions/a" element={<h1>React Router 6 [Transactions] - A</h1>} />
//           <Route path="/transactions/b" element={<h1>React Router 6 [Transactions] - B</h1>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }