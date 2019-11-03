import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

// login, registro, recuperação senha
import Forgot from './pages/Forgot/'
import ForgotVolta from "./pages/ForgotVolta";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

// paginas internas
import App from "./pages/App";

import Category from "./pages/App/components/category";
import categoryEdit from "./pages/App/components/category/categoryEdit";
import AddCategory from "./pages/App/components/category/AddCategory";
import Product from "./pages/App/components/product";
import AddProduct from "./pages/App/components/product/AddProduct";
import ProductEdit from './pages/App/components/product/ProductEdit';
import userEdit  from "./pages/App/components/user/userEdit";
import User from "./pages/App/components/user";
import AddUser from "./pages/App/components/user/AddUser";

import Order from "./pages/App/components/order";
import Relatory from "./pages/App/components/relatory";




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
      <Route exact path="/forgot" component={Forgot} />
      <Route path="/passwords/confirm/:id" component={ForgotVolta} />

      <PrivateRoute exact path="/app" component={App} />
      <PrivateRoute exact path="/user" component={User} />
      <PrivateRoute exact path="/AddUser" component={AddUser} />
      <PrivateRoute exact path="/user/:id" component={userEdit} />
      <PrivateRoute exact path="/category" component={Category} />
      <PrivateRoute exact path="/category/:id" component={categoryEdit} />
      <PrivateRoute exact path="/AddCategory" component={AddCategory} />
      <PrivateRoute exact path="/products" component={Product} />
      <PrivateRoute exact path="/AddProduct" component={AddProduct} />
      <PrivateRoute exact path="/products/:id" component={ProductEdit} />
      <PrivateRoute exact path="/orders" component={Order} />
      <PrivateRoute exact path="/relatory" component={Relatory} /> */}
    
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
