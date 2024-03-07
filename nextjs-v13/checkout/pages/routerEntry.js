import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

const CustomRouterWrapper = ({ children, nextRouter }) => {
    let location = useLocation();
    
    useEffect(() => {
        console.log('CustomRouterWrapper', location);
        nextRouter.push(location.pathname);
    }, [location]);

    return children;
}

export default function routerEntry({ nextRouter }) {
    console.log('@remote module - nextjs router :', nextRouter);

    // const FallbackComponent = (props) => {
    //     let location = useLocation();
    //     console.log('FallbackComponent', location);
    //     nextRouter.push(location.pathname);
    //     return <div>Fallback Component</div>
    // } 


    return (
        <Router>
            <CustomRouterWrapper nextRouter={nextRouter}>
                <div>
                    <ul>
                        <li>
                            React Router Naviation
                        </li>
                        <li>
                            <Link to="/remotemodule/a">Navigate - Checkout Route A</Link>
                        </li>
                        <li>
                            <Link to="/remotemodule/b">Navigate - Checkout Route B</Link>
                        </li>
                    </ul>

                    <Routes>
                        <Route path="/remotemodule/a" element={<h1>Remote Module A</h1>} />
                        <Route path="/remotemodule/b" element={<h1>Remote Module B</h1>} />
                        <Route path="/remotemodule/*" element={<h1>Remote Module Root</h1>} />
                    </Routes>
                </div>
            </CustomRouterWrapper>
        </Router>
    );
}
