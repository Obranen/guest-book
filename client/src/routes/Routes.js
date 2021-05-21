import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import GuestBook from "../components/GuestBook/GuestBook";

const Routes = () => {
  return (
    <Switch>
      <Route path={'/'} exact component={GuestBook}/>
      <Redirect to={'/'}/>
    </Switch>
  );
};

export default Routes;