import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './App';
import Register from './Register';
import Forget from './Forget';
import Main from './Main'
import Change from './Change'
import Buy from './Buy'
import School from './School'

const BasicRoute = () => (
    <HashRouter>
    <Switch>
    <Route exact path="/" component={App}/>
    <Route exact path="/Register" component={Register}/>
    <Route exact path="/Forget" component={Forget}/>
    <Route exact path="/Main" component={Main}/>
    <Route exact path="/Change" component={Change}/>
    <Route exact path="/Buy" component={Buy}/>
    <Route exact path="/School" component={School}/>
</Switch>
</HashRouter>
);


export default BasicRoute;