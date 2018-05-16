
import * as React from 'react';
import { Panel, Pager } from 'react-bootstrap';
import ReactStars from 'react-stars';

class RecipeDetail extends React.Component {
    constructor() {
        super();

        this.confirmDelete = this.confirmDelete.bind(this);
    }

    confirmDelete() {
        const { recipe, onDelete } = this.props;
        /* eslint-disable */
        if (confirm('Are you sure you want to delete this recipe?')) { // eslint-disable-line
            onDelete(recipe);
        }
    };

    render() {
        const { recipe, onEdit, onStarEdit, onNextRecipe, onPrevRecipe, showCreatedMessage } = this.props;
        return (
            <div>
                {recipe ?
                    <Panel header={<b>{recipe.name}</b>} style={{ background: '#f6fcff' }}>

                        <Panel>
                            <b>Ingredients:</b>
                            <p>{recipe.ingredients}</p>
                        </Panel>
                        <Panel>
                            <b>Instructions:</b>
                            <p>{recipe.instructions}</p>
                        </Panel>

                        <div className="btn-toolbar" style={{ display: 'flex', flexWrap: 'inline-wrap' }}>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={this.confirmDelete}
                            >Delete recipe
                            </button>
                            <button
                                type="button"
                                className="btn btn-default"
                                onClick={onEdit}
                            >Edit recipe
                            </button>
                            <div style={{ marginLeft: 'auto', paddingTop: '5px', marginRight: '5px' }}>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    color2={'#ffd700'}
                                    value={recipe.star}
                                    onChange={onStarEdit(recipe.id)}
                                /></div>
                            <div style={{ display: 'flex', flexDirection: 'row-reverse', flexWrap: 'wrap' }}>
                                <a href="#"><span className="icon fi-social-facebook"
                                    style={{ fontSize: '36px', padding: '5px' }} /></a>
                                <a href="#"><span className="icon fi-social-twitter"
                                    style={{ fontSize: '36px', padding: '5px' }} /></a>
                                <a href="#"><span className="icon fi-social-google-plus"
                                    style={{ fontSize: '36px', padding: '5px' }} /></a>
                                <a href="#"><span className="icon fi-social-youtube"
                                    style={{ fontSize: '36px', padding: '5px' }} /></a>
                            </div>
                        </div>
                        <div>
                            <Pager>
                                <Pager.Item href="#" onClick={onPrevRecipe.bind(null, recipe)}>Previous</Pager.Item>
                                {' '}
                                <Pager.Item href="#" onClick={onNextRecipe.bind(null, recipe)}>Next</Pager.Item>
                            </Pager>
                        </div>
                    </Panel>
                    : showCreatedMessage ?

                        <div className="alert alert-success">
                            Your recipe was created!
                        </div>
                        :
                        <div>
                            Choose a recipe from the left hand side, or create a new one!
                        </div>
                }
            </div>
        );
    }
};

RecipeDetail.propTypes = {
    recipe: React.PropTypes.object,
    onDelete: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onStarEdit: React.PropTypes.func.isRequired,
    onNextRecipe: React.PropTypes.func.isRequired,
    onPrevRecipe: React.PropTypes.func.isRequired,
}
export default RecipeDetail;


