/*this is not a class-based component, its syntax is simpler,
 * this is a stateless component*/

import * as React from 'react';
import { Panel } from 'react-bootstrap';

/*this is an arrow function w ith curly braces {} and an explicit
return, we need this to allow us to write some code before returning
the JSX. If we were not in need of that piece of code here the arrow
function did not need an explicit return and did not really need the {}
 */
const RecipeDetail = ({  recipe, onDelete, onEdit }) => {
    const confirmDelete = () => {
        if(confirm('Are you sure you want to delete this recipe?')) {
            onDelete(recipe);
        }
    };

    return (
        <div>
            { recipe ?
                <Panel>
                    <h2>{ recipe.name }</h2>

                    <h3>Ingredients:</h3>
                    <p>{ recipe.ingredients }</p>

                    <h3>Instructions:</h3>
                    <p>{ recipe.instructions }</p>
                    <div className="btn-toolbar">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={confirmDelete}
                        >Delete recipe</button>
                        <button
                            type="button"
                            className="btn btn-default"
                            onClick={onEdit}
                        >Edit recipe</button>
                        <span style={{ display: 'flex', flexDirection: 'row-reverse'}}>
                            <a href="#"><span className="icon fi-social-facebook" style={{ fontSize : '36px', padding: '5px' }}></span></a>
                            <a href="#"><span className="icon fi-social-twitter" style={{ fontSize : '36px', padding: '5px' }}></span></a>
                            <a href="#"><span className="icon fi-social-google-plus" style={{ fontSize : '36px', padding: '5px' }}></span></a>
                            <a href="#"><span className="icon fi-social-youtube" style={{ fontSize : '36px', padding: '5px' }}></span></a>
                        </span>
                    </div>
                </Panel>
                :
                <div>
                    Choose a recipe from the left hand side, or create a new one!
                </div>
            }
        </div>
    );
};
RecipeDetail.propTypes = {
    recipe: React.PropTypes.object,
    onDelete: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired
}
export default RecipeDetail;


