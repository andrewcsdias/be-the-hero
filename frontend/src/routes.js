import {BrowserRouter, Route, Switch} from 'react-router-dom';

import React from 'react';

// Componentes roteados
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes(){
    // o Router-Dom verifica apenas se a rota contém o caminho especificado, então usase o exact na rota /
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/incidents/new" component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    );
}