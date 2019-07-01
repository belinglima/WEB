import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/App/components/home";
import User from "./pages/App/components/user";
import App from "./pages/App";
import Order from "./pages/App/components/order";
import Category from "./pages/App/components/category";
import Product from "./pages/App/components/product";
import Relatory from "./pages/App/components/relatory";
import ProductEdit from './pages/App/components/product/ProductEdit';
import categoryEdit from "./pages/App/components/category/categoryEdit";
import userEdit  from "./pages/App/components/user/userEdit";
import AddProduct from "./pages/App/components/product/AddProduct";
import AddCategory from "./pages/App/components/category/AddCategory";
import AddUser from "./pages/App/components/user/AddUser";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <PrivateRoute exact path="/app" component={App} />
      <PrivateRoute exact path="/home" component={Home} />

      {/* usuarios */}
      <PrivateRoute exact path="/user" component={User} />
      <PrivateRoute exact path="/AddUser" component={AddUser} />
      <PrivateRoute exact path="/user/:id" component={userEdit} />

      {/* pedidos */}
      <PrivateRoute exact path="/orders" component={Order} />

      {/* categorias */}
      <PrivateRoute exact path="/category" component={Category} />
      <PrivateRoute exact path="/AddCategory" component={AddCategory} />
      <PrivateRoute exact path="/category/:id" component={categoryEdit} />


      {/* produtos */}
      <PrivateRoute exact path="/products" component={Product} />
      <PrivateRoute exact path="/AddProduct" component={AddProduct} />
      <PrivateRoute exact path="/products/:id" component={ProductEdit} />

      {/* relatorios */}
      <PrivateRoute exact path="/relatory" component={Relatory} />

      {/* pagina de erro */}
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
