import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./containers/Layout/Layout";
import HomePage from "./containers/HomePage/HomePage";
import CafeList from "./containers/CafeList/CafeList";
import AddCafePage from "./containers/AddCafePage/AddCafePage";

const CustomRoute = (props) => {
  const user = useSelector((state) => state.user.user);
  if (user?.token) {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
};

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route
          path="/cafe-list"
          exact
          component={CafeList}
        />
        <CustomRoute
          path="/add-cafe"
          exact
          component={AddCafePage}
        />
        <Redirect to="/" />
      </Switch>
    </Layout>
  );
};

export default App;
