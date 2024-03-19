import React from "react";
// Passed as prop from shell
import { useRouter } from "next/router";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
const WebRemoteContainer = process.browser ? React.lazy(() => import('checkout/WebRemoteContainer')) : () => null;

export default function Page() {
    const [isClient, setIsClient] = React.useState(false)

    React.useEffect(() => {
        setIsClient(true)
    }, [])

  return <div>{isClient? <WebRemoteContainer />:null}</div>;
}
