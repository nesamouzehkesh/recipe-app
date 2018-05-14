/*this is not a class-based component, its syntax is simpler,
* this is a stateless component*/

import * as React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import ReactStars from 'react-stars';


const RecipeList = ({ recipes, onSelectRecipe, onStarEdit }) => (
    <ListGroup className="list-unstyled">
        {recipes.map(recipe =>
            <div>
                <ListGroupItem key={recipe.id} bsStyle="info" style={{ display: 'flex' }}>
                    <a href="#" onClick={onSelectRecipe.bind(null, recipe)}>{recipe.name}</a>
                    <div style={{ marginLeft: 'auto' }}>
                        <ReactStars
                            count={5}
                            size={24}
                            color2={'#ffd700'}
                            value={recipe.star}
                            onChange={onStarEdit(recipe.id)}
                        />
                    </div>
                </ListGroupItem>
            </div>
        )}
    </ListGroup>
)

RecipeList.propTypes = {
    recipes: React.PropTypes.array.isRequired,
    onSelectRecipe: React.PropTypes.func.isRequired,
    onStarEdit: React.PropTypes.func.isRequired,
}

export default RecipeList;

/*
* someone tell me why if I write it this way: onClick={props.onSelectRecipe(recipe)}
* the onClick function invokes even before the link is cliked? Test it with a
* console log to see...
* */
