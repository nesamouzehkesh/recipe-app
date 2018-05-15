import * as React from 'react';

const SearchBox = ({ onChange }) => (
    <input
        type="text"
        className="form-control"
        placeholder="Enter search here"
        autoComplete={false}
        style={{ marginBottom: '5px' }}
        onChange={event => onChange(event.target.value)}
    />
);

SearchBox.propTypes = {
    onChange: React.PropTypes.func.isRequired
}
export default SearchBox;
