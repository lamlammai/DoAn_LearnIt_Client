import { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Skeleton } from "antd";
import { createBrowserHistory } from "history";
import PrivateRoute from "./Router/PrivateRouter";
// routes
import RoutePage from "./Router/Router";
import { getItem } from "./utils/storage";
import { AppProvider } from "./context/AppContext";
// others
export const history = createBrowserHistory();
/**
 * App change smt
 */
export default function App() {
  const user = getItem("user") ? JSON.parse(getItem("user")) : {};
  // console.log(user);
  return (
    <>
      <AppProvider>
        <Router>
          <Suspense fallback={<Skeleton />}>
            <Switch>
              {RoutePage.map((route) =>
                route.authen ? (
                  <PrivateRoute
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    rolesUser={user?.roles || []}
                    rolesRoute={route.roles}
                  />
                ) : (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                )
              )}
            </Switch>
          </Suspense>
        </Router>
      </AppProvider>
    </>
  );
}
