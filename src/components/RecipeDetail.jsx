/*this is not a class-based component, its syntax is simpler,
 * this is a stateless component*/

import * as React from 'react';

const RecipeDetail = ({ recipe }) => (
    <div>
        { recipe ?
            <div>
              <h2>{ recipe.name }</h2>

              <h3>Ingredients:</h3>
              <p>{ recipe.ingredients }</p>

              <h3>Instructions:</h3>
              <p>{ recipe.instructions }</p>
            </div>
          :
            <div>
              Choose a recipe from the left hand side, or create a new one!
            </div>
        }
    </div>
);
RecipeDetail.propTypes = {
    recipe: React.PropTypes.object
}
export default RecipeDetail;


