import React from 'react';

import RecipeDetail from './RecipeDetail';
import RecipeList from './RecipeList';
import CreateEditForm from './CreateEditForm';
import SearchBox from './SearchBox';
import Header from './Header';

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
        * to delete it without immutating your recipes state. */
        this.state = {
            showCreate: false,
            //if any data in local storage then initialize the state with it else an empty array
            recipes: localStorageRecipes ? JSON.parse(localStorageRecipes) : [],
            selectedRecipe: null,
            search: '', //the state of the search box
        };

        this.showCreate = this.showCreate.bind(this);
        this.handleRecipeCreated = this.handleRecipeCreated.bind(this);
        this.handleSelectRecipe = this.handleSelectRecipe.bind(this);
        this.handleDeleteRecipe = this.handleDeleteRecipe.bind(this);
        this.updateRecipes = this.updateRecipes.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleRecipeSaved = this.handleRecipeSaved.bind(this);
        this.handleEditRecipe = this.handleEditRecipe.bind(this);
        this.handleHeaderClick = this.handleHeaderClick.bind(this);
        this.handleRecipeStarEdit = this.handleRecipeStarEdit.bind(this);
        this.handleNextRecipe = this.handleNextRecipe.bind(this);
        this.handlePrevRecipe = this.handlePrevRecipe.bind(this);
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
            showCreate: true,
            selectedRecipe: null,
        });
    }

    handleRecipeCreated(name, ingredients, instructions, star) {
        const newRecipes = this.state.recipes.concat({
            id: new Date().getTime(),
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            star: star,

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
    handleSearchChange(searchPhrase) {
        this.setState({
            search: searchPhrase
        });
    }

    handleRecipeSaved(name, ingredients, instructions) {
        const { recipes, selectedRecipe } = this.state;

        const editedRecipe = Object.assign({}, selectedRecipe, {
            name: name,
            ingredients: ingredients,
            instructions: instructions,
        });

        const newRecipes = recipes.map(recipe =>
            recipe === selectedRecipe ? editedRecipe : recipe
        );

        this.updateRecipes(newRecipes);
        this.handleSelectRecipe(editedRecipe); /*It is important to pass the
        editedRecipe here otherwise our selected recipe state will still refer to
        the unedited recipe. */
    }

    handleEditRecipe() {
        this.setState({
            showCreate: true
        });
    }

    handleHeaderClick() {
        this.setState=({
           showCreate: false
        });
    }

    handleRecipeStarEdit(newRating) {
        const { recipes, selectedRecipe } = this.state;

        const editedRecipe = Object.assign({}, selectedRecipe, {
            star: newRating
        });

        const newRecipes = recipes.map(recipe =>
            recipe === selectedRecipe ? editedRecipe : recipe
        );

        this.updateRecipes(newRecipes);
        this.handleSelectRecipe(editedRecipe);
    }

    handleNextRecipe(currentRecipe) {
        const { recipes } = this.state;
        const currentIndex = recipes.filter((recipe, i) => {
           if (recipe.name === currentRecipe.name)
               return i;
        });

        const nextRecipe = recipes[currentIndex + 1];
        this.handleSelectRecipe(nextRecipe);
    }

    handlePrevRecipe(currentRecipe) {

    }

    render() {
        const { recipes, search } = this.state;

        /* why this does not work?
        const recipes = {this.state.recipes};
        const search = {this.state.search}; */

        //filters for any similarity of the search state inside recipes state
        const filteredRecipes = recipes
            .filter(recipe => recipe.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
            .sort((a, b) => a.name > b.name);

        return (
            <div className="container">
                <Header onHeaderClick={this.handleHeaderClick}/>

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
                            <CreateEditForm
                                onCreate={this.handleRecipeCreated}
                                onSave={this.handleRecipeSaved}
                                recipe={this.state.selectedRecipe}
                            />
                            :
                            <RecipeDetail
                                recipe={this.state.selectedRecipe}
                                onDelete={this.handleDeleteRecipe}
                                onEdit={this.handleEditRecipe}
                                onStarEdit={this.handleRecipeStarEdit}
                                onNextRecipe={this.handleNextRecipe}
                                onPrevRecipe={this.handlePrevRecipe}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default App;

