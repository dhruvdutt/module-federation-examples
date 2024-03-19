import React from "react";
import { useRouter } from "next/router";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

const BASENAME = "/web";

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
      reactRouterNavigate(nextRouter.asPath, {
        replace: true,
      });
    }
    debugger;
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
      nextRouter.replace(reactRouterPath);
    }
    debugger;
  }, [reactRouterLocation]);

  return children;
};

function ShellRouter({ children, ...props }) {
  return (
    <BrowserRouter>
      <ShellRouterSyncContainer>{children}</ShellRouterSyncContainer>
    </BrowserRouter>
  );
}

export default ShellRouter