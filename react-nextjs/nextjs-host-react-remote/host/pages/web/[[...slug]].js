import React from "react";
// Passed as prop from shell
import ShellRouter from "../../components/ShellRouter";
import { Routes, Route, Link } from "react-router-dom";

// dynamically imported component, part of web codebase
function WebContainer() {
  return (
    <ShellRouter>
      <p>****Navigation inside web*****</p>
      <div>
        <ul>
          <li>
            <Link to="/web/a">Navigate - web Route A</Link>
          </li>
          <li>
            <Link to="/web/b">Navigate - web Route B</Link>
          </li>
          <li>
            <Link to="/transactions/a">Navigate - /transactions/a</Link>
          </li>
        </ul>

        <Routes>
          <Route path="/web/a" element={<h1>web Route A</h1>} />
          <Route path="/web/b" element={<h1>web Route B</h1>} />
          <Route path="/web*" element={<h1>web Route Root</h1>} />
          <Route
            path="*"
            element="web fallback****************************************************"
          />
        </Routes>
      </div>
    </ShellRouter>
  );
};



// const CustomLink = (props) => {
//     // Can't handle all

//     // Check all route patterns which microapps support
//     if (props.to.includes("transactions")) {
//         return (
//             <NextLink href={props.to}>{props.children}</NextLink>
//         )
//     }

//     return <Link to={props.to}>{props.children}</Link>;
// }

// ---------------SHELL------------------------------

// const BASENAME = "/web";

// const ShellRouterSyncContainer = ({ children }) => {
//   const nextRouter = useRouter();
//   let reactRouterLocation = useLocation();
//   let reactRouterNavigate = useNavigate();

//   console.log("Web ShellRouter", reactRouterLocation);

//   // Next Router -> React Router
//   React.useEffect(() => {
//     const reactRouterPath = BASENAME + reactRouterLocation.pathname;
//     if (nextRouter.asPath !== reactRouterPath) {
//       console.log(
//         "@Web Next -> React Router",
//         reactRouterLocation,
//         reactRouterPath
//       );
//       debugger;
//       reactRouterNavigate(nextRouter.asPath, {
//         replace: true,
//       });
//     }
//   }, [nextRouter.asPath]);

//   // React Router -> Next Router
//   React.useEffect(() => {
//     const reactRouterPath = BASENAME + reactRouterLocation.pathname;
//     if (nextRouter.asPath !== reactRouterLocation.pathname) {
//       console.log(
//         "@Web React Router -> Next",
//         reactRouterLocation,
//         reactRouterPath
//       );
//       debugger;
//       nextRouter.replace(reactRouterPath);
//     }
//   }, [reactRouterLocation]);

//   return children;
// };

// const ShellRouter = ({ children, ...props }) => {
//   return (
//     <BrowserRouter>
//       <ShellRouterSyncContainer>{children}</ShellRouterSyncContainer>
//     </BrowserRouter>
//   );
// };

export default function Page() {
  return (
  <div>
    <WebContainer />
  </div>
  );
}
