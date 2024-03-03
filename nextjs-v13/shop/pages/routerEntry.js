import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useRouter } from 'next/router'

export default function routerEntry() {
    const nextRouter = useRouter();
    console.log('@shop - nextjs router :', nextRouter);
    // Inform React Router

    // Map nextRouter.asPath with React Router Nav
    // Any change in Next Router ->
    // Change React Router

    // Any change in React Router -> Register to Next.js without re-rendering

    const FallbackComponent = (props) => {
        let location = useLocation();
        console.log('FallbackComponent', location);
        nextRouter.push(location.pathname);
        return <div>Fallback Component</div>
    }

    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/shop">Navigate - Shop Route Root</Link>
                    </li>
                    <li>
                        <Link to="/payout">Navigate - Payout Route Root</Link>
                    </li>
                    <li>
                        <Link to="/shop/a">Navigate - Shop Route A</Link>
                    </li>
                    <li>
                        <Link to="/shop/b">Navigate - Shop Route B</Link>
                    </li>
                    <li>
                        <Link to="/checkout/a">Navigate - Checkout Route A</Link>
                    </li>
                    <li>
                        <Link to="/checkout/b">Navigate - Checkout Route B</Link>
                    </li>
                </ul>

                <Routes>
                    <Route path="/shop/a" element={<h1>Shop Route A</h1>} />
                    <Route path="/shop/b" element={<h1>Shop Route B</h1>} />
                    <Route path="/shop*" element={<h1>Shop Route Root</h1>} />
                    <Route path="/payout*" element={<h1>Payout Route from Shop</h1>} />
                    <Route path="*" element={<FallbackComponent />} />
                </Routes>
            </div>
        </Router>
    );
}
