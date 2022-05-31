import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";

// views without layouts
import Artists from "views/Artists.js";
import Artworks from "views/Artworks.js";
import Sales from "views/Sales.js";
import Report from "views/Report.js"
import Payments from "views/Payments.js";
import Index from "views/Index.js";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/artists" exact component={Artists} />
      <Route path="/artworks" exact component={Artworks} />
      <Route path="/sales" exact component={Sales} />
      <Route path="/report" exact component={Report} />
      <Route path="/payments" exact component={Payments} />
      <Route path="/" exact component={Index} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
