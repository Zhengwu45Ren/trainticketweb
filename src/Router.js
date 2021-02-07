import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './User/App';
import Register from './User/Register';
import Forget from './User/Forget';
import Main from './Main/Main'
import Change from './Main/Change'
import Buy from './Main/Buy'
import School from './Utils/School'
import BackUp from './Utils/BackUp'

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
    <Route exact path="/BackUp" component={BackUp}/>
</Switch>
</HashRouter>
);


export default BasicRoute;