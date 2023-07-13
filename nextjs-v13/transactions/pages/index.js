// import dynamic from 'next/dynamic';
// const page = import('../realPages/index');

// const Page = dynamic(() => import('../realPages/index'));
// Page.getInitialProps = async ctx => {
//   const getInitialProps = (await page).default?.getInitialProps;
//   if (getInitialProps) {
//     return getInitialProps(ctx);
//   }
//   return {};
// };
// export default Page;

import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import NextLink from 'next/link';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/transactions/a">Transactions React Router 4 - A</Link>
          </li>
          <li>
            <Link to="/transactions/b">Transactions React Router 4 - B</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/transactions/a">
            <h1>React Router 4 [Transactions] - A</h1>
          </Route>
          <Route path="/transactions/b">
            <h1>React Router 4 [Transactions] - B</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}