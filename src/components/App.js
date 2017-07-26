import React from 'react';

import RecipeDetail from './RecipeDetail';
import RecipeList from './RecipeList';
import CreateForm from './CreateForm';


class App extends React.Component {
    constructor() {
        super();

        this.state = {
            showCreate: false,
            recipes: [],
            selectedRecipe: null,
        };

        this.showCreate = this.showCreate.bind(this);
        this.handleCreateRecipe = this.handleCreateRecipe.bind(this);
        this.handleSelectRecipe = this.handleSelectRecipe.bind(this);
    }

    showCreate() {
        this.setState({
            showCreate: true
        });
    }

    handleCreateRecipe(name, ingredients, instructions) {
        const newRecipes = this.state.recipes.concat({
            id: new Date().getTime(),
            name: name,
            ingredients: ingredients,
            instructions: instructions
        });

        this.setState({
            recipes: newRecipes
        })
    }

    handleSelectRecipe(recipe) {
        console.log(recipe);
        this.setState({
            selectedRecipe: recipe,
            showCreate: false
        });
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
                        <RecipeList
                            recipes={this.state.recipes}
                            onSelectRecipe={this.handleSelectRecipe}
                        />
                    </div>

                    <div className="col-xs-8">
                        {this.state.showCreate ?
                            <CreateForm
                                onSubmit={this.handleCreateRecipe}
                            />
                            :
                            <RecipeDetail
                                recipe={this.state.selectedRecipe}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default App;

