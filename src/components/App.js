import React from 'react';

import RecipeDetail from './RecipeDetail';
import RecipeList from './RecipeList';
import CreateEditForm from './CreateEditForm';
import SearchBox from './SearchBox';
import Header from './Header';

const LOCAL_STORAGE_KEY = 'recipes';

class App extends React.Component {
    constructor() {
        super();

        const localStorageRecipes = window.localStorage.getItem(LOCAL_STORAGE_KEY);

        this.state = {
            showCreate: false,
            recipes: localStorageRecipes ? JSON.parse(localStorageRecipes) : [],
            selectedRecipe: null,
            search: '',
            showCreatedMessage: false
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
            recipes: newRecipes,
            showCreate: false,
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

    handleRecipeSaved(id, name, ingredients, instructions, star) {
        const { recipes, selectedRecipe } = this.state;
        const editedRecipe = Object.assign({}, selectedRecipe, {
            id: id,
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            star: star
        });
        const newRecipes = recipes.map(recipe =>
            recipe === selectedRecipe ? editedRecipe : recipe
        );
        this.updateRecipes(newRecipes);
        this.handleSelectRecipe(editedRecipe);
    }

    handleRecipeCreated(id, name, ingredients, instructions, star, created) {
        const newRecipes = this.state.recipes.concat({
            id: new Date().getTime(),
            name: name,
            ingredients: ingredients,
            instructions: instructions,
            star: star,
        });
        this.updateRecipes(newRecipes);
        this.setState({
            showCreatedMessage: true
        })
    }

    handleSelectRecipe(recipe) {
        this.setState({
            selectedRecipe: recipe,
            showCreate: false
        });
    }

    handleDeleteRecipe(recipeToDelete) {
        const newRecipes = this.state.recipes.filter(recipe => recipe !== recipeToDelete);
        this.updateRecipes(newRecipes);
        this.setState({
            selectedRecipe: null
        });
    }

    handleSearchChange(searchPhrase) {
        this.setState({
            search: searchPhrase
        });
    }

    handleEditRecipe() {
        this.setState({
            showCreate: true
        });
    }

    handleHeaderClick() {
        this.setState = ({
            showCreate: false
        });
    }

    handleRecipeStarEdit(recipeId) {
        return (newRating) => {
            const { recipes } = this.state;
            const updatedRecipes = recipes.map(recipe => {
                if (recipe.id === recipeId) {
                    recipe.star = newRating;
                }
                return recipe;
            });
            this.setState({ recipes: updatedRecipes });
            this.updateRecipes(updatedRecipes);
        }
    }

    handleNextRecipe(currentRecipe) {
        const { recipes } = this.state;
        const currentIndex = recipes.findIndex(recipe => recipe.id === currentRecipe.id);
        const nextIndex = (currentIndex + 1 < recipes.length) ? (currentIndex + 1) : currentIndex;
        const nextRecipe = recipes.find((recipe, i) => i === nextIndex);
        this.handleSelectRecipe(nextRecipe);
    }

    handlePrevRecipe(currentRecipe) {
        const { recipes } = this.state;
        const currentIndex = recipes.findIndex(recipe => recipe.name === currentRecipe.name);
        const prevIndex = (currentIndex - 1 >= 0) ? (currentIndex - 1) : currentIndex;
        const prevRecipe = recipes.find((recipe, i) => i === prevIndex);
        this.handleSelectRecipe(prevRecipe);
    }

    render() {
        const { recipes, search } = this.state;

        const filteredRecipes = recipes
            .filter(recipe => recipe.name.toLowerCase().indexOf(search.toLowerCase()) > -1)
            .sort((a, b) => a.name > b.name);

        return (
            <div className="container">
                <Header onHeaderClick={this.handleHeaderClick} />

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
                        <SearchBox onChange={this.handleSearchChange} />
                        <RecipeList
                            recipes={filteredRecipes}
                            onSelectRecipe={this.handleSelectRecipe}
                            onStarEdit={this.handleRecipeStarEdit}
                        />
                    </div>

                    <div className="col-xs-8">
                        {this.state.showCreate ?
                            <CreateEditForm
                                onCreate={this.handleRecipeCreated}
                                onSave={this.handleRecipeSaved}
                                recipe={this.state.selectedRecipe}
                                onStarEdit={this.handleRecipeStarEdit}
                            />
                            :
                            <RecipeDetail
                                recipe={this.state.selectedRecipe}
                                showCreatedMessage={this.state.showCreatedMessage}
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

