/*for passing the values entered in our form we are not going to use the
* refs, because it is not efficient, rather we are going to store them into
* states...please study about imperative vs. declarative! In this component
* you use states to control the form behaviour*/


import * as React from 'react';

class CreateForm extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            ingredients: '',
            instructions: '',
            created: false,
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeIngredients = this.handleChangeIngredients.bind(this);
        this.handleChangeInstructions = this.handleChangeInstructions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
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

    resetForm() {
        this.setState({
            name: '',
            ingredients: '',
            instructions: ''
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const {name, ingredients, instructions} = this.state;

        this.props.onSubmit(name, ingredients, instructions);
        this.resetForm();
        this.setState({
           created: true
        });
        this.refs.nameInput.focus();

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.state.created && <div className="alert alert-success">
                    Your recipe was created!
                </div>}
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

                <input className="btn btn-primary" type="submit" value="Create"/>
            </form>
        );
    }
}
CreateForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired
};
export default CreateForm;


