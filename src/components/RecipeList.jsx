/*this is not a class-based component, its syntax is simpler,
* this is a stateless component*/

import * as React from 'react';

const RecipeList = (props) => (
    <ul className="list-unstyled">
        {props.recipes.map(recipe =>
            <li key={recipe.id}>
                <a href="#" onClick={props.onSelectRecipe.bind(null, recipe)}>{recipe.name}</a>
            </li>
        )}
    </ul>
)

RecipeList.propTypes = {
    recipes: React.PropTypes.array.isRequired,
    onSelectRecipe: React.PropTypes.func.isRequired,
}

export default RecipeList;

/*
* someone tell me why if I write it this way: onClick={props.onSelectRecipe(recipe)}
* the onClick function invokes even before the link is cliked? Test it with a
* console log to see...
* */
