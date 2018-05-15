
import * as React from 'react';
import ReactStars from 'react-stars';

class CreateEditForm extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            ingredients: '',
            instructions: '',
            star: 0,
            created: false,
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeIngredients = this.handleChangeIngredients.bind(this);
        this.handleChangeInstructions = this.handleChangeInstructions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.setStateFromRecipe = this.setStateFromRecipe.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    componentDidMount() {
        this.setStateFromRecipe(this.props.recipe);
    }

    /*this will receive the new set of props that the component just received
    * this is used in situations such as this where you need to compare the props
    * stored in the component's state with new set of props stored in nextProps and
    * take appropriate actions based on how they change. */
    componentWillReceiveProps(nextProps) {
        this.setStateFromRecipe(nextProps.recipe);
    }

    setStateFromRecipe(recipe) {
        this.setState({
            name: recipe ? recipe.name : '',
            ingredients: recipe ? recipe.ingredients : '',
            instructions: recipe ? recipe.instructions : '',
            star: recipe ? recipe.star : 0,
        });
    }
    handleChangeName(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleChangeIngredients(event) {
        this.setState({
            ingredients: event.target.value
        });
    }

    handleChangeInstructions(event) {
        this.setState({
            instructions: event.target.value
        });
    }

    handleChangeStar = (newRating) => {
        this.setState({
            star: newRating
        });
    }

    resetForm() {
        this.setState({
            name: '',
            ingredients: '',
            instructions: '',
            star: 0,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { name, ingredients, instructions, star, created } = this.state;

        if (this.props.recipe) {
            this.props.onSave(name, ingredients, instructions, star);
        } else {
            this.setState({
                created: true
            });
            this.props.onCreate(name, ingredients, instructions, star, created);
            this.resetForm();
            this.refs.nameInput.focus();
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Recipe name:</label>
                    <input
                        className="form-control"
                        rows="5"
                        id="name"
                        placeholder="Enter recipe name here"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChangeName}
                        ref="nameInput"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients:</label>
                    <textarea
                        className="form-control"
                        rows="5"
                        id="ingredients"
                        placeholder="Enter ingredients here, one per line"
                        value={this.state.ingredients}
                        onChange={this.handleChangeIngredients}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="instructions">Instructions:</label>
                    <textarea
                        className="form-control"
                        rows="5"
                        id="instructions"
                        placeholder="Enter instructions here, one step per line"
                        value={this.state.instructions}
                        onChange={this.handleChangeInstructions}
                    />
                </div>
                <div className="form-group" style={{ marginLeft: 'auto' }}>
                    <ReactStars
                        count={5}
                        size={24}
                        color2={'#ffd700'}
                        value={this.state.star}
                        onChange={this.handleChangeStar}
                    />
                </div>

                <input
                    className="btn btn-primary"
                    type="submit"
                    value={this.props.recipe ? 'Save' : 'Create'}
                />
            </form>
        );
    }
}
CreateEditForm.propTypes = {
    onCreate: React.PropTypes.func.isRequired,
    onSave: React.PropTypes.func.isRequired,
    recipe: React.PropTypes.object //this cannot be isRequired because react treats null props as if it was not passed in so will throw an error
};
export default CreateEditForm;


