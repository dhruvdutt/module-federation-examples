import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useRouter } from 'next/router'

export default function routerEntry() {
    const nextRouter = useRouter();
    console.log('@checkout - nextjs router :', nextRouter);

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
                        <Link to="/checkout/a">Navigate - Checkout Route A</Link>
                    </li>
                    <li>
                        <Link to="/checkout/b">Navigate - Checkout Route B</Link>
                    </li>
                    <li>
                        <Link to="/shop/a">Navigate - Shop Route A</Link>
                    </li>
                    <li>
                        <Link to="/shop/b">Navigate - Shop Route B</Link>
                    </li>
                </ul>

                <Routes>
                    <Route path="/checkout/a" element={<h1>Checkout Route A</h1>} />
                    <Route path="/checkout/b" element={<h1>Checkout Route B</h1>} />
                    <Route path="/checkout*" element={<h1>Checkout Route Root</h1>} />
                    <Route path="*" element={<FallbackComponent />} />
                </Routes>
            </div>
        </Router>
    );
}
