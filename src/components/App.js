import React from 'react';

import RecipeDetail from './RecipeDetail';
import RecipeList from './RecipeList';


class App extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Recipe App</h1>
                <div className="row">
                    <div className="col-xs-4">
                        <RecipeList/>
                    </div>

                    <div className="col-xs-8">
                        <RecipeDetail/>
                    </div>
                </div>
            </div>
        );
    }
}
export default App;

