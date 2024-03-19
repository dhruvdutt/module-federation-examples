import React, { useEffect } from 'react'
import TestComponent from 'host/TestComponent'
import ShellRouter from 'host/ShellRouter'
import { Routes, Route, Link } from "react-router-dom";

function TransactionsContainer() {

  return (
      <div>
        ***********************************************Inside Federated TransactionsContainer***********************************************
        <ShellRouter>
        <ul>
                    <li>
                        <Link to="/transactions/a">Navigate - transactions Route A</Link>
                    </li>
                    <li>
                        <Link to="/transactions/b">Navigate - transactions Route B</Link>
                    </li>
                    <li>
                        <Link to="/transactions/c">Navigate - transactions Route C</Link>
                    </li>
                    <li>
                        <Link to="/web/a">Navigate - /web/a</Link>
                    </li>
                    {/* <li>
                        <CustomLink to="/web/a">Navigate - /web/a</CustomLink>
                    </li> */}
                </ul>
          <Routes>
            <Route path="/transactions/a" element={<h1>transactions Route A</h1>} />
            <Route path="/transactions/b" element={<h1>transactions Route B</h1>} />
            <Route path="/transactions*" element={<h1>transactions Route Root</h1>} />
            <Route path="*" element="transactions fallback****************************************************" />
          </Routes>
        </ShellRouter>
      </div>
  );
}

export default TransactionsContainer;