import {HashRouter, Route} from "react-router-dom";
import * as React from "react";
import {ListContainer} from "./pages/list/list.container";

export function Routes () {
    return(
        <HashRouter>
            <div>
                <Route exact path="/" component={ListContainer}/>
            </div>
        </HashRouter>
    );

}