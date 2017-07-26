/*for passing the values entered in our form we are not going to use the
* refs, because it is not efficient, rather we are going to store them into
* states...please study about imperative vs. declarative!*/


import * as React from 'react';

class CreateForm extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            ingredients: '',
            instructions: ''
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeIngredients = this.handleChangeIngredients.bind(this);
        this.handleChangeInstructions = this.handleChangeInstructions.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();
        const {name, ingredients, instructions} = this.state;

        this.props.onSubmit(name, ingredients, instructions);
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
export default CreateForm;


