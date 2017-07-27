import React from 'react';

import RecipeDetail from './RecipeDetail';
import RecipeList from './RecipeList';
import CreateForm from './CreateForm';
import SearchBox from './SearchBox';

/*every time we update the recipes state we want to write the new
 data in this local storage.*/
const LOCAL_STORAGE_KEY = 'recipes';


class App extends React.Component {
    constructor() {
        super();

        //get data out of the local storage, (returns string or null)
        const localStorageRecipes = window.localStorage.getItem(LOCAL_STORAGE_KEY);

        /*Always remember you should not immutate any of your states, for example
        * when deleting an item from recipes array you should seek for ways
        * to delete it without imutating your sceipes state. */
        this.state = {
            showCreate: false,
            //if any data in local storage then initialize the state with it else an empty array
            recipes: localStorageRecipes ? JSON.parse(localStorageRecipes) : [],
            selectedRecipe: null,
            search: '', //the state of the search box
        };

        this.showCreate = this.showCreate.bind(this);
        this.handleCreateRecipe = this.handleCreateRecipe.bind(this);
        this.handleSelectRecipe = this.handleSelectRecipe.bind(this);
        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
        this.updateRecipes = this.updateRecipes.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    updateRecipes(newRecipes) {
        this.setState({
            recipes: newRecipes
        });
        /*we use the localStorage setItem method to store the recipes in our
         local storage against the key we have specified. Local storage can only
         store string data so we have to convert our array with JSON.stringify.
         */
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newRecipes));
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
        this.updateRecipes(newRecipes); //updates the recipes state and local storage
    }

    handleSelectRecipe(recipe) {
        //console.log(recipe);
        this.setState({
            selectedRecipe: recipe,
            showCreate: false
        });
    }

    handleDeleteRecipe(recipeToDelete) {
        const newRecipes = this.state.recipes.filter(recipe => recipe !== recipeToDelete);
        this.updateRecipes(newRecipes); //updates the recipes state and local storage
        this.setState({
            selectedRecipe: null
        });
    }

    /*instead of writing the search action in handleSearchChange method and store
     the filtered results in state (which might be a better approach if the filtering
     is likely to be slow as we could then be casting the results until next time it changed),
     we write it inside the render. Because for most applications filtering is gonna be quick enough to just
     do it in the render method. */
    handleSearchChange(search) {
        this.setState({
            search
        });
    }

    render() {
        const { recipes, search } = this.state;

        /* why this does not work?
        const recipes = {this.state.recipes};
        const search = {this.state.search}; */

        //filters for any similarity of the search state inside recipes state
        const filteredRecipes = recipes
            .filter(recipe => recipe.name.toLowerCase().indexOf(search.toLowerCase()) > -1);

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
                        <SearchBox onChange={this.handleSearchChange}/>
                        <RecipeList
                            recipes={filteredRecipes}
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
                                onDelete={this.handleDeleteRecipe}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default App;

