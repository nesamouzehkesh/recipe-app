import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { BrowserRouter, Match, Miss } from 'react-router';
import NotFound from './components/NotFound';


const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Match exactly pattern="/" component={App}/>
                <Miss component={NotFound}/>
            </div>
        </BrowserRouter>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));
