import React from 'react';

import RecipeDetail from './RecipeDetail';
import RecipeList from './RecipeList';
import CreateForm from './CreateForm';


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            showCreate: true
        };

        this.showCreate = this.showCreate.bind(this);
        this.handleCreateRecipe = this.handleCreateRecipe.bind(this);
    }

    showCreate() {
        this.setState({
            showCreate: true
        });
    }

    handleCreateRecipe(name, ingredients, instructions) {
        console.log(name, ingredients, instructions);
    }

    render() {
        return (
            <div className="container">
                <h1>Recipe App</h1>

                <div className="row">
                    <div className="col-xs-4">
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                marginBottom: '5px'
                            }}
                            onClick={this.showCreate}
                        >
                            Create New Recipe
                        </button>
                        <RecipeList/>
                    </div>

                    <div className="col-xs-8">
                        {this.state.showCreate ?
                            <CreateForm
                                onSubmit={this.handleCreateRecipe}
                            />
                            : <RecipeDetail/>}
                    </div>
                </div>
            </div>
        );
    }
}
export default App;

