import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewContact from './pages/NewContact';
import EditContact from './pages/EditContact';

function Routes(){
    return(
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/new" component={NewContact} />
            <Route path="/edit/:id" component={EditContact} />
        </Switch>
    );
}

export default Routes;