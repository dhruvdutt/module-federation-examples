import React from 'react'
import { useRouter } from "next/router";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const TransactionsContainer =
  typeof window !== "undefined"
    ? React.lazy(() => import("remote/TransactionsContainer"))
    : () => null;

const ShellRouterSyncContainer = ({ children }) => {
  const nextRouter = useRouter();
  let reactRouterLocation = useLocation();
  let reactRouterNavigate = useNavigate();


  // Next Router -> React Router
  React.useEffect(() => {
    const reactRouterPath = reactRouterLocation.pathname;
    if (nextRouter.asPath !== reactRouterPath) {
      console.log(
        "@Web Next -> React Router",
        reactRouterLocation,
        reactRouterPath
      );
      debugger;
      reactRouterNavigate(nextRouter.asPath, {
        replace: true,
      });
    }
  }, [nextRouter.asPath]);

  // React Router -> Next Router
  React.useEffect(() => {
    const reactRouterPath = reactRouterLocation.pathname;
    if (nextRouter.asPath !== reactRouterLocation.pathname) {
      console.log(
        "@Web React Router -> Next",
        reactRouterLocation,
        reactRouterPath
      );
      debugger;
      nextRouter.replace(reactRouterPath);
    }
  }, [reactRouterLocation]);

  return children;
};
    
const ShellRouter = ({ children, ...props }) => {
  return (
    <BrowserRouter>
      <ShellRouterSyncContainer>{children}</ShellRouterSyncContainer>
    </BrowserRouter>
  );
};
    
export default function Page() {
  const [isClient, setIsClient] = React.useState(false)

  React.useEffect(() => {
      setIsClient(true)
  },[]);

  return (
    <div>
        {isClient
        ? <TransactionsContainer />
        : null }
    </div>
  );
}
