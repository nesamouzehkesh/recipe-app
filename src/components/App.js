import React from 'react';

import RecipeDetail from './RecipeDetail';
import RecipeList from './RecipeList';
import CreateForm from './CreateForm';

/*every time we update the recipes state we want to write the new
 data in this local storage.*/
const LOCAL_STORAGE_KEY = 'recipes';


class App extends React.Component {
    constructor() {
        super();

        //get data out of the local storage, (returns string or null)
        const localStorageRecipes = window.localStorage.getItem(LOCAL_STORAGE_KEY);

        this.state = {
            showCreate: false,
            //if any data in local storage then initialize the state with it else an empty array
            recipes: localStorageRecipes ? JSON.parse(localStorageRecipes) : [],
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
        });

        /*we use the localStorage setItem method to store the recipes in our
         local storage against the key we have specified. Local storage can only
         store string data so we have to convert our array with JSON.stringify.
          */
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newRecipes));
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

