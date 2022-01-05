import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

//Pages
import LoginPage from "./app/features/Login";
import HomePage from "./app/features/HomePage";
import Profile from "./app/features/Profile";
import MenuPage from "./app/features/MenuPage";
import UserPage from "./app/features/User/UserPage";
import "./scss/App.scss";
import configuration from "./configuration";

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import CartPage from "./app/features/CartPage/cartPage";
import Payment from "./app/base/Payment/payment";

function App() {
  const reducerToken = useSelector((state) => state.getToken.token);

  useEffect(() => {
    if (
      configuration.ApiRequestToken === "" ||
      !configuration.ApiRequestToken
    ) {
      if (reducerToken !== "") {
        configuration.ApiRequestToken = reducerToken;
      }
    }
  }, [configuration]);

  const PublicRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          reducerToken === "" ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    );
  };

  const PrivateRoute = ({ component: Component,...rest }) => {
    if (reducerToken === "") {
      return (
        <Route
          {...rest}
          render={(props) => (
            <Redirect
              to={{
                pathname:`/login`,
                state: { from: props.location },
                search: props.location.search
              }}
            />
          )}
        />
      );
    } else {
      return <Route {...rest} render={(props) => <Component {...props} />} />;
    }
  };

  return (
    <BrowserRouter>
      <ReactNotification />
      <Switch>
        <Route path="/" component={HomePage} exact />
        <PublicRoute path="/login" component={LoginPage} />;
        <PublicRoute path="/register" component={LoginPage} />
        <PublicRoute path="/forgot_password" component={LoginPage} />
        <PublicRoute path="/reset/:token" component={LoginPage} />

        <PrivateRoute
          path={["/user", "/user/:type2", "/user/:type2/profile"]}
          component={UserPage}
        />

        <Route path="/profile" component={Profile} />
        <Route
          path="/categories/:categoryId"
          render={(props) => <MenuPage {...props} type="Menu List" />}
        />
        <Route
          path="/categories"
          render={(props) => <MenuPage {...props} type="Menu List" />}
        />
        <Route path="/checkout" render={() => <MenuPage type="Checkout" />} />
        <Route path='/cart/payment/:id/:isPaid' component={Payment} />
        <Route path="/cart" component={CartPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
